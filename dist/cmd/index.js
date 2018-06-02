"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const build_1 = require("../build");
let packageInfo = require("../../package.json");
program
    .command("build")
    .description("构建")
    .action(function (cmd) {
    build_1.build();
});
program.on("command:*", function () {
    program.help();
});
program.parse(process.argv);
