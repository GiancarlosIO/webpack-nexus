/* eslint-disable global-require */
const path = require('path');
const merge = require('webpack-merge');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const createBaseConfig = (config, extraConfig) => {
  const base = merge(
    {
      target: 'web',
      output: {
        path: path.resolve(extraConfig.rootAppDirectoryPath, 'dist'),
        publicPath: '/',
        // https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15#0e6c
        pathinfo: false,
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV),
        }),
      ],
      // the `entry` option is in the config object
      module: {
        rules: [
          // some apollo packages needs it
          // {
          //   test: /.mjs$/,
          //   include: /node_modules/,
          //   type: 'javascript/auto',
          // },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: path.join(__dirname, 'custom-babel-loader.js'),
              options: {
                cacheDirectory: false,
              },
            },
          },
        ],
      },
      // resolve: {
      //   extensions,
      //   modules,
      //   alias,
      // },
    },
    config,
  );

  if (extraConfig.isAnalyzerEnabled) {
    const analyzer = new BundleAnalyzerPlugin();

    base.plugins.push(analyzer);
  }

  return base;
};

module.exports = createBaseConfig;
