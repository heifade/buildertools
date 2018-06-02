import * as program from "commander";
import chalk from "chalk";
import { build } from "../build";

let packageInfo = require("../../package.json");

program
  .command("build")
  .description("构建")
  .action(function(cmd) {
    build();
  });

program.on("command:*", function() {
  program.help();
});

program.parse(process.argv);
