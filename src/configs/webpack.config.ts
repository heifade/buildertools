import * as webpack from "webpack";
import * as path from "path";
import getBabelConfig from "../babel/babel.config";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { getModulesPath } from "../utils/getModulesPath";
import { existsSync } from "fs";
import chalk from "chalk";

export default function(): webpack.Configuration {
  let modules = false;

  let modulesPath = getModulesPath();
  let babelConfig = getBabelConfig(modules || false, modulesPath);
  const CWD = process.cwd();

  let config: webpack.Configuration = {
    mode: "development",
    context: CWD,
    // entry: {
    //   index: [
    //     path.relative(__dirname, '../../webpack-dev-server/client'),
    //     path.resolve(CWD, "./src/index")
    //   ]
    // },
    output: {
      path: path.resolve(CWD, "./dist"),
      filename: "[name].[hash:8].js"
    },
    devtool: "source-map",
    resolve: {
      modules: ["node_modules", path.join(CWD, "../node_modules")],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    target: "web",
    node: ["child_process", "fs", "module", "net"].reduce((last, curr) => Object.assign({}, last, { [curr]: "empty" }), {}),
    // externals: {
    //   moment: "moment",
    //   react: "react",
    //   "react-dom": "react-dom",
    //   lodash: "lodash"
    // },
    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: path.resolve(modulesPath, "babel-loader"),
          options: babelConfig
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: path.resolve(modulesPath, "babel-loader"),
              options: babelConfig
            },
            // {
            //   options: {
            //     fromLoader: "ts-loader"
            //   }
            // },
            {
              loader: path.resolve(modulesPath, "ts-loader"),
              options: { transpileOnly: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: path.resolve(modulesPath, "css-loader"),
              options: {
                //modules: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            // {
            //   loader: path.resolve(modulesPath, "style-loader"),
            // },
            {
              loader: path.resolve(modulesPath, "css-loader"),
              options: {
                modules: true
              }
            },
            // {
            //   loader: path.resolve(
            //     projectRootPath,
            //     "./build-tools/loaders/lessToCss-loader.js"
            //   )
            // },
            {
              loader: path.resolve(modulesPath, "less-loader"),
              options: {}
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|svg|gif|jpe?g)$/,
          exclude: /node_modules/,
          loader: path.resolve(modulesPath, "url-loader"),
          options: {
            // name: "[chunkhash:8].[name].[ext]",
            name: "[name].[ext]",
            outputPath: "imgs/",
            limit: 120
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true
    },

    plugins: [
      new CleanWebpackPlugin(["./dist"]),
      // new UglifyjsWebpackPlugin({
      //   parallel: true,
      //   uglifyOptions: {
      //     ecma: 6
      //   }
      // }),
      new HtmlWebpackPlugin({
        template: path.relative(CWD, "./public/index.html")
      }),
      // new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      //   const stream = process.stdout;
      //   if (stream.isTTY && percentage < 0.71) {
      //     stream.write(
      //       `${chalk.magenta(msg)} (${chalk.magenta(addInfo || "")})\n`
      //     );
      //   } else if (percentage === 1) {
      //     console.log(chalk.green("\nwebpack: bundle build is now finished."));
      //   }
      // }),
      // new webpack.optimize.ModuleConcatenationPlugin(),

      // new webpack.DefinePlugin({
      //   "process.env.NODE_ENV": JSON.stringify("Hellow")
      // }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css"
        // chunkFilename: "[id].css"
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      port: 8080,
      open: true,
      publicPath: "/"
    }
  };

  return config;
}
