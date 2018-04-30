#!/usr/bin/env node

import { GitGrep } from "./grep-programs/gitgrep";
import { Grep } from "./grep-programs/grep";
import { RipGrep } from "./grep-programs/ripgrep";
import { IGrep } from "./interfaces/IGrep";
import { Printer } from "./printer";
import { Program } from "./program";

const program = require("commander");

const executable = new Program();
const version = "0.1.2";

function increaseVerbosity(v: any, total: any) {
    return total + 1;
}

program
    .version(version)
    .option("-u, --usage-count", "Show warnings for any css selector <= usage-count.")
    .option("-v, --verbose", "Detailed information about the matches will be displayed.", increaseVerbosity, 0)
    .option("-f, --file <path>", "The css file to run mort against.")
    .option("-p, --program <program>", "Force mort to use a grep program of your choice. " +
                              "Supported ones are 'ripgrep', 'gitgrep', and 'grep'.")
    .parse(process.argv);

if (!program.file) {
    console.log("Please supply a css file");
} else {
    const printer = new Printer(program.verbose, 0, program.file);

    let grepProgram = new RipGrep();

    // Respect the user's program
    if (program.program === "gitgrep") {
        grepProgram = new GitGrep();
    }

    if (program.program === "grep") {
        grepProgram = new Grep();
    }

    grepProgram.run(
        program.file,
        ".",
        printer,
    );
}
