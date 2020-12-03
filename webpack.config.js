const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const INPUT_PATH = path.resolve(__dirname, "src/index.tsx");
const OUTPUT_PATH = path.resolve(__dirname, "build");
const API_PREFIX = "/api";
const { PORT = 3000 } = process.env;

const config = {
    entry: {
        index: [INPUT_PATH],
    },
    output: {
        path: OUTPUT_PATH,
        filename: "js/[name].[hash].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: [{ loader: "ts-loader" }], exclude: [/node_modules/, /tests/] },
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpe?g|svg|txt)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource'
            }
        ],
    },
    optimization: {
    },
    plugins: [
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ API_PREFIX }),
        new MiniCssExtractPlugin({ filename: "[name].[hash].bundle.css" }),
        new HtmlPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.svg",
        }),
    ],
    devServer: {
        port: PORT,
        host: "0.0.0.0",
        public: `localhost:${PORT}`,
        inline: true,
        disableHostCheck: true,
        contentBase: OUTPUT_PATH,
        historyApiFallback: true,
        open: true
    },
};

module.exports = config;