import * as webpack from "webpack";
import * as path from "path";
import { existsSync, writeFileSync, createWriteStream } from "fs";
import { tsc } from "../utils/tsc";
import { isObject, isString, isArray } from "util";
import { getToolsModulePath } from "../utils/getPath";
import { BuildertoolsConfig } from "buildertools-config";
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

  let webconfig = pars.webconfig;

  let buildertoolsConfig = path.resolve(CWD, "./buildertools.config.ts");
  if (!existsSync(buildertoolsConfig)) {
    throw new Error(`找不到配置文件${buildertoolsConfig}！`);
  }

  let tempConfigFile = await buildProjectConfig(buildertoolsConfig);
  let projConfig = require(tempConfigFile) as BuildertoolsConfig;
  rimraf.sync(tempConfigFile);

  let resultEntry: any = {};
  if (projConfig.entry) {
    if (!pars.isProduction) {
      let client = path.join(getToolsModulePath("webpack-dev-server"), `./client`) + `?http://localhost:${pars.port}`;
      if (isArray(projConfig.entry)) {
        resultEntry = [client].concat(projConfig.entry);
      } else if (isObject(projConfig.entry)) {
        let entryObj = projConfig.entry as Object;
        for (let key of Object.keys(entryObj)) {
          let entryValue = Reflect.get(entryObj, key);
          if (isString(entryValue)) {
            resultEntry[key] = [client, entryValue];
          } else if (isArray(entryValue)) {
            resultEntry[key] = [client].concat(entryValue);
          }
        }
      } else if (isString(projConfig.entry)) {
        resultEntry = [client, projConfig.entry];
      } else {
        throw Error(`未定义此entry类型！${projConfig.entry}`);
      }
    } else {
      resultEntry = projConfig.entry;
    }
  } else {
    resultEntry = webconfig.entry;
  }

  let projConfigOutput = projConfig.output || {};
  let projConfigModule = projConfig.module || {};
  let projConfigDevSer = projConfig.devServer || {};
  let result: webpack.Configuration = {
    ...webconfig,
    mode: pars.isProduction ? "production" : "development",
    entry: resultEntry,
    output: {
      ...webconfig.output,
      publicPath: projConfigOutput.publicPath || ""
    },
    externals: projConfig.externals || webconfig.externals || [],
    module: {
      ...webconfig.module,
      noParse: projConfigModule.noParse || webconfig.module.noParse || []
    },
    devServer: {
      ...webconfig.devServer,
      proxy: projConfigDevSer.proxy || {}
    }
  };
  console.log(result);

  return result;
}
