import { YarnSpinnerParserListener } from './grammars/YarnSpinnerParserListener'
import { Command_formatted_textContext, Declare_statementContext, ExpressionContext, HeaderContext, If_clauseContext, Else_clauseContext, If_statementContext, JumpToNodeNameContext, JumpToExpressionContext, DetourToNodeNameContext, DetourToExpressionContext, Return_statementContext, Once_statementContext, Once_primary_clauseContext, Once_alternate_clauseContext, Title_headerContext, Line_group_itemContext, Line_group_statementContext, Line_formatted_textContext, Line_statementContext, NodeContext, Set_statementContext, Shortcut_optionContext, Shortcut_option_statementContext, ValueContext, ValueFalseContext, ValueNumberContext, ValueTrueContext, VariableContext, YarnSpinnerParser, ValueStringContext } from './grammars/YarnSpinnerParser'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import { ANTLRErrorListener, ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { YarnSpinnerLexer } from './grammars/YarnSpinnerLexer';
import u from "unist-builder";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction, TzoVMState } from "tzo";
import { Tokenizer, pushString, pushNumber, invokeFunction } from "tzo";
import { ExpressionCompiler, YARN_FUNCTION_PREFIX } from "./expression";

const TZO_cleanstack = `stacksize jgz { pop } stacksize jgz { 9 ppc - goto }`;
const TZO_QVM_get_response = `ppc 5 + getResponse goto`;
export class Listener implements YarnSpinnerParserListener {
    tzoTokenizer = new Tokenizer();
    indentLevels: number[] = [];
    foundFirstNode = false;
    onceCounter = 0;
    expr: ExpressionCompiler;

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
        this.expr = new ExpressionCompiler(i => this.q(i));
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
        ctx.children.forEach(c => {
            if (c instanceof ExpressionContext) {
                this.expr.compile(c);
                rconcats += 1;
            } else {
                let z = (c as any)?._symbol?.type;
                if (z === YarnSpinnerLexer.TEXT) {
                    this.q(pushString((c as any)._symbol.text));
                    rconcats += 1;
                }
            }
        });
        while (rconcats > 0) {
            rconcats -= 1;
            this.q(invokeFunction("rconcat"));
        }
        //console.log("---", text);
    }

    exitLine_statement(context: Line_statementContext) {
        let text = context.line_formatted_text().TEXT().join("");
        switch (context._parent?.ruleIndex) {
            case YarnSpinnerParser.RULE_shortcut_option:
            case YarnSpinnerParser.RULE_shortcut_option_statement:
            case YarnSpinnerParser.RULE_line_group_item:
                //console.log(`option [${this.getIndentLevel()}] ${text}`);
                this.q(invokeFunction("ppc")); // push address of effect body to stack
                this.q(pushNumber(4));
                this.q(invokeFunction("+"));
                this.q(invokeFunction("{")); // option effect body start
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
                //console.log(`line [${this.getIndentLevel()}] ${text}`)
                this.q(pushString("\n")); // add a newline to ensure things are displayed properly.
                this.q(invokeFunction("rconcat"));
                this.q(invokeFunction("emit"));
                break;
            default:
                console.warn(`?? [${this.getIndentLevel()}] ${text}`)

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

    enterLine_group_item(ctx: Line_group_itemContext) {
        let x = this.tokenStream.getTokens();
        let z = x.slice((ctx._start as any).index, (ctx._stop as any).index);
        let indents = z.filter(e => e.type === YarnSpinnerParser.INDENT);
        this.indentLevels.push(indents.length);
    }

    exitLine_group_statement(ctx: Line_group_statementContext) {
        this.qTzo(TZO_QVM_get_response);
    }

    exitLine_group_item(ctx: Line_group_itemContext) {
        this.q(invokeFunction("goto")); // go back to where we were before "getResponse" was called
        this.q(invokeFunction("}")); // option effect body end
        this.q(invokeFunction("response"));
        this.indentLevels.pop();
    }

    enterCommand_formatted_text(ctx: Command_formatted_textContext) {
        const joined = ctx.COMMAND_TEXT().join("");
        if (joined.startsWith("$")) {
            // Raw Tzo bytecode escape hatch: <<$ ... >>
            this.qTzo(joined.substring(1));
            return;
        }
        if (joined.trim() == "RESPONSE") {
            this.qTzo(TZO_QVM_get_response);
            return;
        }

        // Arbitrary command: dispatch to a host function named after the first
        // whitespace-delimited word, with the remaining words and any inline
        // expressions as arguments.
        const args: Array<string | ExpressionContext> = [];
        let buffer = "";
        ctx.children.forEach(c => {
            if (c instanceof ExpressionContext) {
                if (buffer.length > 0) {
                    buffer.split(/\s+/).filter(w => w.length > 0).forEach(w => args.push(w));
                    buffer = "";
                }
                args.push(c);
            } else {
                const sym = (c as any)?._symbol;
                if (sym && sym.type === YarnSpinnerLexer.COMMAND_TEXT) {
                    buffer += sym.text;
                }
            }
        });
        if (buffer.length > 0) {
            buffer.split(/\s+/).filter(w => w.length > 0).forEach(w => args.push(w));
        }

        if (args.length === 0 || typeof args[0] !== "string") {
            console.warn(`UNIMPLEMENTED: command with non-literal name: ${joined}`);
            return;
        }
        const commandName = args.shift() as string;
        // Push args in reverse so the first argument ends up on top.
        for (let i = args.length - 1; i >= 0; i--) {
            const arg = args[i];
            if (typeof arg === "string") {
                this.q(pushString(arg));
            } else {
                this.expr.compile(arg);
            }
        }
        this.q(invokeFunction(`${YARN_FUNCTION_PREFIX}${commandName}`));
    }

    enterJumpToNodeName(ctx: JumpToNodeNameContext) {
        this.qTzo(TZO_cleanstack);
        this.q(pushString(ctx.ID().text));
        this.q(invokeFunction("goto"));
    }

    enterJumpToExpression(ctx: JumpToExpressionContext) {
        this.qTzo(TZO_cleanstack);
        this.expr.compile(ctx.expression());
        this.q(invokeFunction("goto"));
    }

    // --- Yarn Spinner 3 features ---

    enterDetourToNodeName(ctx: DetourToNodeNameContext) {
        console.warn("UNIMPLEMENTED: <<detour>> is not supported; content will fall through");
    }

    enterDetourToExpression(ctx: DetourToExpressionContext) {
        console.warn("UNIMPLEMENTED: <<detour>> is not supported; content will fall through");
    }

    enterReturn_statement(ctx: Return_statementContext) {
        console.warn("UNIMPLEMENTED: <<return>> is not supported");
    }

    enterOnce_statement(ctx: Once_statementContext) {
        this.onceCounter += 1;
        // condition: this site has not been seen yet
        this.q(pushString(this.onceLabel()));
        this.q(invokeFunction("hasContext"));
        this.q(invokeFunction("not"));
        // ... optionally AND'd with the clause's own condition (<<once if ...>>)
        const condition = ctx.once_primary_clause()?.expression();
        if (condition !== undefined) {
            this.expr.compile(condition);
            this.q(invokeFunction("and"));
        }
        if (ctx.once_alternate_clause() !== undefined) {
            this.q(invokeFunction("dup"));
        }
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
        // Code between here and the matching '}' only runs when the branch is
        // taken, so mark the site as seen here.
        this.q(pushNumber(1));
        this.q(pushString(this.onceLabel()));
        this.q(invokeFunction("setContext"));
    }

    enterOnce_primary_clause(ctx: Once_primary_clauseContext) {
        // Condition and mark-seen are handled by enterOnce_statement.
    }

    exitOnce_primary_clause(ctx: Once_primary_clauseContext) {
        this.q(invokeFunction("}"));
    }

    enterOnce_alternate_clause(ctx: Once_alternate_clauseContext) {
        this.q(invokeFunction("jz"));
        this.q(invokeFunction("{"));
    }

    exitOnce_alternate_clause(ctx: Once_alternate_clauseContext) {
        this.q(invokeFunction("}"));
    }

    onceLabel() {
        return `_once_${this.onceCounter}`;
    }

    enterNode(ctx: NodeContext) {
        // we have to wrap guards around nodes to prevent running into other nodes...
        this.q(invokeFunction("{"));
    }

    exitNode(ctx: NodeContext) {
        // we have to wrap guards around nodes to prevent running into other nodes...
        this.q(invokeFunction("}"));
    }

    enterTitle_header(ctx: Title_headerContext) {
        let id = ctx.ID().text;
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

    enterHeader(ctx: HeaderContext) {
        // Non-title headers (for example 'tags') carry no QuestVM behaviour.
    }

    enterDeclare_statement(ctx: Declare_statementContext) {
        // Emit a guarded default: only set the value if it isn't set already,
        // so that host-provided / persisted values are not clobbered.
        const name = ctx.variable().VAR_ID().text.substring(1);
        this.q(pushString(name));
        this.q(invokeFunction("hasContext"));
        this.q(invokeFunction("not"));
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
        this.expr.compile(ctx.expression());
        this.q(pushString(name));
        this.q(invokeFunction("setContext"));
        this.q(invokeFunction("}"));
    }

    exitSet_statement(ctx: Set_statementContext) {
        let varName = ctx.variable().VAR_ID().text.substring(1);
        let op = (ctx as any)._op?.text;
        // Compile the right-hand side; its value is left on the stack.
        this.expr.compile(ctx.expression());
        if (op === undefined || op === "=" || op === "to") {
            this.q(pushString(varName));
            this.q(invokeFunction("setContext"));
            return;
        }
        // Compound assignment: current value <op> rhs, then store the result.
        this.q(pushString(varName));
        this.q(invokeFunction("getContext"));
        const opFunctions: { [key: string]: string } = {
            "+=": "+", "-=": "-", "*=": "*", "/=": "/", "%=": "%",
        };
        const opFn = opFunctions[op];
        if (opFn === undefined) {
            console.warn(`UNIMPLEMENTED: set operator '${op}'`);
            this.q(invokeFunction("setContext"));
            return;
        }
        this.q(invokeFunction(opFn));
        this.q(pushString(varName));
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
        if (ifStatement === undefined) {
            return;
        }
        this.expr.compile(ifStatement.expression());
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

export function parse(input: string, errorListener?: ANTLRErrorListener<any>) {
    // Create the lexer and parser
    let inputStream = new ANTLRInputStream(input);
    let lexer = new YarnSpinnerLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer as any);
    let parser = new YarnSpinnerParser(tokenStream);
    if (errorListener != null) {
        parser.addErrorListener(errorListener);
    }
    let tree = parser.dialogue();
    const listener = new Listener(tokenStream);
    ParseTreeWalker.DEFAULT.walk(listener as YarnSpinnerParserListener, tree)
    console.log(lexer.Warnings);
    return {
        vmState: listener.getQVMState(),
        warnings: lexer.Warnings,
        tokens: tokenStream.getTokens()
    }
}