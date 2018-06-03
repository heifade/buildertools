/**
 * 版本号加1
 * <pre>
 * 如果原版本号为10.2.2 处理后：10.2.3
 * 如果原版本号为10.2.2-beta5 处理后：10.2.2-beta6
 * </pre>
 */

import { readFileSync, existsSync, writeFileSync } from "fs";
import { promisify } from "util";
import chalk from "chalk";

function addVersion() {
  let packageFile = "./package.json";

  let json = JSON.parse(readFileSync(packageFile, { encoding: "utf8" }));

  let version = json.version as string;

  console.log(chalk.blue.bold("version changed:"));

  let versionNew;
  if (version.match(/beta/i)) {
    versionNew = version.replace(/(beta)([0-9]*)/i, (w, a, b, c) => {
      return `${a.toLocaleLowerCase()}${Number(b) + 1}`;
    });
  } else {
    versionNew = version.replace(/(.*?)([0-9]*)$/, (w, a, b) => {
      return `${a}${Number(b) + 1}`;
    });
  }
  json.version = versionNew;

  writeFileSync(packageFile, JSON.stringify(json, null, 2), {
    encoding: "utf8"
  });

  let packageLockFile = "./package-lock.json";
  if (existsSync(packageLockFile)) {
    let json = JSON.parse(readFileSync(packageLockFile, { encoding: "utf8" }));
    json.version = versionNew;
    writeFileSync(packageLockFile, JSON.stringify(json, null, 2), {
      encoding: "utf8"
    });
  }

  console.log(chalk.green(`    ${version} => ${versionNew}`));

  return versionNew;
}

addVersion();
