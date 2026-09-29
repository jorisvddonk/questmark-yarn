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
    "<=": "gt",
    ">": "gt",
    ">=": "lt",
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
const NEGATED_OPERATORS = new Set([">=", "<=", "!=", "neq", "xor", "^"]);

/**
 * Compiles a Yarn Spinner expression parse tree into Tzo instructions.
 *
 * Emitted instructions leave exactly the expression's value on the stack.
 * Numbers and booleans are represented as Tzo numbers (booleans as 1/0),
 * strings as Tzo strings.
 */
export class ExpressionCompiler {
    constructor(private emit: EmitInstruction) { }

    compile(ctx: ExpressionContext): void {
        if (ctx instanceof ExpParensContext) {
            this.compile(ctx.expression());
            return;
        }
        if (ctx instanceof ExpNegativeContext) {
            // unary minus: 0 - x
            this.compile(ctx.expression());
            this.pushNumber(0);
            this.invoke("-");
            return;
        }
        if (ctx instanceof ExpNotContext) {
            this.compile(ctx.expression());
            this.invoke("not");
            return;
        }
        if (ctx instanceof ExpMultDivModContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text);
            return;
        }
        if (ctx instanceof ExpAddSubContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text);
            return;
        }
        if (ctx instanceof ExpComparisonContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text);
            return;
        }
        if (ctx instanceof ExpEqualityContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text);
            return;
        }
        if (ctx instanceof ExpAndOrXorContext) {
            this.binary(ctx.expression(0), ctx.expression(1), ctx._op.text);
            return;
        }
        if (ctx instanceof ExpValueContext) {
            this.compileValue(ctx.value());
            return;
        }
        throw new Error(`ExpressionCompiler: unsupported expression node ${ctx.constructor.name}: ${ctx.text}`);
    }

    private binary(left: ExpressionContext, right: ExpressionContext, op: string): void {
        const base = OPERATOR_MAP[op];
        if (base === undefined) {
            throw new Error(`ExpressionCompiler: unsupported operator '${op}'`);
        }
        this.compile(right);
        this.compile(left);
        this.invoke(base);
        if (NEGATED_OPERATORS.has(op)) {
            this.invoke("not");
        }
    }

    private compileValue(ctx: ValueContext): void {
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
            this.compileFunctionCall(ctx.function_call());
            return;
        }
        if (ctx instanceof ValueTypeMemberReferenceContext) {
            // TODO: resolve enum member references to their underlying value at
            // compile time once enums/declarations are tracked.
            this.pushString(ctx.text);
            return;
        }
        throw new Error(`ExpressionCompiler: unsupported value node ${ctx.constructor.name}: ${ctx.text}`);
    }

    private compileVariable(varId: string): void {
        // varId is like "$gold_amount"; the context key drops the leading '$'.
        this.pushString(varId.substring(1));
        this.invoke("getContext");
    }

    private compileFunctionCall(ctx: Function_callContext): void {
        const args = ctx.expression();
        // Push arguments in reverse so that the first argument is on top of the
        // stack, matching the "param1 = top" convention used by Tzo callables.
        for (let i = args.length - 1; i >= 0; i--) {
            this.compile(args[i]);
        }
        this.invoke(`${YARN_FUNCTION_PREFIX}${ctx.FUNC_ID().text}`);
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

function unquoteYarnString(text: string): string {
    let inner = text;
    if (inner.length >= 2 && inner.startsWith('"') && inner.endsWith('"')) {
        inner = inner.substring(1, inner.length - 1);
    }
    return inner.replace(/\\(["\\])/g, "$1");
}
