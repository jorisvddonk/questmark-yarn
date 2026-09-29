import { YarnSpinnerParserListener } from './grammars/YarnSpinnerParserListener'
import { Command_formatted_textContext, Declare_statementContext, Enum_case_statementContext, Enum_statementContext, ExpAddSubContext, ExpAndOrXorContext, ExpComparisonContext, ExpEqualityContext, ExpMultDivModContext, ExpNegativeContext, ExpNotContext, ExpParensContext, ExpValueContext, ExpressionContext, HeaderContext, If_clauseContext, Else_clauseContext, If_statementContext, JumpToNodeNameContext, JumpToExpressionContext, DetourToNodeNameContext, DetourToExpressionContext, Return_statementContext, Once_statementContext, Once_primary_clauseContext, Once_alternate_clauseContext, Title_headerContext, When_headerContext, Line_group_itemContext, Line_group_statementContext, Line_formatted_textContext, Line_statementContext, LineConditionContext, LineOnceConditionContext, NodeContext, Set_statementContext, Shortcut_optionContext, Shortcut_option_statementContext, ValueContext, ValueFalseContext, ValueNumberContext, ValueTrueContext, ValueTypeMemberReferenceContext, ValueVarContext, VariableContext, YarnSpinnerParser, ValueStringContext } from './grammars/YarnSpinnerParser'
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import { ANTLRErrorListener, ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { YarnSpinnerLexer } from './grammars/YarnSpinnerLexer';
import u from "unist-builder";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction, TzoVMState } from "tzo";
import { Tokenizer, pushString, pushNumber, invokeFunction } from "tzo";
import { ExpressionCompiler, YARN_FUNCTION_PREFIX, nodeVisitCountKey, typeMemberReferenceOf, unquoteYarnString } from "./expression";
import { SaliencyCompiler, SaliencyStrategy, contentViewCountKey, contentOnceKey } from "./saliency";

const TZO_cleanstack = `stacksize jgz { pop } stacksize jgz { 9 ppc - goto }`;
const TZO_QVM_get_response = `ppc 5 + getResponse goto`;

type LineGroupCandidate = {
    label: string;
    condition?: ExpressionContext;
    emitCondition?: () => void;
    onSelected?: () => void;
    complexity: number;
    contentID: string;
    body?: Array<InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction>;
};

type LineGroupFrame = {
    id: number;
    savedEmit: Array<InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction> | undefined;
    candidates: LineGroupCandidate[];
    currentBody?: Array<InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction>;
    currentCandidate?: LineGroupCandidate;
};

type WhenClause = {
    kind: "always" | "once" | "once-if" | "expr";
    expression?: ExpressionContext;
};

type NodeRecord = {
    title?: string;
    label: string;
    when: WhenClause[];
};

export class Listener implements YarnSpinnerParserListener {
    tzoTokenizer = new Tokenizer();
    indentLevels: number[] = [];
    foundFirstNode = false;
    onceCounter = 0;
    nodeTitles: string[] = [];
    currentNodeTitle: string = undefined;
    // Enum support
    enums: { [enumName: string]: { [caseName: string]: string | number | undefined } } = {};
    enumCaseOrder: { [enumName: string]: string[] } = {};
    currentEnum: string = undefined;
    variableEnums: { [varName: string]: string } = {};
    variableTypes: { [varName: string]: string } = {};
    referencedVars: Set<string> = new Set<string>();
    declaredVars: Set<string> = new Set<string>();
    ifStack: Array<{ elseIfsRemaining: number, hasElse: boolean, openElse: number, clauseCursor: number }> = [];
    // Saliency support
    saliencyStrategy: SaliencyStrategy = "best-least-recently-viewed";
    saliency: SaliencyCompiler;
    lineGroupCounter = 0;
    generatedLineIDCounter = 0;
    lineGroupStack: LineGroupFrame[] = [];
    contentIDs: string[] = [];
    lineOnceKeys: string[] = [];
    lineGuardStack: boolean[] = [];
    optionGuardStack: boolean[] = [];
    // Node group support
    nodeCounter = 0;
    nodeGroupCounter = 1000;
    nodeStack: NodeRecord[] = [];
    nodes: NodeRecord[] = [];
    emitOverride: Array<InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction> | undefined = undefined;
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

    constructor(tokenStream: CommonTokenStream, saliencyStrategy?: SaliencyStrategy) {
        this.tokenStream = tokenStream;
        if (saliencyStrategy !== undefined) {
            this.saliencyStrategy = saliencyStrategy;
        }
        this.expr = new ExpressionCompiler(i => this.q(i), this, (name) => this.referencedVars.add(name), (name) => this.variableTypes[name]);
        this.saliency = new SaliencyCompiler(i => this.q(i), this.expr, this.saliencyStrategy);
    }

    q(a: InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction) {
        if (this.emitOverride !== undefined) {
            this.emitOverride.push(a);
            return;
        }
        this.qvmState.programList.push(a);
    }

    preq(a: InvokeFunctionInstruction | PushStringInstruction | PushNumberInstruction) {
        this.qvmState.programList.unshift(a);
    }

    qTzo(input: string) {
        this.tzoTokenizer.parse(input).forEach(i => this.q(i));
    }

    enterLine_statement(ctx: Line_statementContext) {
        const parentRule = (ctx._parent as any)?.ruleIndex;
        if (parentRule === YarnSpinnerParser.RULE_statement) {
            const lineID = this.lineIDOf(ctx);
            this.lineGuardStack.push(this.emitLineConditionOpen(ctx, lineID));
        } else {
            this.lineGuardStack.push(false);
        }
    }

    emitLineConditionOpen(lineStatement: Line_statementContext, contentID: string): boolean {
        const lineCondition = lineStatement.line_condition();
        if (lineCondition === undefined || lineCondition === null) {
            return false;
        }
        let onceKey: string | undefined = undefined;
        if (lineCondition instanceof LineOnceConditionContext) {
            onceKey = contentOnceKey(contentID);
            if (!this.lineOnceKeys.includes(onceKey)) {
                this.lineOnceKeys.push(onceKey);
            }
            this.q(pushString(onceKey));
            this.q(invokeFunction("getContext"));
            this.q(invokeFunction("not"));
            const expression = lineCondition.expression();
            if (expression !== undefined) {
                this.expr.compile(expression);
                this.q(invokeFunction("and"));
            }
        } else if (lineCondition instanceof LineConditionContext) {
            this.expr.compile(lineCondition.expression());
        } else {
            return false;
        }
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
        if (onceKey !== undefined) {
            // Mark this once site as seen as soon as the line is shown.
            this.q(pushNumber(1));
            this.q(pushString(onceKey));
            this.q(invokeFunction("setContext"));
        }
        return true;
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
                //console.log(`option [${this.getIndentLevel()}] ${text}`);
                this.q(invokeFunction("ppc")); // push address of effect body to stack
                this.q(pushNumber(4));
                this.q(invokeFunction("+"));
                this.q(invokeFunction("{")); // option effect body start
                break;
            case YarnSpinnerParser.RULE_line_statement:
            case YarnSpinnerParser.RULE_statement:
            case YarnSpinnerParser.RULE_line_group_item:
                //console.log(`line [${this.getIndentLevel()}] ${text}`)
                this.q(pushString("\n")); // add a newline to ensure things are displayed properly.
                this.q(invokeFunction("rconcat"));
                this.q(invokeFunction("emit"));
                break;
            default:
                console.warn(`?? [${this.getIndentLevel()}] ${text}`)

                break;
        }
        // Close a conditional-line guard opened in enterLine_statement.
        const lineGuard = this.lineGuardStack.pop();
        if (lineGuard) {
            this.q(invokeFunction("}"));
        }
    }

    getIndentLevel() {
        return this.indentLevels.reduce((memo, val) => memo + val, 0);
    }

    enterShortcut_option(ctx: Shortcut_optionContext) {
        let x = this.tokenStream.getTokens();
        let z = x.slice((ctx._start as any).index, (ctx._stop as any).index);
        let indents = z.filter(e => e.type === YarnSpinnerParser.INDENT);
        this.indentLevels.push(indents.length);
        // Options are only offered when their line condition passes.
        const lineStatement = ctx.line_statement();
        this.optionGuardStack.push(this.emitLineConditionOpen(lineStatement, this.lineIDOf(lineStatement)));
    }
    
    exitShortcut_option_statement (ctx: Shortcut_option_statementContext) {
        this.qTzo(TZO_QVM_get_response);
    }

    exitShortcut_option(ctx: Shortcut_optionContext) {
        this.q(invokeFunction("goto")); // go back to where we were before "getResponse" was called
        this.q(invokeFunction("}")); // option effect body end
        this.q(invokeFunction("response"));
        this.indentLevels.pop();
        const optionGuard = this.optionGuardStack.pop();
        if (optionGuard) {
            this.q(invokeFunction("}"));
        }
    }

    enterLine_group_statement(ctx: Line_group_statementContext) {
        const id = this.lineGroupCounter;
        this.lineGroupCounter += 1;
        this.lineGroupStack.push({
            id,
            savedEmit: this.emitOverride,
            candidates: [],
        });
    }

    enterLine_group_item(ctx: Line_group_itemContext) {
        const frame = this.lineGroupStack[this.lineGroupStack.length - 1];
        frame.currentBody = [];
        this.emitOverride = frame.currentBody;

        const lineStatement = ctx.line_statement();
        const lineCondition = lineStatement?.line_condition();
        const lineID = this.lineIDOf(lineStatement);
        let conditionExpr: ExpressionContext | undefined = undefined;
        let emitCondition: (() => void) | undefined = undefined;
        let onSelected: (() => void) | undefined = undefined;
        let complexity = 0;
        if (lineCondition instanceof LineConditionContext) {
            conditionExpr = lineCondition.expression();
            complexity = 1 + countBooleanOperators(conditionExpr);
        } else if (lineCondition instanceof LineOnceConditionContext) {
            // `once` counts as one condition; an additional expression adds more.
            complexity = 1;
            const onceKey = contentOnceKey(lineID);
            if (!this.lineOnceKeys.includes(onceKey)) {
                this.lineOnceKeys.push(onceKey);
            }
            const expression = lineCondition.expression();
            if (expression !== undefined) {
                complexity += 1 + countBooleanOperators(expression);
            }
            emitCondition = () => {
                this.q(pushString(onceKey));
                this.q(invokeFunction("getContext"));
                this.q(invokeFunction("not"));
                if (expression !== undefined) {
                    this.expr.compile(expression);
                    this.q(invokeFunction("and"));
                }
            };
            onSelected = () => {
                this.q(pushNumber(1));
                this.q(pushString(onceKey));
                this.q(invokeFunction("setContext"));
            };
        }
        frame.currentCandidate = {
            label: `_lg_${frame.id}_body_${frame.candidates.length}`,
            condition: conditionExpr,
            emitCondition,
            onSelected,
            complexity,
            contentID: lineID,
        };
    }

    exitLine_group_item(ctx: Line_group_itemContext) {
        const frame = this.lineGroupStack[this.lineGroupStack.length - 1];
        const candidate = frame.currentCandidate;
        candidate.body = frame.currentBody ?? [];
        frame.candidates.push(candidate);
        frame.currentCandidate = undefined;
        frame.currentBody = undefined;
        this.emitOverride = frame.savedEmit;
    }

    exitLine_group_statement(ctx: Line_group_statementContext) {
        const frame = this.lineGroupStack.pop();
        this.emitOverride = frame.savedEmit;

        const endLabel = `_lg_${frame.id}_end`;
        // Selection code goes into the enclosing stream; bodies are appended
        // afterwards, each terminated with a jump to the end label.
        this.saliency.emitSelection(frame.id, frame.candidates.map(c => ({
            label: c.label,
            condition: c.condition,
            emitCondition: c.emitCondition,
            onSelected: c.onSelected,
            complexity: c.complexity,
            contentID: c.contentID,
        })), endLabel);

        for (const candidate of frame.candidates) {
            const labelInstruction = invokeFunction("nop");
            labelInstruction.label = candidate.label;
            this.q(labelInstruction);
            candidate.body.forEach(i => this.q(i));
            this.q(pushString(endLabel));
            this.q(invokeFunction("goto"));
        }

        const endInstruction = invokeFunction("nop");
        endInstruction.label = endLabel;
        this.q(endInstruction);
    }

    lineIDOf(lineStatement: Line_statementContext): string {
        const hashtags = lineStatement?.hashtag() ?? [];
        let id: string = undefined;
        for (const tag of hashtags) {
            const text = tag.HASHTAG_TEXT().text;
            if (text.startsWith("line:")) {
                id = text.substring("line:".length);
            }
        }
        if (id === undefined) {
            id = `line:${this.currentNodeTitle ?? "unknown"}:${this.generatedLineIDCounter}`;
            this.generatedLineIDCounter += 1;
        }
        if (!this.contentIDs.includes(id)) {
            this.contentIDs.push(id);
        }
        return id;
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
        // Leaving the current node counts as a visit to it.
        if (this.currentNodeTitle !== undefined) {
            this.emitNodeVisitIncrement(this.currentNodeTitle);
        }
        this.qTzo(TZO_cleanstack);
        this.q(pushString(ctx.ID().text));
        this.q(invokeFunction("goto"));
    }

    emitNodeVisitIncrement(nodeName: string) {
        const key = nodeVisitCountKey(nodeName);
        this.q(pushString(key));
        this.q(invokeFunction("getContext"));
        this.q(pushNumber(1));
        this.q(invokeFunction("+"));
        this.q(pushString(key));
        this.q(invokeFunction("setContext"));
    }

    emitNodeVisitInits() {
        const inits: Array<PushNumberInstruction | PushStringInstruction | InvokeFunctionInstruction> = [];
        this.contentIDs.forEach(id => {
            inits.push(pushNumber(0));
            inits.push(pushString(contentViewCountKey(id)));
            inits.push(invokeFunction("setContext"));
        });
        this.nodeTitles.forEach(title => {
            inits.push(pushNumber(0));
            inits.push(pushString(nodeVisitCountKey(title)));
            inits.push(invokeFunction("setContext"));
        });
        this.nodes.forEach(node => {
            if (node.title !== undefined && node.when.some(w => w.kind === "once" || w.kind === "once-if")) {
                inits.push(pushNumber(0));
                inits.push(pushString(contentOnceKey(node.title)));
                inits.push(invokeFunction("setContext"));
            }
        });
        this.lineOnceKeys.forEach(key => {
            inits.push(pushNumber(0));
            inits.push(pushString(key));
            inits.push(invokeFunction("setContext"));
        });
        // Implicitly-declared variables: referenced but never declared/assigned.
        this.referencedVars.forEach(name => {
            if (this.declaredVars.has(name)) {
                return;
            }
            inits.push(pushString(name));
            inits.push(invokeFunction("hasContext"));
            inits.push(invokeFunction("not"));
            inits.push(invokeFunction("jgz"));
            inits.push(invokeFunction("{"));
            inits.push(pushNumber(0));
            inits.push(pushString(name));
            inits.push(invokeFunction("setContext"));
            inits.push(invokeFunction("}"));
        });
        this.qvmState.programList.unshift(...inits);
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
        this.nodeStack.push({ label: `_node_${this.nodeCounter}`, when: [] });
        this.nodeCounter += 1;
        this.q(invokeFunction("{"));
    }

    exitNode(ctx: NodeContext) {
        const record = this.nodeStack.pop();
        if (record !== undefined && record.title !== undefined) {
            this.nodes.push(record);
        }
        // we have to wrap guards around nodes to prevent running into other nodes...
        if (this.currentNodeTitle !== undefined) {
            this.emitNodeVisitIncrement(this.currentNodeTitle);
        }
        this.q(invokeFunction("}"));
        this.currentNodeTitle = undefined;
    }

    enterTitle_header(ctx: Title_headerContext) {
        let id = ctx.ID().text;
        this.currentNodeTitle = id;
        const record = this.nodeStack[this.nodeStack.length - 1];
        if (record !== undefined) {
            record.title = id;
        }
        if (!this.nodeTitles.includes(id)) {
            this.nodeTitles.push(id);
        }
        // Nodes are labelled internally; the title label lives in the dispatch
        // table emitted at the end of the program (see emitNodeDispatch).
        let z = invokeFunction("nop");
        z.label = record?.label ?? id;
        this.q(z);
        if (this.foundFirstNode === false) {
            this.foundFirstNode = true;
            // note: reverse order of these items below, as they're prepended
            this.preq(invokeFunction("goto"));
            this.preq(pushString(id));
        }
    }

    enterWhen_header(ctx: When_headerContext) {
        const record = this.nodeStack[this.nodeStack.length - 1];
        if (record === undefined) {
            return;
        }
        const we = ctx.header_when_expression();
        if (we === undefined) {
            record.when.push({ kind: "always" });
            return;
        }
        if (we._always !== undefined) {
            record.when.push({ kind: "always" });
        } else if (we._once !== undefined) {
            record.when.push({ kind: we.expression() !== undefined ? "once-if" : "once", expression: we.expression() });
        } else {
            record.when.push({ kind: "expr", expression: we.expression() });
        }
    }

    enterHeader(ctx: HeaderContext) {
        // Non-title headers (for example 'tags') carry no QuestVM behaviour.
    }

    enterEnum_statement(ctx: Enum_statementContext) {
        this.currentEnum = ctx._name.text;
        this.enums[this.currentEnum] = {};
        this.enumCaseOrder[this.currentEnum] = [];
    }

    enterEnum_case_statement(ctx: Enum_case_statementContext) {
        const caseName = ctx._name.text;
        const raw = ctx.value() !== undefined ? this.literalValue(ctx.value()) : undefined;
        this.enums[this.currentEnum][caseName] = raw;
        this.enumCaseOrder[this.currentEnum].push(caseName);
    }

    exitEnum_statement(ctx: Enum_statementContext) {
        // Cases without explicit raw values get monotonically increasing numbers.
        let next = 0;
        for (const caseName of this.enumCaseOrder[this.currentEnum] ?? []) {
            let value = this.enums[this.currentEnum][caseName];
            if (value === undefined) {
                value = next;
                this.enums[this.currentEnum][caseName] = value;
            }
            if (typeof value === "number") {
                next = value + 1;
            }
        }
        this.currentEnum = undefined;
    }

    literalValue(ctx: ValueContext): string | number | undefined {
        if (ctx instanceof ValueNumberContext) {
            return parseFloat(ctx.NUMBER().text);
        }
        if (ctx instanceof ValueStringContext) {
            return unquoteYarnString(ctx.STRING().text);
        }
        if (ctx instanceof ValueTrueContext) {
            return 1;
        }
        if (ctx instanceof ValueFalseContext) {
            return 0;
        }
        return undefined;
    }

    resolveEnumMember(typeName: string | undefined, memberName: string, hint?: string) {
        if (typeName !== undefined) {
            const cases = this.enums[typeName];
            if (cases !== undefined && cases[memberName] !== undefined) {
                return { value: cases[memberName], enumName: typeName };
            }
            return undefined;
        }
        if (hint !== undefined) {
            const cases = this.enums[hint];
            if (cases !== undefined && cases[memberName] !== undefined) {
                return { value: cases[memberName], enumName: hint };
            }
        }
        // Implicit `.Member`: only valid if exactly one enum has that case.
        const matches = Object.keys(this.enums).filter(e => this.enums[e][memberName] !== undefined);
        if (matches.length === 1) {
            return { value: this.enums[matches[0]][memberName], enumName: matches[0] };
        }
        return undefined;
    }

    enumTypeOfExpression(ctx: ExpressionContext): string | undefined {
        const valueRef = typeMemberReferenceOf(ctx);
        if (valueRef !== undefined) {
            const ref = valueRef.typeMemberReference();
            return this.resolveEnumMember(ref._typeName?.text, ref._memberName.text, undefined)?.enumName;
        }
        return undefined;
    }

    valueTypeOfExpression(ctx: ExpressionContext): string | undefined {
        if (ctx instanceof ExpParensContext) {
            return this.valueTypeOfExpression(ctx.expression());
        }
        if (ctx instanceof ExpAddSubContext) {
            if (ctx._op.text === "+") {
                const left = this.valueTypeOfExpression(ctx.expression(0));
                const right = this.valueTypeOfExpression(ctx.expression(1));
                if (left === "string" || right === "string") {
                    return "string";
                }
                return "number";
            }
            return "number";
        }
        if (ctx instanceof ExpMultDivModContext || ctx instanceof ExpNegativeContext) {
            return "number";
        }
        if (ctx instanceof ExpComparisonContext || ctx instanceof ExpEqualityContext
            || ctx instanceof ExpAndOrXorContext || ctx instanceof ExpNotContext) {
            return "bool";
        }
        if (ctx instanceof ExpValueContext) {
            const value = ctx.value();
            if (value instanceof ValueStringContext) {
                return "string";
            }
            if (value instanceof ValueNumberContext) {
                return "number";
            }
            if (value instanceof ValueTrueContext || value instanceof ValueFalseContext) {
                return "bool";
            }
            if (value instanceof ValueVarContext) {
                return this.variableTypes[value.variable().VAR_ID().text.substring(1)];
            }
            if (value instanceof ValueTypeMemberReferenceContext) {
                const ref = value.typeMemberReference();
                const resolved = this.resolveEnumMember(ref._typeName?.text, ref._memberName.text, undefined);
                if (resolved !== undefined) {
                    return typeof resolved.value === "string" ? "string" : "number";
                }
            }
        }
        return undefined;
    }

    enterDeclare_statement(ctx: Declare_statementContext) {
        const name = ctx.variable().VAR_ID().text.substring(1);
        this.declaredVars.add(name);
        const explicitType = ctx._type?.text;
        const hint = this.variableEnums[name] ?? (explicitType !== undefined && this.enums[explicitType] !== undefined ? explicitType : undefined);

        // Emit a guarded default: only set the value if it isn't set already,
        // so that host-provided / persisted values are not clobbered.
        this.q(pushString(name));
        this.q(invokeFunction("hasContext"));
        this.q(invokeFunction("not"));
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
        this.expr.compile(ctx.expression(), { enumHint: hint });
        this.q(pushString(name));
        this.q(invokeFunction("setContext"));
        this.q(invokeFunction("}"));

        // Track the declared enum type for later implicit `.Member` resolution.
        const enumType = explicitType !== undefined && this.enums[explicitType] !== undefined
            ? explicitType
            : this.enumTypeOfExpression(ctx.expression());
        if (enumType !== undefined) {
            this.variableEnums[name] = enumType;
        }
        const valueType = explicitType ?? this.valueTypeOfExpression(ctx.expression());
        if (valueType !== undefined) {
            this.variableTypes[name] = valueType;
        }
    }

    exitSet_statement(ctx: Set_statementContext) {
        let varName = ctx.variable().VAR_ID().text.substring(1);
        this.declaredVars.add(varName);
        let op = (ctx as any)._op?.text;
        const hint = this.variableEnums[varName];
        // Compile the right-hand side; its value is left on the stack.
        this.expr.compile(ctx.expression(), { enumHint: hint });
        if (op === undefined || op === "=" || op === "to") {
            this.q(pushString(varName));
            this.q(invokeFunction("setContext"));
        } else {
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

        // Track enum types for later implicit `.Member` resolution.
        const enumType = this.enumTypeOfExpression(ctx.expression());
        if (enumType !== undefined) {
            this.variableEnums[varName] = enumType;
        }
        const valueType = this.valueTypeOfExpression(ctx.expression());
        if (valueType !== undefined) {
            this.variableTypes[varName] = valueType;
        }
    }

    enterIf_statement(ctx: If_statementContext) {
        const elseIfs = ctx.else_if_clause();
        const elseClause = ctx.else_clause();
        const clausesAfter = elseIfs.length + (elseClause !== undefined ? 1 : 0);

        this.expr.compile(ctx.if_clause().expression());
        if (clausesAfter > 0) {
            this.q(invokeFunction("dup"));
        }
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));

        this.ifStack.push({
            elseIfsRemaining: elseIfs.length,
            hasElse: elseClause !== undefined,
            openElse: 0,
            clauseCursor: 0,
        });
    }

    exitIf_clause (ctx: If_clauseContext) {
        this.q(invokeFunction("}"));
    }

    enterElse_if_clause (ctx) {
        const frame = this.ifStack[this.ifStack.length - 1];
        frame.clauseCursor += 1;
        const remainingAfterThis = (frame.elseIfsRemaining - frame.clauseCursor) + (frame.hasElse ? 1 : 0);

        // Close the previous else-region's condition and open a nested region
        // that only runs when the previous condition was false.
        this.q(invokeFunction("jz"));
        this.q(invokeFunction("{"));
        frame.openElse += 1;

        this.expr.compile(ctx.expression());
        if (remainingAfterThis > 0) {
            this.q(invokeFunction("dup"));
        }
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
    }

    exitElse_if_clause (ctx) {
        this.q(invokeFunction("}"));
    }

    enterElse_clause (ctx: Else_clauseContext) {
        this.q(invokeFunction("jz"));
        this.q(invokeFunction("{"));
    }

    exitElse_clause (ctx: Else_clauseContext) {
        this.q(invokeFunction("}"));
    }

    exitIf_statement (ctx: If_statementContext) {
        const frame = this.ifStack.pop();
        // Close any else-regions opened for else-if clauses.
        for (let i = 0; i < frame.openElse; i++) {
            this.q(invokeFunction("}"));
        }
    }

    emitNodeDispatch() {
        if (this.nodes.length === 0) {
            return;
        }
        // The dispatch table lives at the end of the program, wrapped in a
        // guard block so normal fall-through skips over it. Jumping to a
        // title label lands inside the block.
        this.q(invokeFunction("{"));
        const titles: string[] = [];
        for (const node of this.nodes) {
            if (node.title !== undefined && !titles.includes(node.title)) {
                titles.push(node.title);
            }
        }
        for (const title of titles) {
            const members = this.nodes.filter(n => n.title === title);
            const isGroup = members.some(m => m.when.length > 0);

            const titleInstruction = invokeFunction("nop");
            titleInstruction.label = title;
            this.q(titleInstruction);

            if (!isGroup) {
                this.q(pushString(members[0].label));
                this.q(invokeFunction("goto"));
            } else {
                if (!this.contentIDs.includes(title)) {
                    this.contentIDs.push(title);
                }
                const groupId = this.nodeGroupCounter;
                this.nodeGroupCounter += 1;
                const exitLabel = `_ng_${groupId}_exit`;
                const candidates = members.map(member => ({
                    label: member.label,
                    complexity: this.nodeWhenComplexity(member),
                    contentID: title,
                    emitCondition: () => this.emitNodeWhenConditions(member),
                    onSelected: () => this.emitNodeOnceSet(member),
                }));
                this.saliency.emitSelection(groupId, candidates, exitLabel);
                const exitInstruction = invokeFunction("nop");
                exitInstruction.label = exitLabel;
                this.q(exitInstruction);
                // No eligible content: stop the dialogue.
                this.q(invokeFunction("exit"));
            }
        }
        this.q(invokeFunction("}"));
    }

    nodeWhenComplexity(node: NodeRecord): number {
        let complexity = 0;
        for (const clause of node.when) {
            if (clause.kind === "always") {
                continue;
            }
            if (clause.kind === "once") {
                complexity += 1;
            } else if (clause.kind === "once-if") {
                complexity += 2 + countBooleanOperators(clause.expression);
            } else {
                complexity += 1 + countBooleanOperators(clause.expression);
            }
        }
        return complexity;
    }

    emitNodeWhenCondition(clause: WhenClause, title: string): void {
        if (clause.kind === "always") {
            this.q(pushNumber(1));
            return;
        }
        if (clause.kind === "once") {
            this.q(pushString(contentOnceKey(title)));
            this.q(invokeFunction("getContext"));
            this.q(invokeFunction("not"));
            return;
        }
        if (clause.kind === "once-if") {
            this.q(pushString(contentOnceKey(title)));
            this.q(invokeFunction("getContext"));
            this.q(invokeFunction("not"));
            this.expr.compile(clause.expression);
            this.q(invokeFunction("and"));
            return;
        }
        this.expr.compile(clause.expression);
    }

    emitNodeWhenConditions(node: NodeRecord): void {
        if (node.when.length === 0) {
            this.q(pushNumber(1));
            return;
        }
        node.when.forEach((clause, index) => {
            this.emitNodeWhenCondition(clause, node.title);
            if (index > 0) {
                this.q(invokeFunction("and"));
            }
        });
    }

    emitNodeOnceSet(node: NodeRecord): void {
        for (const clause of node.when) {
            if (clause.kind === "once" || clause.kind === "once-if") {
                this.q(pushNumber(1));
                this.q(pushString(contentOnceKey(node.title)));
                this.q(invokeFunction("setContext"));
            }
        }
    }

    getQVMState() {
        this.emitNodeDispatch();
        this.emitNodeVisitInits();
        return this.qvmState;
    }
}

export function parse(input: string, errorListener?: ANTLRErrorListener<any>, options?: { saliency?: SaliencyStrategy }) {
    // Create the lexer and parser
    let inputStream = new ANTLRInputStream(input);
    let lexer = new YarnSpinnerLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer as any);
    let parser = new YarnSpinnerParser(tokenStream);
    if (errorListener != null) {
        parser.addErrorListener(errorListener);
    }
    let tree = parser.dialogue();
    const listener = new Listener(tokenStream, options?.saliency);
    ParseTreeWalker.DEFAULT.walk(listener as YarnSpinnerParserListener, tree)
    console.log(lexer.Warnings);
    return {
        vmState: listener.getQVMState(),
        warnings: lexer.Warnings,
        tokens: tokenStream.getTokens()
    }
}

function countBooleanOperators(ctx: ExpressionContext): number {
    if (ctx === undefined || ctx === null) {
        return 0;
    }
    let count = ctx instanceof ExpAndOrXorContext ? 1 : 0;
    if (ctx.children) {
        ctx.children.forEach(child => {
            if (child instanceof ExpressionContext) {
                count += countBooleanOperators(child);
            }
        });
    }
    return count;
}