const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                type: 'asset/resource',
                generator: {
                    outputPath: "images/",
                    publicPath: "images/" 
                }
            }
        ],
    },
    entry: "./src/index.js",
    mode: "development",
    output: {
        clean: true,
    },
    devServer: {
        open: true,
    },
};
