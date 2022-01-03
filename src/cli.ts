#!/usr/bin/env node

import fs from "fs";
import program from "commander";
import { TzoVMState } from "tzo";
import fetch from "node-fetch";
import { parse } from "./parser";

program
    .version('0.0.6')
    .option('--input <path>', "Load source .yarn file from path. Path can be either from local filesystem, or via HTTP(S) URL")
    .option('--output <path>', "Emit VMState .json file")
    .parse(process.argv);

if (!program.input) {
    console.log("Missing input! Please specify an input file via --input");
    process.exit(1);
}

async function load() {
    let input_file;
    if (program.input.startsWith("http://") || program.input.startsWith("https://")) {
        const res = await fetch(program.input);
        input_file = await res.text();
    } else {
        const input_file_buf = await fs.promises.readFile(program.input);
        input_file = input_file_buf.toString();
    }
    return input_file
}

(async () => {
    const input_file = await load();
    let vmState: TzoVMState = undefined;

    if (program.input.endsWith(".yarn") || program.input.endsWith(".yarn.html")) {
        vmState = parse(input_file);
    } else {
        throw new Error("Program input file needs to have .json or .yarn / .yarn.html extension!")
    }

    if (program.output) {
        fs.writeFileSync(program.output, JSON.stringify(vmState, null, 2));
    }
})();
