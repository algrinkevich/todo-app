const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    console.log("qwert: ", mode);
    return {
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
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        entry: "./src/index.tsx",
        mode: "development",
        devtool: mode === "development" ? "inline-source-map" : false,
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
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
};
