const HtmlPlugin  = require("html-webpack-plugin");
const path = require("path");
const MiniCssPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output:{
        path: path.resolve(__dirname,"build"),
        filename: "[name].bundle.js"
    },
    optimization: {
        runtimeChunk: 'single',
      },
    resolve: {
        fallback: {
          fs: false,
          path:false,
          buffer: require.resolve("buffer/"),
          util: require.resolve("util/"),
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify")
        }
      },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use:[
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[{
                    loader: "html-loader"
                }]
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use:[{
                        loader: "file-loader"
                    }
                ]
            },
            {
                test:/\.css$/i,
                use:[MiniCssPlugin.loader,"css-loader","postcss-loader"]
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new MiniCssPlugin(),
        
        new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          })
    ],
    
    devServer:{
        historyApiFallback: true, //whatever the path, it redirects to index.html
    },
    
}