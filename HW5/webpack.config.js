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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    outputPath: "fonts/"
                }
            }
        ],
    },
    entry: "./src/oop/app.js",
    mode: "development",
    output: {
        clean: true,
    },
    devServer: {
        open: true,
    },
};
