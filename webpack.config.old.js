/* global process, __dirname */
/* eslint no-process-env: 0, id-match: 0 */
const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer'); // eslint-disable-line no-unused-vars
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

// I do not know how to build on windows
process.env.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
// process.env.NODE_ENV = process.env.NODE_ENV || PRODUCTION;

const NODE_ENV = process.env.NODE_ENV;

const IS_DEVELOPMENT = NODE_ENV === DEVELOPMENT;
const IS_PRODUCTION = NODE_ENV === PRODUCTION;

const CWD = __dirname;

const definePluginParams = {
    // NODE_ENV: JSON.stringify(NODE_ENV),
    IS_PRODUCTION: JSON.stringify(IS_PRODUCTION)
};

const webpackConfig = {

    context: path.join(CWD, 'www'),
    entry: {
        // common: './js/common.js',
        main: [
            'babel-polyfill',
            'whatwg-fetch',
            './www/js/index.js',
            './www/style/css/_root.scss'
        ]
    },
    output: Object.assign(
        {filename: '[name].js'},
        IS_PRODUCTION ?
            {path: path.join(CWD, './../public/assets'), publicPath: '/assets/'} :
            {path: path.join(CWD, 'dist'), publicPath: '/'}
    ),

    watch: IS_DEVELOPMENT,

    devtool: IS_DEVELOPMENT ? 'source-map' : false,

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['env', 'stage-1', 'stage-0', 'react', 'flow']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // {test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader?name=img/img-[name]-[hash:6].[ext]'},
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?[a-z0-9=&.]+)?$/,
                use: {
                    loader: 'base64-inline-loader',
                    // - limit - The limit can be specified with a query parameter. (Defaults to no limit).
                    // If the file is greater than the limit (in bytes) the file-loader is used and
                    // all query parameters are passed to it.
                    // - name - The name is a standard option.
                    query: IS_DEVELOPMENT ?
                        {
                            limit: 0,
                            name: 'img/img-[name]-[hash:6].[ext]'
                        } :
                        {
                            limit: 3e3, // 10k bytes
                            name: 'img/img-[name]-[hash:6].[ext]'
                        }
                }
            },

            // css module
            {
                test: /\.m\.scss$/,
                use: [
                    {loader: 'css-hot-loader'},
                    {loader: 'style-loader', options: {sourceMap: IS_DEVELOPMENT}},
                    {
                        loader: 'css-loader', options: {
                            sourceMap: IS_DEVELOPMENT,
                            modules: true,
                            localIdentName: '[local]----[path]--[name]--[hash:base64:5]',
                            minimize: IS_PRODUCTION
                        }
                    },
                    {loader: 'resolve-url-loader'},
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {loader: 'sass-loader', options: {sourceMap: IS_DEVELOPMENT}}
                ]
            },

            // global styles and libraries
            {
                test: /(_root\.scss|\.css)$/,
                use: [
                    {loader: 'css-hot-loader'},
                    {loader: 'style-loader', options: {sourceMap: IS_DEVELOPMENT}},
                    {
                        loader: 'css-loader', options: {
                            sourceMap: IS_DEVELOPMENT,
                            modules: IS_DEVELOPMENT,
                            localIdentName: '[local]',
                            minimize: IS_PRODUCTION
                        }
                    },
                    {loader: 'resolve-url-loader'},
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: IS_DEVELOPMENT,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {loader: 'sass-loader', options: {sourceMap: IS_DEVELOPMENT}}
                ]
            },
            {
                test: /\.raw$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        // alias: {
        //     root: path.resolve(CWD, 'www', 'js'),
        //     mc: path.resolve(CWD, 'www', 'js', 'component', 'main')
        // },
        modules: ['www', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(definePluginParams),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: IS_PRODUCTION,
                removeComments: IS_PRODUCTION,
                minifyCSS: IS_PRODUCTION,
                minifyJS: IS_PRODUCTION
            },
            hash: true,
            filename: IS_PRODUCTION ? './../../public/index.html' : './index.html'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: IS_PRODUCTION ? 'async' : 'defer'
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ]
};

if (IS_DEVELOPMENT) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: (jsModule, count) => {
                const {resource = ''} = jsModule;

                return /node_modules|lib|util|helper|module|\.scss/.test(resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node-modules',
            minChunks: (jsModule, count) => {
                const {resource = ''} = jsModule;

                return /node_modules|\.scss/.test(resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'style',
            minChunks: (jsModule, count) => {
                const {resource = ''} = jsModule;

                return /\.scss/.test(resource);
            }
        })
    );
}

if (IS_PRODUCTION) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true // eslint-disable-line camelcase
            }
        }),
        new CopyWebpackPlugin([
            {from: './www/favicon.ico', to: './../../public/favicon.ico'},
            {from: './www/robots.txt', to: './../../public/robots.txt'}
        ], {debug: true})
    );
}

// webpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = webpackConfig;
