var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require("./config/helpers");

module.exports = {
    entry: {
        'polyfills': './src/app/polyfills.ts',
        'vendor': './src/app/vendor.ts',
        'app': './src/app/main.ts'
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
                        options: { configFileName: helpers.root('src', 'app', 'tsconfig.json')}
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
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', query: { sourceMaps: false } },
                    ]
                })
            },
            {
                test: /\.scss$/,
                exclude: [helpers.root('src', 'app')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', query: { sourceMaps: true } },
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
        helpers.root('./src/app'), // location of your src
        {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['app', 'vendor', 'polyfills']
        }),

        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })

        // new HtmlWebpackPlugin({
        //     //template: '!!pug-loader!src/layout.pug',
        //     template: require('html-webpack-template-pug'),
        //     filename: './views/layout.pug',
        //     mobile: true,
        //     title: 'GitWiki'
        // }),
    ]
};