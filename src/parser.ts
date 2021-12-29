import { YarnSpinnerParserListener } from './grammars/YarnSpinnerParserListener'
import { Command_formatted_textContext, HeaderContext, If_clauseContext, If_statementContext, Jump_statementContext, Line_statementContext, NodeContext, Set_statementContext, Shortcut_optionContext, Shortcut_option_statementContext, ValueContext, ValueNumberContext, YarnSpinnerParser } from './grammars/YarnSpinnerParser'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import { ANTLRInputStream, CommonTokenStream, TokenStream } from 'antlr4ts';
import { YarnSpinnerLexer } from './grammars/YarnSpinnerLexer';
import * as fs from "fs";
import u from "unist-builder";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction, TzoVMState } from "tzo";
import { Tokenizer, pushString, pushNumber, invokeFunction } from "tzo";

const TZO_cleanstack = `stacksize jgz { pop } stacksize jgz { 9 ppc - goto }`;
const TZO_QVM_get_response = `ppc 5 + getResponse goto`;
export class Listener implements YarnSpinnerParserListener {
    tzoTokenizer = new Tokenizer();
    indentLevels: number[] = [];
    qvmState = u("questmarkVMState", {
        stack: [],
        context: {},
        programList: [],
        labelMap: {},
        programCounter: 0,
        exit: false,
        pause: false
    } as TzoVMState, []);
    tokenStream: CommonTokenStream = null;

    constructor(tokenStream: CommonTokenStream) {
        this.tokenStream = tokenStream;
    }

    q(a: InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction) {
        this.qvmState.programList.push(a);
    }

    qTzo(input: string) {
        this.tzoTokenizer.parse(input).forEach(i => this.q(i));
    }

    enterLine_statement(context: Line_statementContext) {
        let text = context.line_formatted_text().TEXT().join("");
        switch (context._parent?.ruleIndex) {
            case YarnSpinnerParser.RULE_shortcut_option:
            case YarnSpinnerParser.RULE_shortcut_option_statement:
                console.log(`option [${this.getIndentLevel()}] ${text}`);
                this.q(pushString(text));
                this.q(invokeFunction("ppc")); // push address of effect body to stack
                this.q(pushNumber(4));
                this.q(invokeFunction("+"));
                this.q(invokeFunction("{")); // option effect body start
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
                console.log(`line [${this.getIndentLevel()}] ${text}`)
                this.q(pushString(text + "\n"));
                this.q(invokeFunction("emit"));
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
        let x = this.tokenStream.getTokens();
        let z = x.slice((ctx._start as any).index, (ctx._stop as any).index);
        let indents = z.filter(e => e.type === YarnSpinnerParser.INDENT);
        this.indentLevels.push(indents.length);
        let dedents = z.filter(e => e.type === YarnSpinnerParser.DEDENT);
    }

    exitShortcut_option(ctx: Shortcut_optionContext) {
        this.q(invokeFunction("goto")); // go back to where we were before "getResponse" was called
        this.q(invokeFunction("}")); // option effect body end
        this.q(invokeFunction("response"));
        this.indentLevels.pop();
        /*if (this.getIndentLevel() === 0) { // doesn't work!!!
            q(invokeFunction("getResponse")); // TODO: this is obviously incorrect. Find a better way to find the last option in a list of options!
        }*/
    }

    enterCommand_formatted_text(ctx: Command_formatted_textContext) {
        //q(invokeFunction(ctx.COMMAND_TEXT().join("")));
        let text = ctx.COMMAND_TEXT().join("");
        if (text.startsWith("$")) {
            this.qTzo(text.substring(1));
        } else if (text.trim() == "RESPONSE") {
            this.qTzo(TZO_QVM_get_response);
        }
    }

    enterJump_statement(ctx: Jump_statementContext) {
        this.qTzo(TZO_cleanstack);
        this.q(pushString(ctx.ID().text));
        this.q(invokeFunction("goto"));
    }

    enterNode(ctx: NodeContext) {
    }

    enterHeader(ctx: HeaderContext) {
        if (ctx.ID().text.toLowerCase() === "title") {
            let z = invokeFunction("nop");
            z.label = ctx.REST_OF_LINE().text
            this.q(z);
        }
    }

    enterValueNumber(ctx: ValueNumberContext) {
        this.q(pushNumber(Number.parseInt(ctx.NUMBER().text)));
    }

    exitSet_statement(ctx: Set_statementContext) {
        let varName = ctx.variable().VAR_ID().text;
        // value was captured earlier via Value.
        this.q(pushString(varName.substring(1)));
        this.q(invokeFunction("setContext"));
    }

    enterIf_statement(ctx: If_statementContext) {

    }

    enterIf_clause(ctx: If_clauseContext) {
        let variable = ctx.expression().children[0].text;
        let comparison = ctx.expression().children[1].text;
        let comparator = ctx.expression().children[2].text;

        this.qTzo(comparator);

        if (variable.startsWith("$")) {
            let v = variable.replaceAll(/\$(\S+)/g, (a, b) => `"${b}" getContext`);
            this.qTzo(v);
        } else {
            console.warn("UNIMPLEMENTED: if statement variable is a complex expression!");
        }

        if (comparison == "<") {
            this.q(invokeFunction("lt"));
        } else if (comparison == ">") {
            this.q(invokeFunction("gt"));
        } else if (comparison == "=") {
            this.q(invokeFunction("eq"));
        } else if (comparison == "==") {
            this.q(invokeFunction("eq"));
        } else {
            console.warn("UNIMPLEMENTED comparison:", comparison);
        }
    }

    getQVMState() {
        return this.qvmState;
    }
}

export function parse(input: string) {
    // Create the lexer and parser
    let inputStream = new ANTLRInputStream(input);
    let lexer = new YarnSpinnerLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer as any);
    let parser = new YarnSpinnerParser(tokenStream);
    let tree = parser.dialogue();
    const listener = new Listener(tokenStream);
    ParseTreeWalker.DEFAULT.walk(listener as YarnSpinnerParserListener, tree)
    console.log(lexer.Warnings);
    return listener.getQVMState();
}