const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const webpackBaseConfig = require('./webpack.base');

const createDevConfig = (config, extraConfig) =>
  merge(
    // webpackBase returns a webpack config
    webpackBaseConfig(
      {
        mode: 'development',
        output: {
          filename: `[name].min.js`,
          chunkFilename: `[name].chunk.js`,
        },
        optimization: {
          /* https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15 */
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: {
            chunks: 'all',
          },
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new HtmlWebpackPlugin({
            inject: true,
            template: extraConfig.htmlWebpackPluginTemplate,
          }),
          new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/, // exclude node_modules
            failOnError: false,
          }),
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        ],
        devtool: 'eval-source-map',
        performance: {
          hints: false, // why we need it? 🤔
        },
        // devServer => the webpack-dev-server config is in the server file
      },
      extraConfig,
    ),
    config,
  );

module.exports = createDevConfig;
