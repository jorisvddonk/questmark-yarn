///  <summary>
///  A Lexer subclass that detects newlines and generates indent and
///  dedent tokens accordingly.
///  </summary>

import { CharStream, CommonToken, Lexer, Token, TokenSource } from "antlr4ts";

export interface Warning {
    token: Token,
    message: String
}

import { YarnSpinnerLexer } from "./grammars/YarnSpinnerLexer";

/// <summary>
/// A Lexer subclass that detects newlines and generates indent and
/// dedent tokens accordingly.
/// </summary>
export abstract class IndentAwareLexer extends Lexer {
    /// <summary>
    /// Whether the lexer is currently lexing an expression that is part
    /// of a 'when' clause. Set by <see cref="SetInWhenClause"/> and read
    /// by <see cref="IsInWhenClause"/>.
    /// </summary>
    private inWhenClause: boolean = false;

    /// <summary>
    /// Returns a value indicating whether the lexer is currently lexing an
    /// expression that's part of a 'when' clause.
    /// </summary>
    public IsInWhenClause(): boolean {
        return this.inWhenClause;
    }

    /// <summary>
    /// Sets a value indicating whether the lexer is currently lexing an
    /// expression that's part of a 'when' clause.
    /// </summary>
    public SetInWhenClause(val: boolean): void {
        this.inWhenClause = val;
    }

    /// <summary>
    /// Looks ahead 1 character in the input stream and returns a value
    /// indicating whether the character is whitespace or the '>' character.
    /// </summary>
    public IsEndOfCommandKeyword(): boolean {
        const next = (this.inputStream as any).LA(1);
        if (next === -1) {
            return false;
        }
        const c = String.fromCharCode(next);
        return c === ">" || /\s/.test(c);
    }

    /// <summary>
    /// The collection of tokens that we have seen, but have not yet
    /// returned. This is needed when NextToken encounters a newline,
    /// which means we need to buffer indents or dedents. NextToken
    /// only returns a single Token at a time, which
    /// means we use this list to buffer it.
    /// </summary>
    private pendingTokens: Array<Token> = new Array<Token>();
    /// <summary>
    /// The collection of <see cref="Warning"/> objects we've
    /// generated.
    /// </summary>
    private warnings: Array<Warning> = new Array<Warning>();

    /// <summary>
    /// A stack keeping track of the levels of indentations we have
    /// seen so far that are relevant to shortcuts.
    /// </summary>
    private unbalancedIndents: Array<number> = new Array<number>();

    /// <summary>
    /// Keeps track of the last indentation encountered.
    /// This is used to see if depth has changed between lines.
    /// </summary>
    private lastIndent: number = 0;

    /// <summary>
    /// A flag to say the last line observed was a shortcut or not.
    /// Used to determine if tracking indents needs to occur.
    /// </summary>
    private lineContainsIndentTrackingToken: boolean = false;

    /// <summary>
    /// Holds the last observed token from the stream.
    /// Used to see if a line is blank or not.
    /// </summary>
    private lastToken: Token | undefined = undefined;

    /// <summary>
    /// Holds the line number of the last seen indent-tracking content. Lets
    /// us work out if the blank line needs to end the option.
    /// </summary>
    private lastSeenIndentTrackingContent: number = -1;

    /// <summary>
    /// Initializes a new instance of the <see
    /// cref="IndentAwareLexer"/> class.
    /// </summary>
    /// <param name="input">The incoming character stream.</param>
    constructor(input: CharStream) {
        super(input);
    }

    /// <summary>
    /// Gets the collection of warnings determined during lexing.
    /// </summary>
    public get Warnings(): Array<Warning> {
        return this.warnings;
    }

    /// <inheritdoc/>
    public nextToken(): Token {
        let tokenToReturn: Token | undefined;
        if (this._hitEOF && this.pendingTokens.length > 0) {
            // We have hit the EOF, but we have tokens still pending.
            // Start returning those tokens.
            tokenToReturn = this.pendingTokens.shift();
        } else if (this.inputStream.size === 0) {
            // There's no more incoming symbols, and we don't have
            // anything pending, so we've hit the end of the file.
            this._hitEOF = true;
            // Return the EOF token.
            tokenToReturn = new CommonToken(Token.EOF, `<EOF>`);
        } else {
            // Get the next token, which will enqueue one or more new
            // tokens into the pending tokens queue.
            this.CheckNextToken();
            if (this.pendingTokens.length > 0) {
                // Then, return a single token from the queue.
                tokenToReturn = this.pendingTokens.shift();
            } else {
                // Nothing left in the queue. Return null.
                tokenToReturn = undefined;
            }
        }
        return tokenToReturn as Token;
    }

    private CheckNextToken(): void {
        let currentToken = super.nextToken();
        switch (currentToken.type) {
            case YarnSpinnerLexer.NEWLINE:
                // Insert indents or dedents depending on the next
                // token's indentation, and enqueues the newline at the
                // correct place
                this.HandleNewLineToken(currentToken);
                break;
            case Token.EOF:
                // Insert dedents before the end of the file, and then
                // enqueues the EOF.
                this.HandleEndOfFileToken(currentToken);
                break;
            case YarnSpinnerLexer.LINE_GROUP_ARROW:
            case YarnSpinnerLexer.SHORTCUT_ARROW:
                this.pendingTokens.push(currentToken);
                this.lineContainsIndentTrackingToken = true;
                break;
            case YarnSpinnerLexer.BODY_END:
                // we are at the end of the node
                // depth no longer matters
                // clear the stack
                this.lineContainsIndentTrackingToken = false;
                this.lastIndent = 0;
                this.unbalancedIndents = new Array<number>();
                this.lastSeenIndentTrackingContent = -1;

                this.pendingTokens.push(currentToken);
                break;
            default:
                this.pendingTokens.push(currentToken);
                break;
        }
        this.lastToken = currentToken;
    }

    private HandleEndOfFileToken(currentToken: Token): void {
        // We're at the end of the file. Emit as many dedents as we
        // currently have on the stack.
        while (this.unbalancedIndents.length > 0) {
            this.unbalancedIndents.pop();
            this.InsertToken("", YarnSpinnerLexer.DEDENT);
        }
        // Finally, enqueue the EOF token.
        this.pendingTokens.push(currentToken);
    }

    private HandleNewLineToken(currentToken: Token): void {
        // We're about to go to a new line. Look ahead to see how
        // indented it is.

        // insert the current NEWLINE token
        this.pendingTokens.push(currentToken);

        let currentIndentationLength: number = this.GetLengthOfNewlineToken(currentToken);

        // we have seen an option somewhere
        if (this.lastSeenIndentTrackingContent !== -1) {
            // we are a blank line
            if (currentToken.type === this.lastToken?.type) {
                // is the option content directly above us?
                if (this.line - this.lastSeenIndentTrackingContent === 1) {
                    this.InsertToken("", YarnSpinnerLexer.BLANK_LINE_FOLLOWING_OPTION);
                }
                // disabling the option tracking
                this.lastSeenIndentTrackingContent = -1;
            }
        }

        // we need to actually see if there is a shortcut *somewhere* above us
        // if there isn't we just chug on without worrying
        if (this.lineContainsIndentTrackingToken) {
            // we have a shortcut *somewhere* above us
            // that means we need to check our depth
            // and compare it to the shortcut depth

            // if the depth of the current line is greater than the previous one
            // we need to add this depth to the indents stack
            if (currentIndentationLength > this.lastIndent) {
                this.unbalancedIndents.push(currentIndentationLength);
                this.InsertToken("", YarnSpinnerLexer.INDENT);
            }

            // we've now started tracking the indentation, or ignored it, so can turn this off
            this.lineContainsIndentTrackingToken = false;
            this.lastSeenIndentTrackingContent = this.line;
        }

        // now we need to see if the current depth requires any indents or dedents
        // we do this by first checking to see if there are any unbalanced indents
        if (this.unbalancedIndents.length > 0) {
            let top: number = this.unbalancedIndents[this.unbalancedIndents.length - 1];

            // while there are unbalanced indents
            // we need to check if the current line is shallower than the indent stack
            // if it is then we emit a dedent and continue checking
            while (currentIndentationLength < top) {
                this.InsertToken("", YarnSpinnerLexer.DEDENT);
                this.unbalancedIndents.pop();
                if (this.unbalancedIndents.length > 0) {
                    top = this.unbalancedIndents[this.unbalancedIndents.length - 1];
                } else {
                    top = 0;
                    // we've dedented all the way out of the shortcut
                    // as such we are done with the option block
                    this.lastSeenIndentTrackingContent = this.line;
                }
            }
        }

        // finally we update the last seen depth
        this.lastIndent = currentIndentationLength;
    }

    // Given a NEWLINE token, return the length of the indentation
    // following it by counting the spaces and tabs after it.
    private GetLengthOfNewlineToken(currentToken: Token): number {
        if (currentToken.type != YarnSpinnerLexer.NEWLINE) {
            throw new Error(`GetLengthOfNewlineToken expected currentToken to be a NEWLINE (${YarnSpinnerLexer.NEWLINE}), not ${currentToken.type}`);
        }
        let length: number = 0;
        let sawSpaces: boolean = false;
        let sawTabs: boolean = false;
        for (
            let c_index_ = 0, c_source_ = currentToken.text as string; c_index_ < c_source_.length; c_index_++) {
            let c = c_source_[c_index_];
            switch (c) {
                case ' ':
                    length += 1;
                    sawSpaces = true;
                    break;
                case '\t':
                    sawTabs = true;
                    length += 8;
                    break;
            }
        }
        if (sawSpaces && sawTabs) {
            this.warnings.push((() => {
                let obj: Warning = {
                    token: currentToken,
                    message: `Indentation contains tabs and spaces`,
                };
                return obj;
            })());
        }
        return length;
    }

    /// <summary>
    /// Inserts a new token with the given text and type, as though it
    /// had appeared in the input stream.
    /// </summary>
    /// <param name="text">The text to use for the token.</param>
    /// <param name="type">The type of the token.</param>
    /// <remarks>The token will have a zero length.</remarks>
    private InsertToken(text: string, type: number): void {
        // ***
        // https://www.antlr.org/api/Java/org/antlr/v4/runtime/Lexer.html#_tokenStartCharIndex
        let startIndex: number = this._tokenStartCharIndex + this.text.length;
        this.InsertToken2(startIndex, startIndex - 1, text, type, this.line);
    }

    private InsertToken2(startIndex: number, stopIndex: number, text: string, type: number, line: number): void {
        let token: CommonToken = (() => {
            let obj = new CommonToken(type, text, { source: this as TokenSource, stream: this.inputStream }, YarnSpinnerLexer.DEFAULT_TOKEN_CHANNEL, startIndex, stopIndex);
            obj.line = line;
            return obj;
        })();
        this.pendingTokens.push(token);
    }
}
