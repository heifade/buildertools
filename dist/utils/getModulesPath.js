"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
function getModulesPath() {
    let modulesPath = path.resolve(__dirname, "../../node_modules");
    let lastPath = "  ";
    while (modulesPath != lastPath) {
        if (fs.existsSync(path.resolve(modulesPath, "./babel-loader"))) {
            return modulesPath;
        }
        lastPath = modulesPath;
        modulesPath = path.resolve(modulesPath, "../");
    }
}
exports.getModulesPath = getModulesPath;
