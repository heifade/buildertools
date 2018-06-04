import * as webpack from "webpack";
import * as path from "path";
import { existsSync } from "fs";
import chalk from "chalk";
import * as browserify from "browserify";
const tsify = require("tsify");

function buildProjectConfig(file: string) {
  return new Promise((resolve, reject) => {
    const reader = browserify()
      .add(file)
      .plugin(tsify, { noImplicitAny: false, target: "es6" })
      .bundle();

    let fileContent = "";
    reader.on("data", data => {
      fileContent += data;
    });
    reader.on("end", () => {
      let start = fileContent.indexOf("\n");
      let end = fileContent.lastIndexOf("\n");
      resolve(fileContent.substring(start, end));
    });
    reader.on("error", e => {
      reject(e);
    });
  });
}

export async function applyConfig(webconfig: webpack.Configuration) {
  let CWD = process.cwd();

  let buildertoolsConfig = path.resolve(CWD, "./buildertools.config.ts");

  let result = await buildProjectConfig(buildertoolsConfig);

  console.log(result);

  return result;

  // if (!existsSync(buildertoolsConfig)) {
  //   let msg = `找不到配置文件${buildertoolsConfig}！`;
  //   console.log(chalk.bold.red(msg));
  //   throw new Error(msg);
  // }

  // let projConfig = require(buildertoolsConfig);

  // if (projConfig.entry) {
  //   webconfig.entry = projConfig.entry;
  // }

  // return webconfig;
}
