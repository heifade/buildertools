import * as program from "commander";
import chalk from "chalk";
import { build } from "../build";
import { start } from "../start";

let packageInfo = require("../../package.json");
program.version(`${packageInfo.version}`);

program
  .command("build")
  .description("构建")
  .action(function(cmd) {
    build().then(result => {});
  });

program
  .command("start")
  .description("运行")
  .option("-p, --port <n>", "端口号", null, 8080)
  .action(function(options) {
    start({
      port: options.port
    }).then(result => {});
  });

program.on("command:*", function() {
  program.help();
});

program.parse(process.argv);
