import {
    ExpAddSubContext,
    ExpAndOrXorContext,
    ExpComparisonContext,
    ExpEqualityContext,
    ExpMultDivModContext,
    ExpNegativeContext,
    ExpNotContext,
    ExpParensContext,
    ExpValueContext,
    ExpressionContext,
    Function_callContext,
    ValueContext,
    ValueFalseContext,
    ValueFuncContext,
    ValueNumberContext,
    ValueStringContext,
    ValueTrueContext,
    ValueTypeMemberReferenceContext,
    ValueVarContext,
} from "./grammars/YarnSpinnerParser";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction } from "tzo";
import { invokeFunction, pushNumber, pushString } from "tzo";

export type EmitInstruction = (i: PushNumberInstruction | PushStringInstruction | InvokeFunctionInstruction) => void;

// Yarn-level functions and commands are emitted under this prefix so that they
// cannot collide with Tzo standard opcodes (e.g. Yarn's `min` function vs Tzo's
// `min` (= subtract) opcode). Hosts register their functions/commands under
// `yarn.<name>`.
export const YARN_FUNCTION_PREFIX = "yarn.";

// Context key under which a node's visit count is stored. Written by the
// compiler at node exit, read by the inlined `visited`/`visited_count`.
export function nodeVisitCountKey(nodeName: string): string {
    return `$Yarn.Internal.NodeVisitCount.${nodeName}`;
}

export interface ResolvedEnumMember {
    value: string | number;
    enumName: string;
}

export interface EnumResolver {
    resolveEnumMember(typeName: string | undefined, memberName: string, hint?: string): ResolvedEnumMember | undefined;
}

export interface CompileOptions {
    // The enum a bare `.Member` reference should be resolved against, usually
    // the declared type of the variable being assigned to.
    enumHint?: string;
}

// Tzo's binary opcodes follow the convention "top-of-stack OP second-on-stack".
// Yarn expressions are left-associative, so we push the right operand first and
// the left operand second; the left operand then ends up on top.
const OPERATOR_MAP: { [key: string]: string } = {
    "*": "*",
    "/": "/",
    "%": "%",
    "+": "+",
    "-": "-",
    "<": "lt",
    "lt": "lt",
    "<=": "gt",
    "lte": "gt",
    ">": "gt",
    "gt": "gt",
    ">=": "lt",
    "gte": "lt",
    "==": "eq",
    "is": "eq",
    "eq": "eq",
    "!=": "eq",
    "neq": "eq",
    "and": "and",
    "&&": "and",
    "or": "or",
    "||": "or",
    "xor": "eq",
    "^": "eq",
};

// Operators whose result is the negation of their base Tzo opcode.
const NEGATED_OPERATORS = new Set([">=", "gte", "<=", "lte", "!=", "neq", "xor", "^"]);

/**
 * Compiles a Yarn Spinner expression parse tree into Tzo instructions.
 *
 * Emitted instructions leave exactly the expression's value on the stack.
 * Numbers and booleans are represented as Tzo numbers (booleans as 1/0),
 * strings as Tzo strings.
 */
export class ExpressionCompiler {
    constructor(
        private emit: EmitInstruction,
        private enumResolver?: EnumResolver,
        private variableTracker?: (name: string) => void,
        private variableTypeResolver?: (name: string) => string | undefined,
        private hasAnyContentHook?: (groupName: string) => void,
    ) { }

    compile(ctx: ExpressionContext, options?: CompileOptions): void {
        if (ctx instanceof ExpParensContext) {
            this.compile(ctx.expression(), options);
            return;
        }
        if (ctx instanceof ExpNegativeContext) {
            // unary minus: 0 - x
            this.compile(ctx.expression(), options);
            this.pushNumber(0);
            this.invoke("-");
            return;
        }
        if (ctx instanceof ExpNotContext) {
            this.compile(ctx.expression(), options);
            this.invoke("not");
            return;
        }
        if (ctx instanceof ExpMultDivModContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text, options);
            return;
        }
        if (ctx instanceof ExpAddSubContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text, options);
            return;
        }
        if (ctx instanceof ExpComparisonContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text, options);
            return;
        }
        if (ctx instanceof ExpEqualityContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text, options);
            return;
        }
        if (ctx instanceof ExpAndOrXorContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text, options);
            return;
        }
        if (ctx instanceof ExpValueContext) {
            this.compileValue(ctx.value(), options);
            return;
        }
        throw new Error(`ExpressionCompiler: unsupported expression node ${ctx.constructor.name}: ${ctx.text}`);
    }

    private binary(left: ExpressionContext, right: ExpressionContext, op: string, options?: CompileOptions): void {
        // Yarn's '+' is overloaded: string concatenation when either side is a
        // string, numeric addition otherwise.
        if (op === "+" && (this.isStringExpression(left) || this.isStringExpression(right))) {
            this.compile(right, options);
            this.compile(left, options);
            this.invoke("concat");
            return;
        }
        const base = OPERATOR_MAP[op];
        if (base === undefined) {
            throw new Error(`ExpressionCompiler: unsupported operator '${op}'`);
        }
        this.compile(right, options);
        this.compile(left, options);
        this.invoke(base);
        if (NEGATED_OPERATORS.has(op)) {
            this.invoke("not");
        }
    }

    private isStringExpression(ctx: ExpressionContext): boolean {
        if (ctx instanceof ExpParensContext) {
            return this.isStringExpression(ctx.expression());
        }
        if (ctx instanceof ExpAddSubContext && ctx._op.text === "+") {
            return this.isStringExpression(ctx.expression(0)) || this.isStringExpression(ctx.expression(1));
        }
        if (ctx instanceof ExpValueContext) {
            const value = ctx.value();
            if (value instanceof ValueStringContext) {
                return true;
            }
            if (value instanceof ValueVarContext) {
                const name = value.variable().VAR_ID().text.substring(1);
                return this.variableTypeResolver?.(name) === "string";
            }
            if (value instanceof ValueTypeMemberReferenceContext) {
                const ref = value.typeMemberReference();
                const resolved = this.enumResolver?.resolveEnumMember(ref._typeName?.text, ref._memberName.text, undefined);
                return resolved !== undefined && typeof resolved.value === "string";
            }
        }
        return false;
    }

    private compileValue(ctx: ValueContext, options?: CompileOptions): void {
        if (ctx instanceof ValueNumberContext) {
            this.pushNumber(parseFloat(ctx.NUMBER().text));
            return;
        }
        if (ctx instanceof ValueStringContext) {
            this.pushString(unquoteYarnString(ctx.STRING().text));
            return;
        }
        if (ctx instanceof ValueTrueContext) {
            this.pushNumber(1);
            return;
        }
        if (ctx instanceof ValueFalseContext) {
            this.pushNumber(0);
            return;
        }
        if (ctx instanceof ValueVarContext) {
            this.compileVariable(ctx.variable().VAR_ID().text);
            return;
        }
        if (ctx instanceof ValueFuncContext) {
            this.compileFunctionCall(ctx.function_call(), options);
            return;
        }
        if (ctx instanceof ValueTypeMemberReferenceContext) {
            const ref = ctx.typeMemberReference();
            const resolved = this.enumResolver?.resolveEnumMember(
                ref._typeName?.text,
                ref._memberName.text,
                options?.enumHint,
            );
            if (resolved !== undefined) {
                if (typeof resolved.value === "number") {
                    this.pushNumber(resolved.value);
                } else {
                    this.pushString(resolved.value);
                }
                return;
            }
            // Fall back to the qualified name as a plain string.
            this.pushString(ctx.text);
            return;
        }
        throw new Error(`ExpressionCompiler: unsupported value node ${ctx.constructor.name}: ${ctx.text}`);
    }

    private compileVariable(varId: string): void {
        // varId is like "$gold_amount"; the context key drops the leading '$'.
        const name = varId.substring(1);
        if (this.variableTracker !== undefined) {
            this.variableTracker(name);
        }
        this.pushString(name);
        this.invoke("getContext");
    }

    private compileFunctionCall(ctx: Function_callContext, options?: CompileOptions): void {
        const name = ctx.FUNC_ID().text;
        const args = ctx.expression();

        // `visited`/`visited_count` with a literal node name are desugared to
        // context lookups; the compiler initialises all node visit counters at
        // startup and increments them when a node is left.
        if ((name === "visited" || name === "visited_count") && args.length === 1) {
            const nodeName = asStringLiteral(args[0]);
            if (nodeName !== undefined) {
                const key = nodeVisitCountKey(nodeName);
                if (name === "visited") {
                    // count > 0
                    this.pushNumber(0);
                    this.pushString(key);
                    this.invoke("getContext");
                    this.invoke("gt");
                } else {
                    this.pushString(key);
                    this.invoke("getContext");
                }
                return;
            }
        }

        // `has_any_content("<group>")` with a literal group name is compiled to a
        // generated subroutine (emitted once all nodes are known) that ORs the
        // group members' conditions together.
        if (name === "has_any_content" && args.length === 1 && this.hasAnyContentHook !== undefined) {
            const groupName = asStringLiteral(args[0]);
            if (groupName !== undefined) {
                this.hasAnyContentHook(groupName);
                return;
            }
        }

        // Push arguments in reverse so that the first argument is on top of the
        // stack, matching the "param1 = top" convention used by Tzo callables.
        for (let i = args.length - 1; i >= 0; i--) {
            this.compile(args[i], options);
        }
        this.invoke(`${YARN_FUNCTION_PREFIX}${name}`);
    }

    private pushNumber(value: number): void {
        this.emit(pushNumber(value));
    }

    private pushString(value: string): void {
        this.emit(pushString(value));
    }

    private invoke(functionName: string): void {
        this.emit(invokeFunction(functionName));
    }
}

export function unquoteYarnString(text: string): string {
    let inner = text;
    if (inner.length >= 2 && inner.startsWith('"') && inner.endsWith('"')) {
        inner = inner.substring(1, inner.length - 1);
    }
    return inner.replace(/\\(["\\])/g, "$1");
}

function asStringLiteral(ctx: ExpressionContext): string | undefined {
    if (ctx instanceof ExpValueContext) {
        const value = ctx.value();
        if (value instanceof ValueStringContext) {
            return unquoteYarnString(value.STRING().text);
        }
    }
    return undefined;
}

// Exposed for the listener, which needs to inspect enum member references to
// track variable types.
export function typeMemberReferenceOf(ctx: ExpressionContext): ValueTypeMemberReferenceContext | undefined {
    if (ctx instanceof ExpValueContext) {
        const value = ctx.value();
        if (value instanceof ValueTypeMemberReferenceContext) {
            return value;
        }
    }
    return undefined;
}