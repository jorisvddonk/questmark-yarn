import { ExpressionContext } from "./grammars/YarnSpinnerParser";
import { ExpressionCompiler } from "./expression";
import { invokeFunction, pushNumber, pushString } from "tzo";
import { InvokeFunctionInstruction, PushNumberInstruction, PushStringInstruction } from "tzo";

export type SaliencyStrategy =
    | "first"
    | "best"
    | "best-least-recently-viewed"
    | "random-best-least-recently-viewed";

export const SALIENCY_STRATEGIES: SaliencyStrategy[] = [
    "first",
    "best",
    "best-least-recently-viewed",
    "random-best-least-recently-viewed",
];

export function contentViewCountKey(contentID: string): string {
    return `$Yarn.Internal.Content.ViewCount.${contentID}`;
}

export function contentOnceKey(contentID: string): string {
    return `$Yarn.Internal.Once.${contentID}`;
}

export type EmitInstruction = (i: PushNumberInstruction | PushStringInstruction | InvokeFunctionInstruction) => void;

export interface SaliencyCandidate {
    // Label of the code to run if this candidate is selected.
    label: string;
    // Optional eligibility condition. Absent means always eligible.
    condition?: ExpressionContext;
    // Arbitrary eligibility code (leaves 1/0 on the stack). Takes precedence
    // over `condition`, and is used for things like `when: once` flags.
    emitCondition?: () => void;
    // Compile-time complexity score (number of conditions).
    complexity: number;
    // Content identifier, used for view-count tracking.
    contentID: string;
    // Extra code emitted immediately before jumping to this candidate, used
    // for per-candidate side effects (e.g. setting a `when: once` flag).
    onSelected?: () => void;
}

export class SaliencyCompiler {
    constructor(
        private q: EmitInstruction,
        private expr: ExpressionCompiler,
        public strategy: SaliencyStrategy,
    ) { }

    /**
     * Emits code that evaluates the candidates and jumps to the label of the
     * selected one (or to `noContentLabel` if none is eligible).
     */
    emitSelection(groupId: number, candidates: SaliencyCandidate[], noContentLabel: string): void {
        if (candidates.length === 0) {
            this.jump(noContentLabel);
            return;
        }
        switch (this.strategy) {
            case "first":
                this.emitFirstBest(candidates, noContentLabel, false);
                return;
            case "best":
                this.emitFirstBest(candidates, noContentLabel, true);
                return;
            case "best-least-recently-viewed":
                this.emitLeastRecentlyViewed(groupId, candidates, noContentLabel, false);
                return;
            case "random-best-least-recently-viewed":
                this.emitLeastRecentlyViewed(groupId, candidates, noContentLabel, true);
                return;
        }
    }

    private emitFirstBest(candidates: SaliencyCandidate[], noContentLabel: string, sortByComplexity: boolean): void {
        const ordered = sortByComplexity ? stableByComplexityDesc(candidates) : candidates;
        for (const candidate of ordered) {
            this.emitConditionGuard(candidate, () => {
                this.emitOnSelected(candidate);
                this.jump(candidate.label);
            });
        }
        this.jump(noContentLabel);
    }

    private emitLeastRecentlyViewed(groupId: number, candidates: SaliencyCandidate[], noContentLabel: string, random: boolean): void {
        const minKey = `_sal_min_${groupId}`;
        const maxKey = `_sal_max_${groupId}`;
        const kKey = `_sal_k_${groupId}`;
        const rKey = `_sal_r_${groupId}`;
        const idxKey = `_sal_idx_${groupId}`;

        // Phase 1: find the minimum view count among eligible candidates.
        this.setContext(minKey, () => this.q(pushNumber(2147483647)));
        this.reemitMinPhase(groupId, candidates, minKey);

        if (!random) {
            // Phase 2: among eligible candidates with the minimum view count,
            // pick the highest complexity; ties keep source order.
            for (const candidate of stableByComplexityDesc(candidates)) {
                this.emitConditionGuard(candidate, () => {
                    this.readContentCount(candidate.contentID);
                    this.q(pushString(minKey));
                    this.q(invokeFunction("getContext"));
                    this.q(invokeFunction("eq"));
                    this.emitGuard(() => {
                        this.emitOnSelected(candidate);
                        this.emitViewCountIncrement(candidate.contentID);
                        this.jump(candidate.label);
                    });
                });
            }
            this.jump(noContentLabel);
            return;
        }

        // Random variant.
        // Phase 2: find the highest complexity among eligible/min-count candidates.
        this.setContext(maxKey, () => this.q(pushNumber(-1)));
        for (const candidate of candidates) {
            this.emitConditionGuard(candidate, () => {
                this.readContentCount(candidate.contentID);
                this.q(pushString(minKey));
                this.q(invokeFunction("getContext"));
                this.q(invokeFunction("eq"));
                this.emitGuard(() => {
                    this.q(pushString(maxKey));
                    this.q(invokeFunction("getContext"));
                    this.q(pushNumber(candidate.complexity));
                    this.q(invokeFunction("gt"));
                    this.emitGuard(() => {
                        this.q(pushNumber(candidate.complexity));
                        this.q(pushString(maxKey));
                        this.q(invokeFunction("setContext"));
                    });
                });
            });
        }

        // Phase 3: count the members of the final subgroup.
        this.setContext(kKey, () => this.q(pushNumber(0)));
        for (const candidate of candidates) {
            this.emitConditionGuard(candidate, () => {
                this.readContentCount(candidate.contentID);
                this.q(pushString(minKey));
                this.q(invokeFunction("getContext"));
                this.q(invokeFunction("eq"));
                this.emitGuard(() => {
                    this.q(pushString(maxKey));
                    this.q(invokeFunction("getContext"));
                    this.q(pushNumber(candidate.complexity));
                    this.q(invokeFunction("eq"));
                    this.emitGuard(() => {
                        this.q(pushString(kKey));
                        this.q(invokeFunction("getContext"));
                        this.q(pushNumber(1));
                        this.q(invokeFunction("+"));
                        this.q(pushString(kKey));
                        this.q(invokeFunction("setContext"));
                    });
                });
            });
        }

        // Pick a random index into the subgroup.
        this.q(pushString(kKey));
        this.q(invokeFunction("getContext"));
        this.q(invokeFunction("randInt"));
        this.setContext(rKey, () => { });
        this.setContext(idxKey, () => this.q(pushNumber(0)));

        // Phase 4: walk source order, selecting the r-th subgroup member.
        for (const candidate of candidates) {
            this.emitConditionGuard(candidate, () => {
                this.readContentCount(candidate.contentID);
                this.q(pushString(minKey));
                this.q(invokeFunction("getContext"));
                this.q(invokeFunction("eq"));
                this.emitGuard(() => {
                    this.q(pushString(maxKey));
                    this.q(invokeFunction("getContext"));
                    this.q(pushNumber(candidate.complexity));
                    this.q(invokeFunction("eq"));
                    this.emitGuard(() => {
                        this.q(pushString(rKey));
                        this.q(invokeFunction("getContext"));
                        this.q(pushString(idxKey));
                        this.q(invokeFunction("getContext"));
                        this.q(invokeFunction("eq"));
                        this.emitGuard(() => {
                            this.emitOnSelected(candidate);
                            this.emitViewCountIncrement(candidate.contentID);
                            this.jump(candidate.label);
                        });
                        // not our index: idx += 1
                        this.q(pushString(idxKey));
                        this.q(invokeFunction("getContext"));
                        this.q(pushNumber(1));
                        this.q(invokeFunction("+"));
                        this.q(pushString(idxKey));
                        this.q(invokeFunction("setContext"));
                    });
                });
            });
        }
        this.jump(noContentLabel);
    }

    // Emits: if candidate.condition (or true) { body }
    private emitConditionGuard(candidate: SaliencyCandidate, body: () => void): void {
        if (candidate.emitCondition !== undefined) {
            candidate.emitCondition();
        } else if (candidate.condition !== undefined) {
            this.expr.compile(candidate.condition);
        } else {
            this.q(pushNumber(1));
        }
        this.emitGuard(body);
    }

    // Emits: jgz { body }
    private emitGuard(body: () => void): void {
        this.q(invokeFunction("jgz"));
        this.q(invokeFunction("{"));
        body();
        this.q(invokeFunction("}"));
    }

    private emitOnSelected(candidate: SaliencyCandidate): void {
        if (candidate.onSelected !== undefined) {
            candidate.onSelected();
        }
    }

    private emitViewCountIncrement(contentID: string): void {
        const key = contentViewCountKey(contentID);
        this.q(pushString(key));
        this.q(invokeFunction("getContext"));
        this.q(pushNumber(1));
        this.q(invokeFunction("+"));
        this.q(pushString(key));
        this.q(invokeFunction("setContext"));
    }

    private readContentCount(contentID: string): void {
        this.q(pushString(contentViewCountKey(contentID)));
        this.q(invokeFunction("getContext"));
    }

    private setContext(key: string, pushValue: () => void): void {
        pushValue();
        this.q(pushString(key));
        this.q(invokeFunction("setContext"));
    }

    private jump(label: string): void {
        this.q(pushString(label));
        this.q(invokeFunction("goto"));
    }

    private reemitMinPhase(groupId: number, candidates: SaliencyCandidate[], minKey: string): void {
        // `count < min`: push min (second), then count (top), then lt.
        for (const candidate of candidates) {
            this.emitConditionGuard(candidate, () => {
                this.q(pushString(minKey));
                this.q(invokeFunction("getContext"));
                this.readContentCount(candidate.contentID);
                this.q(invokeFunction("lt"));
                this.emitGuard(() => {
                    this.readContentCount(candidate.contentID);
                    this.q(pushString(minKey));
                    this.q(invokeFunction("setContext"));
                });
            });
        }
    }
}

function stableByComplexityDesc(candidates: SaliencyCandidate[]): SaliencyCandidate[] {
    return candidates
        .map((c, index) => ({ c, index }))
        .sort((a, b) => (b.c.complexity - a.c.complexity) || (a.index - b.index))
        .map(x => x.c);
}