import * as webpack from "webpack";
import * as path from "path";
import webpackConfig from "./configs/webpack.config";

export function build() {
  // const webpackConfig = require(path.resolve(__dirname, "./configs/webpack.config.js"));

  webpack(webpackConfig(), (err, stats) => {
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
