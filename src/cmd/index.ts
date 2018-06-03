import * as program from "commander";
import chalk from "chalk";
import { build } from "../build";
import { start } from "../start";

let packageInfo = require("../../package.json");

program
  .command("build")
  .description("构建")
  .action(function(cmd) {
    build();
  });

program
  .command("start")
  .description("运行")
  .option("-p, --port <n>", "端口号")
  .action(function(...options) {
    console.log(9, options);
    start();
  });

program.on("command:*", function() {
  program.help();
});

program.parse(process.argv);
