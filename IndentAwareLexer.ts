

///  <summary>
///  A Lexer subclass that detects newlines and generates indent and
///  dedent tokens accordingly.

import { CharStream, CommonToken, Lexer, Token, TokenSource, Vocabulary } from "antlr4ts";

interface Warning {
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
    /// A stack keeping track of the levels of indentations we have
    /// seen so far.
    /// </summary>
    private indents: Array<number> = new Array<number>();
    /// <summary>
    /// The collection of tokens that we have seen, but have not yet
    /// returned. This is needed when NextToken encounters a newline,
    /// which means we need to buffer indents or dedents. NextToken
    /// only returns a single <see cref="Token"/> at a time, which
    /// means we use this list to buffer it.
    /// </summary>
    private pendingTokens: Array<Token> = new Array<Token>();
    /// <summary>
    /// The collection of <see cref="Warning"/> objects we've
    /// generated.
    /// </summary>
    private warnings: Array<Warning> = new Array<Warning>();
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
        if (this._hitEOF && this.pendingTokens.length > 0) {
            // We have hit the EOF, but we have tokens still pending.
            // Start returning those tokens.
            return this.pendingTokens.shift() as Token;
        } else
            if (this.inputStream.size == 0) {
                // There's no more incoming symbols, and we don't have
                // anything pending, so we've hit the end of the file.
                this._hitEOF = true;
                // Return the EOF token.
                return new CommonToken(Token.EOF, `<EOF>`);
            } else {
                // Get the next token, which will enqueue one or more new
                // tokens into the pending tokens queue.
                this.CheckNextToken();
                if (this.pendingTokens.length > 0) {
                    // Then, return a single token from the queue.
                    return this.pendingTokens.shift() as Token;
                } else {
                    // Nothing left in the queue. Return null.
                    console.log("??????");
                        let token = this._factory.create(
                            this._tokenFactorySourcePair, this._type, this._text, this._channel,
                            this._tokenStartCharIndex, this.charIndex - 1, this._tokenStartLine,
                            this._tokenStartCharPositionInLine);
   
                    this._token = token;
                    return token;
                }
            }
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
            default:
                this.pendingTokens.push(currentToken);
                break;
        }
    }
    private HandleEndOfFileToken(currentToken: Token): void {
        // We're at the end of the file. Emit as many dedents as we
        // currently have on the stack.
        while (this.indents.length > 0) {
            let indent = this.indents.pop();
            this.InsertToken(`<dedent: ${indent}>`, YarnSpinnerLexer.DEDENT);
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
        let previousIndent: number = 0;
        if (this.indents.length > 0) {
            previousIndent = this.indents[this.indents.length - 1];
        } else {
            previousIndent = 0;
        }
        if (currentIndentationLength > previousIndent) {
            // We are more indented on this line than on the previous
            // line. Insert an indentation token, and record the new
            // indent level.
            this.indents.push(currentIndentationLength);
            this.InsertToken(`<indent to ${currentIndentationLength}>`, YarnSpinnerLexer.INDENT);
        } else
            if (currentIndentationLength < previousIndent) {
                // We are less indented on this line than on the previous
                // line. For each level of indentation we're now lower
                // than, insert a dedent token and remove that indentation
                // level.
                while (currentIndentationLength < previousIndent) {
                    // Remove this indent from the stack and generate a
                    // dedent token for it.
                    previousIndent = this.indents.pop() as number;
                    this.InsertToken(`<dedent from ${previousIndent}>`, YarnSpinnerLexer.DEDENT);
                    // Figure out the level of indentation we're on -
                    // either the top of the indent stack (if we have any
                    // indentations left), or zero.
                    if (this.indents.length > 0) {
                        previousIndent = this.indents[this.indents.length - 1];
                    } else {
                        previousIndent = 0;
                    }
                }
            }
    }
    // Given a NEWLINE token, return the length of the indentation
    // following it by counting the spaces and tabs after it.
    private GetLengthOfNewlineToken(currentToken: Token): number {
        if (currentToken.type != YarnSpinnerLexer.NEWLINE) {
            throw new Error(`${`GetLengthOfNewlineToken`} expected ${`currentToken`} to be a ${`NEWLINE`} (${YarnSpinnerLexer.NEWLINE}), not ${currentToken.type}`);
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
        this.InsertToken2(startIndex, startIndex - 1, text, type, this.line/*, this.column*/);
    }

    private InsertToken2(startIndex: number, stopIndex: number, text: string, type: number, line: number/*, column: number*/): void {
        let token: CommonToken = (() => {
            let obj = new CommonToken(type, text, { source: this, stream: this.inputStream }, YarnSpinnerLexer.DEFAULT_TOKEN_CHANNEL, startIndex, stopIndex);
            obj.line = line;
            //(obj as any)._column = column; // ???
            return obj;
        })();
        this.pendingTokens.push(token);
    }
}