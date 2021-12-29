import { YarnSpinnerParserListener } from '../grammars/YarnSpinnerParserListener'
import { Command_formatted_textContext, HeaderContext, If_clauseContext, If_statementContext, Jump_statementContext, Line_statementContext, NodeContext, Set_statementContext, Shortcut_optionContext, Shortcut_option_statementContext, ValueContext, ValueNumberContext, YarnSpinnerParser } from '../grammars/YarnSpinnerParser'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { YarnSpinnerLexer } from '../grammars/YarnSpinnerLexer';
import * as fs from "fs";
import u from "unist-builder";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction, TzoVMState } from "tzo";
import { Tokenizer, pushString, pushNumber, invokeFunction } from "tzo";

const tzoTokenizer = new Tokenizer();

// Create the lexer and parser
let inputStream = new ANTLRInputStream(fs.readFileSync("./test.yarn").toString());
let lexer = new YarnSpinnerLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer as any);
let parser = new YarnSpinnerParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.dialogue();

const qvmState = u("questmarkVMState", {
    stack: [],
    context: {},
    programList: [],
    labelMap: {},
    programCounter: 0,
    exit: false,
    pause: false
} as TzoVMState, []);

const q = (a: InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction) => {
    qvmState.programList.push(a);
}
const qTzo = (input: string) => {
    tzoTokenizer.parse(input).forEach(i => q(i));
}

const TZO_cleanstack = `stacksize jgz { pop } stacksize jgz { 9 ppc - goto }`;

class Listener implements YarnSpinnerParserListener {
    indentLevels: number[] = [];
    // Assuming a parser rule with name: `functionDeclaration`
    enterLine_statement(context: Line_statementContext) {
        let text = context.line_formatted_text().TEXT().join("");
        switch (context._parent?.ruleIndex) {
            case YarnSpinnerParser.RULE_shortcut_option:
            case YarnSpinnerParser.RULE_shortcut_option_statement:
                console.log(`option [${this.getIndentLevel()}] ${text}`);
                q(pushString(text));
                q(invokeFunction("ppc")); // push address of effect body to stack
                q(pushNumber(4));
                q(invokeFunction("+"));
                q(invokeFunction("{")); // option effect body start
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
                console.log(`line [${this.getIndentLevel()}] ${text}`)
                q(pushString(text + "\n"));
                q(invokeFunction("emit"));
                break;
            default:
                console.log(`?? [${this.getIndentLevel()}] ${text}`)

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
    }

    exitShortcut_option(ctx: Shortcut_optionContext) {
        q(invokeFunction("goto")); // go back to where we were before "getResponse" was called
        q(invokeFunction("}")); // option effect body end
        q(invokeFunction("response"));
        this.indentLevels.pop();
        /*if (this.getIndentLevel() === 0) { // doesn't work!!!
            q(invokeFunction("getResponse")); // TODO: this is obviously incorrect. Find a better way to find the last option in a list of options!
        }*/
    }

    enterCommand_formatted_text(ctx: Command_formatted_textContext) {
        //q(invokeFunction(ctx.COMMAND_TEXT().join("")));
        let text = ctx.COMMAND_TEXT().join("");
        if (text.startsWith("$")) {
            qTzo(text.substring(1));
        }
    }

    enterJump_statement(ctx: Jump_statementContext) {
        qTzo(TZO_cleanstack);
        q(pushString(ctx.ID().text));
        q(invokeFunction("goto"));
    }

    enterNode(ctx: NodeContext) {
    }

    enterHeader(ctx: HeaderContext) {
        if (ctx.ID().text.toLowerCase() === "title") {
            let z = invokeFunction("nop");
            z.label = ctx.REST_OF_LINE().text
            q(z);
        }
    }

    enterValueNumber(ctx: ValueNumberContext) {
        q(pushNumber(Number.parseInt(ctx.NUMBER().text)));
    }

    exitSet_statement(ctx: Set_statementContext) {
        let varName = ctx.variable().VAR_ID().text;
        // value was captured earlier via Value.
        q(pushString(varName.substring(1)));
        q(invokeFunction("setContext"));
    }

    enterIf_statement(ctx: If_statementContext) {

    }

    enterIf_clause(ctx: If_clauseContext) {
        let variable = ctx.expression().children[0].text;
        let comparison = ctx.expression().children[1].text;
        let comparator = ctx.expression().children[2].text;

        qTzo(comparator);

        if (variable.startsWith("$")) {
            let v = variable.replaceAll(/\$(\S+)/g, (a, b) => `"${b}" getContext`);
            qTzo(v);
        } else {
            console.warn("UNIMPLEMENTED: if statement variable is a complex expression!");
        }

        if (comparison == "<") {
            q(invokeFunction("lt"));
        } else if (comparison == ">") {
            q(invokeFunction("gt"));
        } else if (comparison == "=") {
            q(invokeFunction("eq"));
        } else if (comparison == "==") {
            q(invokeFunction("eq"));
        } else {
            console.warn("UNIMPLEMENTED comparison:", comparison);
        }
    }

    // other enterX functions...
}

// Create the listener
const listener: YarnSpinnerParserListener = new Listener();
// Use the entry point for listeners
ParseTreeWalker.DEFAULT.walk(listener, tree)
//console.log(tokenStream.getTokens().map(t => parser.vocabulary.getDisplayName(t.type)));
console.log(lexer.Warnings);
//console.log(qvmState);
fs.writeFileSync("./questmark.json", JSON.stringify(qvmState, null, 2));