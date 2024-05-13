/* eslint-disable */
const { ProvidePlugin } = require('webpack');

function webpackPlugin(context, options) {
    return {
        name: 'webpack-plugin',
        configureWebpack(config) {
            return {
                devServer: {
                    client: {
                        overlay: {
                            runtimeErrors: (error) => {
                                if(error?.message === "ResizeObserver loop completed with undelivered notifications.")
                                {
                                    console.error(error)
                                    return false;
                                }
                                return true;
                            },
                        }
                    }
                },
                experiments: {
                    "topLevelAwait": true,
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js/,
                            resolve: {
                                fullySpecified: false,
                            },
                        },
                    ],
                },
                plugins: [
                    new ProvidePlugin({
                        process: require.resolve('process/browser'),
                    })
                ],
                resolve: {
                    fallback: {
                        stream: require.resolve('stream-browserify'),
                        path: require.resolve('path-browserify'),
                        buffer: require.resolve('buffer/'),
                        url: require.resolve('url'),
                        "pino-pretty": require.resolve('pino-pretty'),
                        crypto: false,
                        net: false,
                        tls: false
                    },
                    alias: {
                        process: 'process/browser.js',
                    },
                },
            };
        },
    };
}

module.exports = webpackPlugin;
