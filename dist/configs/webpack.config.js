"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const babel_config_1 = require("../babel/babel.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getModulesPath_1 = require("../utils/getModulesPath");
function default_1() {
    let modules = false;
    let modulesPath = getModulesPath_1.getModulesPath();
    let babelConfig = babel_config_1.default(modules || false, modulesPath);
    let config = {
        mode: "development",
        entry: {
            index: path.resolve(process.cwd(), "./src/index")
        },
        output: {
            path: path.resolve(process.cwd(), "./dist"),
            filename: "[name].js"
        },
        devtool: "source-map",
        resolve: {
            modules: ["node_modules", path.join(process.cwd(), "../node_modules")],
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
            new CleanWebpackPlugin(["dist"]),
            // new UglifyjsWebpackPlugin({
            //   parallel: true,
            //   uglifyOptions: {
            //     ecma: 6
            //   }
            // }),
            new HtmlWebpackPlugin({
                template: path.relative(process.cwd(), "./public/index.html")
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
                filename: "[chunkhash:8].[name].css",
                chunkFilename: "[id].css"
            })
        ],
        devServer: {
            port: 9000,
            open: true,
            publicPath: "/"
        }
    };
    let projConfig = require(path.resolve(process.cwd(), "./buildertools.config.js"));
    return Object.assign({}, config, projConfig);
}
exports.default = default_1;
