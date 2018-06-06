import * as webpack from "webpack";
import * as path from "path";
import webpackConfig from "./configs/webpack.config";
import { applyConfig } from "./configs/applyConfig";
import chalk from "chalk";

export async function build() {
  let config;
  try {
    config = await applyConfig({
      isProduction: true,
      webconfig: webpackConfig()
    });
  } catch (e) {
    console.log(chalk.bold.red(e));
    return;
  }

  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      // if (err.details) {
      //   console.error(err.details);
      // }
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    });
    console.log(buildInfo);
  });
}
