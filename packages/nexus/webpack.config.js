const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].min.js',
    chunkFilename: '[name].[contenthash].chunk.min.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /.tsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  infrastructureLogging: {
    level: 'warn',
  },
  stats: 'minimal',
  devServer: {
    historyApiFallback: true,
    client: {
      logging: 'warn',
    },
  },
};
