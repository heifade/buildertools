import * as Server from "webpack-dev-server";
import * as webpack from "webpack";
import * as path from "path";
import * as ip from "ip";
const openBrowser = require("open");
import chalk from "chalk";
import webpackConfig from "./configs/webpack.config";

export interface StartPars {
  port: number;
}

export function start(pars: StartPars) {
  let server = new Server(webpack(webpackConfig()), {
    disableHostCheck: true,
    hot: true,
    stats: {
      colors: true,
      errorDetails: true
    }
  });

  let host = ip.address();
  let port = pars.port;

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
