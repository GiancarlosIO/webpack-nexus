const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

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
          // This Webpack plugin enforces the entire path of all required modules match the exact case
          // of the actual path on disk.
          new webpack.HotModuleReplacementPlugin(),
          // The webpack-cli add this plugin if the flag --progress is supplied
          // we need to use this manually because we are running webpack with the native node api
          new webpack.ProgressPlugin(),
          new CaseSensitivePathsPlugin(),
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
          new WebpackBuildNotifierPlugin(),
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
