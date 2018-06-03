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
  let config = webpackConfig();

  let host = ip.address();
  let port = pars.port;

  let serverConfig: Server.Configuration = {
    contentBase: config.output.path,
    compress: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    hot: true,
    stats: {
      colors: true,
      errorDetails: true
    }
  };

  let server = new Server(webpack(config), serverConfig);

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
