#!/usr/bin/env node
// A small end-to-end development harness: compile a .yarn file and run the
// resulting QuestVM/Tzo program headlessly, printing the emitted transcript.
// Choices are auto-selected (first by default, or via --choice <n>).

import fs from "fs";
import program from "commander";
import { getStackParams, VM } from "tzo";
import { Stack } from "tzo";
import { parse } from "./parser";

program
    .option('--input <path>', "Load source .yarn file from path")
    .option('--choice <n>', "Zero-based choice index to select when prompted", "0")
    .parse(process.argv);

if (!program.input) {
    console.error("Missing input! Please specify an input file via --input");
    process.exit(1);
}

const choiceIndex = Number.parseInt(program.choice, 10) || 0;

const input = fs.readFileSync(program.input).toString();
const result = parse(input);

const output: string[] = [];
const responses: { response: string, pc: number }[] = [];

const vm = new VM({}, {
    "emit": (stack: Stack) => {
        const [value] = getStackParams("emit", ["string | number"], stack) as [string | number];
        output.push(`${value}`);
    },
    "response": (stack: Stack) => {
        const [pc, response] = getStackParams("response", ["number", "string"], stack) as [number, string];
        responses.push({ response, pc });
    },
    "getResponse": (stack: Stack, context, vm: VM) => {
        const choices = responses.map((r, index) => ({ title: r.response, programCounter: r.pc, id: index }));
        responses.length = 0;
        if (choices.length === 0) {
            vm.quit();
            return;
        }
        const pick = choiceIndex >= 0 && choiceIndex < choices.length ? choiceIndex : 0;
        output.push(`> ${choices[pick].title}\n`);
        stack.push(choices[pick].programCounter);
    },
    // Not part of the Tzo standard runtime, but needed to compile Yarn's
    // division/modulo operators. See ROADMAP.
    "/": (stack: Stack) => {
        const [a, b] = getStackParams("/", ["number", "number"], stack) as [number, number];
        stack.push(a / b);
    },
    "%": (stack: Stack) => {
        const [a, b] = getStackParams("%", ["number", "number"], stack) as [number, number];
        stack.push(a % b);
    },
    // A small set of Yarn built-in functions, for development only. Real hosts
    // must provide these under the same "yarn." names.
    "yarn.min": (stack: Stack) => {
        const [a, b] = getStackParams("yarn.min", ["number", "number"], stack) as [number, number];
        stack.push(Math.min(a, b));
    },
    "yarn.max": (stack: Stack) => {
        const [a, b] = getStackParams("yarn.max", ["number", "number"], stack) as [number, number];
        stack.push(Math.max(a, b));
    },
    "yarn.round": (stack: Stack) => {
        const [a] = getStackParams("yarn.round", ["number"], stack) as [number];
        stack.push(Math.round(a));
    },
    "yarn.floor": (stack: Stack) => {
        const [a] = getStackParams("yarn.floor", ["number"], stack) as [number];
        stack.push(Math.floor(a));
    },
    "yarn.ceil": (stack: Stack) => {
        const [a] = getStackParams("yarn.ceil", ["number"], stack) as [number];
        stack.push(Math.ceil(a));
    },
    "yarn.decimal": (stack: Stack) => {
        const [a] = getStackParams("yarn.decimal", ["number"], stack) as [number];
        stack.push(a.toFixed(2));
    },
    "yarn.inc": (stack: Stack) => {
        const [a] = getStackParams("yarn.inc", ["number"], stack) as [number];
        stack.push(a + 1);
    },
    "yarn.dec": (stack: Stack) => {
        const [a] = getStackParams("yarn.dec", ["number"], stack) as [number];
        stack.push(a - 1);
    },
    "yarn.random": (stack: Stack) => {
        stack.push(Math.random());
    },
});

vm.loadVMState(result.vmState as any);

// Step manually so we can bail out of runaway scripts (e.g. a choice that
// loops back to the start) instead of running out of memory.
const MAX_STEPS = 200000;
let steps = 0;
while (!vm.exit && !vm.pause && steps < MAX_STEPS) {
    vm.tick();
    steps += 1;
}
if (steps >= MAX_STEPS) {
    process.stderr.write(`\ndevrun: exceeded ${MAX_STEPS} steps; possible infinite loop\n`);
}

process.stdout.write(output.join(""));
