import { BuildertoolsConfig } from "buildertools-config";
import * as path from "path";

const CWD = process.cwd();

let config: BuildertoolsConfig = {
  mode: "development",
  entry: {
    index: [path.resolve(CWD, "./src/index")]
  },
  externals: ["jQuery"],
  output: {
    
  },
  module: {
    noParse: [/jQuery/]
  },
  devServer: {
    port: 8080
  }
};

export default config;
