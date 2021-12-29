import { YarnSpinnerParserListener } from '../grammars/YarnSpinnerParserListener'
import { Line_statementContext, Shortcut_optionContext, YarnSpinnerParser } from '../grammars/YarnSpinnerParser'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { YarnSpinnerLexer } from '../grammars/YarnSpinnerLexer';
import * as fs from "fs";

// Create the lexer and parser
let inputStream = new ANTLRInputStream(fs.readFileSync("./test.yarn").toString());
let lexer = new YarnSpinnerLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer as any);
let parser = new YarnSpinnerParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.dialogue();

class Listener implements YarnSpinnerParserListener {
    parsingShortcuts = false;
    indentLevels: number[] = [];
    // Assuming a parser rule with name: `functionDeclaration`
    enterLine_statement(context: Line_statementContext) {
        switch (context._parent?.ruleIndex) {
            case YarnSpinnerParser.RULE_shortcut_option:
            case YarnSpinnerParser.RULE_shortcut_option_statement:
                console.log(`option [${this.getIndentLevel()}] ${context.line_formatted_text().TEXT().join("")}`);
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
                console.log(`line [${this.getIndentLevel()}] ${context.line_formatted_text().TEXT().join("")}`)
                break;
            default:
                console.log(`?? [${this.getIndentLevel()}] ${context.line_formatted_text().TEXT().join("")}`)

                break;
        }
        // ...

    }

    getIndentLevel() {
        return this.indentLevels.reduce((memo, val) => memo + val, 0);
    }

    enterShortcut_option(ctx: Shortcut_optionContext) {
        let x = tokenStream.getTokens();
        let z = x.slice((ctx._start as any).index, (ctx._stop as any).index);
        let indents = z.filter(e => e.type === YarnSpinnerParser.INDENT);
        this.indentLevels.push(indents.length);
        let dedents = z.filter(e => e.type === YarnSpinnerParser.DEDENT);
        this.parsingShortcuts = true;
    }

    exitShortcut_option(ctx: Shortcut_optionContext) {
        this.parsingShortcuts = false;
        this.indentLevels.pop();
    }

    // other enterX functions...
}

// Create the listener
const listener: YarnSpinnerParserListener = new Listener();
// Use the entry point for listeners
ParseTreeWalker.DEFAULT.walk(listener, tree)
console.log(tokenStream.getTokens().map(t => parser.vocabulary.getDisplayName(t.type)));
console.log(lexer.Warnings);