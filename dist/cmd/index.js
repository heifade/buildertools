"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const build_1 = require("../build");
const start_1 = require("../start");
let packageInfo = require("../../package.json");
program
    .command("build")
    .description("构建")
    .action(function (cmd) {
    build_1.build();
});
program
    .command("start")
    .description("运行")
    .action(function (cmd) {
    start_1.start();
});
program.on("command:*", function () {
    program.help();
});
program.parse(process.argv);
