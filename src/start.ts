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
  let config;
  try {
    config = await applyConfig({
      isProduction: false,
      webconfig: await webpackConfig(),
      port
    });
  } catch (e) {
    console.log(chalk.bold.red(e));
    return;
  }

  let serverConfig: Server.Configuration = {
    ...config.devServer,
    
    disableHostCheck: true, // 远程可通过ip访问
    https: false, // 是否启用https
    clientLogLevel: "info", // 客户端日志级别
    compress: true, // gzip 压缩
    watchOptions: {
      poll: 1000, // 监听文件变化频率单位毫秒
    },
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
