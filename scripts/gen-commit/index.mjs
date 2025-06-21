#!/usr/bin/env node
import clipboard from "clipboardy";
import { program } from "commander";
import inquirer from "inquirer";

program.option("--copy", "Copy result to clipboard");
program.parse(process.argv);
const options = program.opts();

const types = [
    { name: "feat     → A new feature", value: "feat" },
    { name: "fix      → A bug fix", value: "fix" },
    { name: "docs     → Documentation only", value: "docs" },
    { name: "style    → Code style only (formatting)", value: "style" },
    { name: "refactor → Code change without bug or feature", value: "refactor" },
    { name: "perf     → Performance improvement", value: "perf" },
    { name: "test     → Adding or updating tests", value: "test" },
    { name: "chore    → Build or tool changes", value: "chore" },
];

const questions = [
    {
        type: "list",
        name: "type",
        message: "Select the type of change:",
        choices: types,
    },
    {
        type: "input",
        name: "scope",
        message: "Scope (e.g. component or file name, optional):",
    },
    {
        type: "input",
        name: "subject",
        message: "Short description:",
        validate: input =>
            input.length === 0 ? "Description is required." : input.length > 90 ? "Keep under 90 characters." : true,
    },
    {
        type: "confirm",
        name: "breaking",
        message: "Are there any breaking changes?",
        default: false,
    },
    {
        type: "input",
        name: "issues",
        message: 'Issue references (e.g. "fix #123", optional):',
    },
];

const answers = await inquirer.prompt(questions);

let message = `${answers.type}`;
if (answers.scope) message += `(${answers.scope})`;
message += `: ${answers.subject}`;

if (answers.breaking) {
    message += `\n\nBREAKING CHANGE: Describe what changed and why.`;
}

if (answers.issues) {
    message += `\n\n${answers.issues}`;
}

if (options.copy) {
    clipboard.writeSync(message);
    console.log("\n✅ Commit message copied to clipboard:\n");
} else {
    console.log("\n✅ Generated commit message:\n");
}

console.log(message);
