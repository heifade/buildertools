const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const rollupTypescript = require("rollup-plugin-typescript");

export async function tsc(sourceFile: string, targetFile: string) {
  let inOption = {
    input: sourceFile,
    plugins: [
      rollupTypescript(),
      commonjs(), // 此插件将CommonJS模块转换为 ES2015 供 Rollup 处理
      resolve({
        // 将自定义选项传递给解析插件
        customResolveOptions: {
          moduleDirectory: "node_modules"
        }
      })
    ],
    external: ["path"] // 指出应将哪些模块视为外部模块
  };
  let bundle = await rollup.rollup(inOption);

  let outOption = {
    file: targetFile,
    format: "cjs"
  };

  // let { code, map } = await bundle.generate(outOption);

  await bundle.write(outOption);
}
