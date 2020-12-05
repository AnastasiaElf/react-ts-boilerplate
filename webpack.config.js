const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiMocker = require("connect-api-mocker");
require("dotenv").config();

const INPUT_PATH = path.resolve(__dirname, "src/index.tsx");
const OUTPUT_PATH = path.resolve(__dirname, "build");
const API_PREFIX = "/api";
const { PORT = 3000, API_URL } = process.env;

function proxyServer(app, apiPrefix) {
    const prefix = API_URL ? "SERVER" : "MOCK";

    app.use(apiPrefix, (req, _res, next) => {
        console.info(`[${new Date().toLocaleTimeString()}] [${prefix}] ${req.method} - ${req.url}`);
        next();
    });
    if (API_URL) {
        app.use(
            apiPrefix,
            createProxyMiddleware({
                target: API_URL,
                changeOrigin: true,
            }),
        );
    } else {
        app.use(API_PREFIX, apiMocker("mocks/api"));
    }
}

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
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: {
                                    tailwindcss: {},
                                    autoprefixer: {},
                                },
                            },
                        },
                    },
                    "sass-loader",
                ],
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
                                plugins: {
                                    tailwindcss: {},
                                    autoprefixer: {},
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpe?g|svg|txt)$/,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: "asset/resource",
            },
        ],
    },
    optimization: {},
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
        open: true,
        before: (app) => proxyServer(app, API_PREFIX),
    },
};

module.exports = config;
