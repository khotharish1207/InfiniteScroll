const webpack = require("webpack");
const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    devServer: {
      inline:true,
      port: 3000,
    },
    entry: [
        "./src"
    ],
    output: {
        path: `${__dirname}/public`,
        filename: "index.js"
    },
    resolve: {
        modulesDirectories: ["node_modules", "src"],
        extensions: [
            "",
            ".js"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015,presets[]=stage-2"],
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('developement')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
