"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const build_1 = require("../build");
const start_1 = require("../start");
let packageInfo = require("../../package.json");
program.version(`${packageInfo.version}`);
program
    .command("build")
    .description("构建")
    .action(function (cmd) {
    build_1.build();
});
program
    .command("start")
    .description("运行")
    .option("-p, --port <n>", "端口号", null, 3000)
    .action(function (options) {
    console.log(options);
    start_1.start({
        port: options.port
    });
});
program.on("command:*", function () {
    program.help();
});
program.parse(process.argv);
