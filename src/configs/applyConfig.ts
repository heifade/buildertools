import * as webpack from "webpack";
import * as path from "path";
import { existsSync, writeFileSync, createWriteStream } from "fs";
import chalk from "chalk";
import { tsc } from "../utils/tsc";
import { isObject, isString } from "util";
const rimraf = require("rimraf");

async function buildProjectConfig(file: string) {
  let CWD = process.cwd();
  let tempConfigFile = path.resolve(CWD, `./temp_${new Date().getTime()}.js`);
  await tsc(file, tempConfigFile);
  return await tempConfigFile;
}

export interface Props {
  isProduction: boolean;
  webconfig: webpack.Configuration;
  port?: number;
}

export async function applyConfig(pars: Props) {
  let CWD = process.cwd();

  let buildertoolsConfig = path.resolve(CWD, "./buildertools.config.ts");
  if (!existsSync(buildertoolsConfig)) {
    let msg = `找不到配置文件${buildertoolsConfig}！`;
    console.log(chalk.bold.red(msg));
    throw new Error(msg);
  }

  let tempConfigFile = await buildProjectConfig(buildertoolsConfig);

  let projConfig = require(tempConfigFile);

  rimraf.sync(tempConfigFile);

  if (projConfig.entry) {
    if (!pars.isProduction) {
      let entry = projConfig.entry;
      if (isObject(entry)) {
        for (let key in entry) {
          let entryValue = entry[key];
          if (isString(entryValue)) {
            projConfig.entry[key] = [path.relative(CWD, `../node_modules/webpack-dev-server/client`) + `?http://localhost:${pars.port}`, entryValue];
          }
        }
      }
    }

    pars.webconfig.entry = projConfig.entry;
  }

  console.log(pars.webconfig.entry);

  return pars.webconfig;
}
