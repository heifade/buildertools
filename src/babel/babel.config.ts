import * as path from "path";

export default function(modules: any, modulesPath: string) {
  return {
    presets: [
      path.resolve(modulesPath, "babel-preset-react"),
      [
        path.resolve(modulesPath, "babel-preset-env"),
        {
          modules,
          targets: {
            browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 9", "iOS >= 8", "Android >= 4"]
          }
        }
      ]
    ],
    // cacheDirectory: path.resolve(__dirname, "build-temp", "babel"),
    plugins: [
      path.resolve(modulesPath, "babel-plugin-transform-es3-member-expression-literals"),
      path.resolve(modulesPath, "babel-plugin-transform-es3-property-literals"),
      path.resolve(modulesPath, "babel-plugin-transform-object-assign"),
      path.resolve(modulesPath, "babel-plugin-transform-class-properties"),
      path.resolve(modulesPath, "babel-plugin-transform-object-rest-spread")
      // [
      //   require.resolve("babel-plugin-transform-runtime"),
      //   {
      //     polyfill: false
      //   }
      // ]
    ]
  };
}
