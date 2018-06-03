import * as Server from "webpack-dev-server";
import * as webpack from "webpack";
import * as path from "path";
import * as ip from "ip";
const openBrowser = require("open");
import chalk from "chalk";

export function start() {
  const webpackConfig = require(path.resolve(
    __dirname,
    "./configs/webpack.config.js"
  ));


  let server = new Server(webpack(webpackConfig.default()), {
    disableHostCheck: true,
    hot: true,
    stats: {
      colors: true,
      errorDetails: true
    }
  });

  let host = ip.address();
  let port = 3000;

  server.listen(port, "0.0.0.0", function() {
    console.log(chalk.green(`Starting server on http://${host}:${port}`));
    openBrowser(`http://${host}:${port}`);
  });
}
