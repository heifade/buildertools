import * as path from "path";
import * as fs from "fs";

export function getModulesPath() {
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
