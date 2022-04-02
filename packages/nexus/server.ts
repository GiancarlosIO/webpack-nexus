import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { nexusRoutes } from 'nexus-routes';

const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(webpackConfig.devServer, compiler);
const runServer = async () => {
  console.log('Starting server...');
  await nexusRoutes(process.cwd(), 'src');
  await server.start();
};

runServer();
