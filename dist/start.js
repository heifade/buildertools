"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server = require("webpack-dev-server");
const webpack = require("webpack");
const ip = require("ip");
const openBrowser = require("open");
const chalk_1 = require("chalk");
const webpack_config_1 = require("./configs/webpack.config");
function start(pars) {
    let server = new Server(webpack(webpack_config_1.default()), {
        disableHostCheck: true,
        hot: true,
        stats: {
            colors: true,
            errorDetails: true
        }
    });
    let host = ip.address();
    let port = pars.port;
    server.listen(port, "0.0.0.0", function () {
        console.log(chalk_1.default.green(`Starting server on http://${host}:${port}`));
        openBrowser(`http://${host}:${port}`);
    });
}
exports.start = start;
