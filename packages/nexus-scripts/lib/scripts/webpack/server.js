const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const ip = require('ip');
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackDevConfig = require('./configurations/webpack.dev');

// utils
const clearConsole = require('../utils/clearConsole');

const runServer = extraConfiguration => {
  const webpackConfig = webpackDevConfig(
    {
      entry: extraConfiguration.fileAppRootPath,
    },
    extraConfiguration,
  );
  const hmrSocketPath = `${webpackConfig.output.publicPath}__webpack_hmr`;
  const hotClientScript = `webpack-hot-middleware/client?path=${hmrSocketPath}&timeout=20000&reload=true`;

  // add the webpack-dev-middleware client to connect to the socket
  webpackConfig.entry = [webpackConfig.entry, hotClientScript];
  // const HMR_PATH = `${webpackConfig.devServer.publicPath}__webpack_hmr`;
  // const hotMiddlewareScript = `webpack-hot-middleware/client`;

  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, {
    open: true,
    publicPath: webpackConfig.output.publicPath,
    port: extraConfiguration.PORT,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization, X-Request-With',
      'Access-Control-Allow-Credentials': 'true',
    },
    // Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
    stats: {
      all: false,
      assets: false,
      chunks: false,
      errors: true,
      hash: false,
      modules: false,
      performance: false,
      reasons: false,
      timings: true,
      warnings: false,
      builtAt: true,
      errorsDetails: true,
      publicPath: true,
    },
    // Supress forwading of webpack logs to the browser console:
    clientLogLevel: 'errors-only',
    logLevel: 'warn',
  });
  const hotMiddleware = webpackHotMiddleware(compiler, {
    path: hmrSocketPath,
  });

  const app = express();

  app.use(cors());
  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.listen(extraConfiguration.PORT, () => {
    clearConsole();
    console.log(`
${chalk.green('Server successfuly started')} 🎉

${chalk.blue('---------------------------------')}
    URL: ${chalk.blue.bold(`http://localhost:${extraConfiguration.PORT}`)}
    LAN: ${chalk.blue.bold(`http://${ip.address()}:${extraConfiguration.PORT}`)}
${chalk.blue('---------------------------------')}

${chalk.red(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);

    open(
      `http://localhost:${extraConfiguration.PORT}${
        webpackConfig.output.publicPath
      }`,
    );
  });
};

module.exports = runServer;
