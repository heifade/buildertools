import * as webpack from "webpack";
import * as path from "path";
import { existsSync, writeFileSync, createWriteStream } from "fs";
import chalk from "chalk";
import * as browserify from "browserify";
const tsify = require("tsify");

function buildProjectConfig(file: string) {
  return new Promise<string>((resolve, reject) => {
    let CWD = process.cwd();
    let tempConfigFile = path.resolve(CWD, `./temp_${new Date().getTime()}.js`);
    let configWriter = createWriteStream(tempConfigFile);

    browserify()
      .add(file)
      .plugin(tsify, { noImplicitAny: true, target: "es6" })
      .bundle()
      .pipe(configWriter)
      .on("finish", () => {
        resolve(tempConfigFile);
      });
  });
}

export async function applyConfig(webconfig: webpack.Configuration) {
  let CWD = process.cwd();

  let buildertoolsConfig = path.resolve(CWD, "./buildertools.config.ts");

  let tempConfigFile = await buildProjectConfig(buildertoolsConfig);

  let config = require(tempConfigFile);

  console.log(config);

  return '';

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
