import * as Server from "webpack-dev-server";
import * as webpack from "webpack";
import * as path from "path";
import * as ip from "ip";
const openBrowser = require("open");
import chalk from "chalk";
import webpackConfig from "./configs/webpack.config";
import { applyConfig } from "./configs/applyConfig";

export interface StartPars {
  port: number;
}

export async function start(pars: StartPars) {
  let host = ip.address();
  let port = pars.port;

  let config = await applyConfig({
    isProduction: false,
    webconfig: webpackConfig(),
    port
  });

  let serverConfig: Server.Configuration = {
    ...config.devServer,
    ...{
      stats: {
        colors: true
      }
    }
  };

  let compiler = webpack(config);

  let server = new Server(compiler, serverConfig);

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
