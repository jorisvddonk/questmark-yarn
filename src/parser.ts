import { YarnSpinnerParserListener } from './grammars/YarnSpinnerParserListener'
import { Command_formatted_textContext, HeaderContext, If_clauseContext, Else_clauseContext, If_statementContext, Jump_statementContext, Line_formatted_textContext, Line_statementContext, NodeContext, Set_statementContext, Shortcut_optionContext, Shortcut_option_statementContext, ValueContext, ValueFalseContext, ValueNumberContext, ValueTrueContext, VariableContext, YarnSpinnerParser, ValueStringContext } from './grammars/YarnSpinnerParser'
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
    foundFirstNode = false;

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

    preq(a: InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction) {
        this.qvmState.programList.unshift(a);
    }

    qTzo(input: string) {
        this.tzoTokenizer.parse(input).forEach(i => this.q(i));
    }

    enterLine_formatted_text (ctx: Line_formatted_textContext) {
        let text = ctx.TEXT().join("");
        let rconcats = -1;
        let in_expr = false;
        ctx.children.forEach(c => {
            let z = (c as any)?._symbol?.type;
            if (z === YarnSpinnerLexer.TEXT) {
                this.q(pushString(this.tokenStream.getTokens()[(c as any)._symbol.index].text));
                rconcats += 1;
            } else if (z === YarnSpinnerLexer.EXPRESSION_START) {
                in_expr = true;
            } else if (z === YarnSpinnerLexer.EXPRESSION_END) {
                in_expr = false;
            } else if (in_expr) {
                this.qTzo(c.text.replaceAll(/\$(\S+)/g, (a, b) => `"${b}" getContext`));
                rconcats += 1; // TODO: determine if this should be bigger for complex expressions?
            }
        });
        while (rconcats > 0) {
            rconcats -= 1;
            this.q(invokeFunction("rconcat"));
        }
        console.log("---", text);
    }

    enterText

    exitLine_statement(context: Line_statementContext) {
        let text = context.line_formatted_text().TEXT().join("");
        switch (context._parent?.ruleIndex) {
            case YarnSpinnerParser.RULE_shortcut_option:
            case YarnSpinnerParser.RULE_shortcut_option_statement:
                console.log(`option [${this.getIndentLevel()}] ${text}`);
                this.q(invokeFunction("ppc")); // push address of effect body to stack
                this.q(pushNumber(4));
                this.q(invokeFunction("+"));
                this.q(invokeFunction("{")); // option effect body start
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
                console.log(`line [${this.getIndentLevel()}] ${text}`)
                this.q(pushString("\n")); // add a newline to ensure things are displayed properly.
                this.q(invokeFunction("rconcat"));
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
    
    exitShortcut_option_statement (ctx: Shortcut_option_statementContext) {
        this.qTzo(TZO_QVM_get_response);
    }

    exitShortcut_option(ctx: Shortcut_optionContext) {
        this.q(invokeFunction("goto")); // go back to where we were before "getResponse" was called
        this.q(invokeFunction("}")); // option effect body end
        this.q(invokeFunction("response"));
        this.indentLevels.pop();
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
        // we have to wrap guards around nodes to prevent running into other nodes...
        this.q(invokeFunction("{"));
    }

    exitNode(ctx: NodeContext) {
        // we have to wrap guards around nodes to prevent running into other nodes...
        this.q(invokeFunction("}"));
    }

    enterHeader(ctx: HeaderContext) {
        if (ctx.ID().text.toLowerCase() === "title") {
            let id = ctx.REST_OF_LINE().text;
            let z = invokeFunction("nop");
            z.label = id;
            this.q(z);
            if (this.foundFirstNode === false) {
                this.foundFirstNode = true;
                // note: reverse order of these items below, as they're prepended
                this.preq(invokeFunction("goto"));
                this.preq(pushString(id));
            }
        }
    }

    enterValueNumber(ctx: ValueNumberContext) {
        this.q(pushNumber(Number.parseInt(ctx.NUMBER().text)));
    }

    enterValueString (ctx: ValueStringContext) {
        let t = ctx.STRING().text
        this.q(pushString(t.substring(1, t.length-1)));
    }

    enterValueTrue(ctx: ValueTrueContext) {
        this.q(pushNumber(1));
    }

    enterValueFalse(ctx: ValueFalseContext) {
        this.q(pushNumber(0));
    }
    
    enterVariable (ctx: VariableContext) {
        let node = ctx._parent;
        while(node && node.ruleIndex !== YarnSpinnerParser.RULE_line_statement) {
            node = node._parent;
        }
        if (node && node.ruleIndex === YarnSpinnerParser.RULE_line_statement) {
            // this variable is part of a line statement, so emit its value!
            // no longer needed - already done as part of lineStatement earlier!
            /*
            this.q(pushString(ctx.VAR_ID().text.substring(1)));
            this.q(invokeFunction("getContext"));
            this.q(invokeFunction("emit")); // TODO: change to rconcat instead?
            */
        }
    }

    exitSet_statement(ctx: Set_statementContext) {
        let varName = ctx.variable().VAR_ID().text;
        // value was captured earlier via Value.
        this.q(pushString(varName.substring(1)));
        this.q(invokeFunction("setContext"));
    }

    enterIf_statement(ctx: If_statementContext) {
        let ifCtx = undefined;
        let elseCtx = undefined;
        ctx.children.forEach(c => {
            if ((c as any).ruleIndex === YarnSpinnerParser.RULE_if_clause) {
                ifCtx = c;
            } else if ((c as any).ruleIndex === YarnSpinnerParser.RULE_else_clause) {
                elseCtx = c;
            }
        });
        this.handleIfElse(ifCtx, elseCtx);
    }

    handleIfElse(ifStatement?: If_clauseContext, elseStatement?: Else_clauseContext) {
        let variable = ifStatement.expression().children[0]?.text;
        let comparison = ifStatement.expression().children[1]?.text;
        let comparator = ifStatement.expression().children[2]?.text;

        let v = variable.replaceAll(/\$(\S+)/g, (a, b) => `"${b}" getContext`);

        if (comparison !== undefined && comparator !== undefined) {
            this.qTzo(comparator);
            
            if (variable.startsWith("$")) {
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
        } else {
            // boolean comparison; check if the value is greater than 0 (truthy)!
            this.q(pushNumber(0)) // comparator
            this.qTzo(v); // variable
            this.q(invokeFunction("gt"));
        }

        if (elseStatement !== undefined) {
            this.q(invokeFunction("dup"));
        }
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
    }

    exitIf_clause (ctx: If_clauseContext) {
        this.q(invokeFunction("}"));
    }

    enterElse_clause (ctx: Else_clauseContext) {
        this.q(invokeFunction("jz"));
        this.q(invokeFunction("{"));
    }

    exitElse_clause (ctx: Else_clauseContext) {
        this.q(invokeFunction("}"));
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