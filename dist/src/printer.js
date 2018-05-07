"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class Printer {
    constructor(verbose, userDefinedUsageCount, file) {
        this.verboseMessage = "Running mort in verbose mode";
        this.verbose = verbose;
        this.userDefinedUsageCount = userDefinedUsageCount;
        this.file = file;
        if (this.verbose) {
            console.log(chalk.yellow(this.verboseMessage + ` [Verbosity: ${this.verbose}]`));
            console.log(chalk.yellow(`Scanning ${this.file} ...`));
        }
    }
    /**
     * Prints out the usages for each selector if they are <= userDefinedUsageCount
     * TODO selector below is actually a random object constructed in findUsages. Refactor
     * this to typehint that
     */
    printUsage(selector) {
        if (this.verbose === 3) {
            console.log(`Searching for ${chalk.green(selector.selector.rawName)}`);
        }
        if (selector.usages <= this.userDefinedUsageCount) {
            console.log(`${selector.usages} usages found. ${chalk.green(selector.selector.rawName)} can probably be removed.`);
            if (this.verbose) {
                if (selector.foundIn.length <= this.userDefinedUsageCount) {
                    console.log(`Command used was: ${chalk.yellow(selector.commandUsed)}\n`);
                }
            }
        }
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map