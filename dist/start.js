"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server = require("webpack-dev-server");
const webpack = require("webpack");
const path = require("path");
const ip = require("ip");
const openBrowser = require("open");
const chalk_1 = require("chalk");
function start() {
    const webpackConfig = require(path.resolve(__dirname, "./configs/webpack.config.js"));
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
    server.listen(port, "0.0.0.0", function () {
        console.log(chalk_1.default.green(`Starting server on http://${host}:${port}`));
        openBrowser(`http://${host}:${port}`);
    });
}
exports.start = start;
