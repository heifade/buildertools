import * as path from "path";
import { getToolsModulePath } from "../utils/getPath";

export default function(modules: any) {
  return {
    presets: [
      getToolsModulePath("babel-preset-react"),
      [
        getToolsModulePath("babel-preset-env"),
        {
          modules,
          targets: {
            browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 9", "iOS >= 8", "Android >= 4"]
          }
        }
      ]
    ],
    cacheDirectory: path.resolve(process.cwd(), "build-temp/babel"),
    plugins: [
      getToolsModulePath("babel-plugin-transform-es3-member-expression-literals"),
      getToolsModulePath("babel-plugin-transform-es3-property-literals"),
      getToolsModulePath("babel-plugin-transform-object-assign"),
      getToolsModulePath("babel-plugin-transform-class-properties"),
      getToolsModulePath("babel-plugin-transform-object-rest-spread")
      // [
      //   getToolsModulePath("babel-plugin-transform-runtime"),
      //   {
      //     // helpers: false,
      //     polyfill: false,
      //     // regenerator: true,
      //     moduleName: "babel-runtime"
      //   }
      // ],
    ]
  };
}
