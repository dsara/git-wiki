var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require("./config/helpers");

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src', 'tsconfig.json')}
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: ['raw-loader', 'pug-html-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=public/assets/[name].[hash].[ext]'
            },
            {
                test: /\.sass$/,
                exclude: [helpers.root('src', 'app')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
                        { loader: 'sass-loader', query: { sourceMaps: true }}
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: [helpers.root('src', 'app')],
                use: [
                    { loader: 'raw-loader' },
                    { loader: 'sass-loader', query: { sourceMaps: true } }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['app', 'vendor', 'polyfills']
        })

        // new HtmlWebpackPlugin({
        //     template: 'src/layout.pug',
        //     filename: 'layout.pug',
        //     filetype: 'pug'
        // }),
        // new HtmlWebpackPugPlugin()
    ]
};