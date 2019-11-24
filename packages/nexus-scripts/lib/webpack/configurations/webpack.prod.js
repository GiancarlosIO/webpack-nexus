const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');

const webpackBase = require('./webpack.base');

const createProdConfig = (config = {}, extraConfig) =>
  merge(
    // webpackBase returns a webpack config
    webpackBase(
      {
        mode: 'production',
        output: {
          filename: `[name].[hash].min.js`,
          chunkFilename: `[name].[chunkhash].chunk.js`,
        },
        optimization: {
          /* https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15 */
          removeAvailableModules: true,
          removeEmptyChunks: true,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                warnings: false,
                compress: {
                  comparisons: false,
                },
                parse: {},
                mangle: true,
                output: {
                  comments: false,
                  ascii_only: true,
                },
              },
              parallel: true,
              cache: true,
              // TODO, generate the source map files after the compilation ends
              sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({
              cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
              },
            }),
          ],
          nodeEnv: 'production',
          // investigate why it is needed
          sideEffects: true,
          concatenateModules: true,
          runtimeChunk: true,
          splitChunks: {
            name: true,
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            // investigate why 'all' is the best option
            chunks: 'all',
            // investigate why 0 is better that 300000
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                  )[1];

                  return `npm.${packageName.replace('@', '')}`;
                },
              },
            },
          },
        },
        plugins: [
          // minify and optimize the html
          new HtmlWebpackPlugin({
            template: extraConfig.htmlWebpackPluginTemplate,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
            inject: true,
          }),
          // https://github.com/webpack/webpack/issues/7421
          new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
          }),
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
          }),
          // https://github.com/SassNinja/media-query-plugin#3-use-extracted-files
          new MediaQueryPlugin({
            include: true,
            queries: {
              'print, screen and (min-width: 640px)': 'sm',
              'print, screen and (min-width: 768px)': 'md',
              'print, screen and (min-width: 1024px)': 'lg',
              'print, screen and (min-width: 1280px)': 'xl',
            },
          }),
          // ignore the .map and favicon files?????
          // performance: {
          //   assetFilter: assetFilename =>
          //     !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
          // },
        ],
      },
      extraConfig,
    ),
    config,
  );

module.exports = createProdConfig;
