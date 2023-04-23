const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    outputPath: "images/",
                    publicPath: "images/",
                },
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    entry: "./src/index.ts",
    mode: "development",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        clean: true,
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
    },
};
