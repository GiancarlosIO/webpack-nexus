const webpack = require('webpack');
const chalk = require('chalk')

const webpackProd = require('../../webpack/configurations/webpack.prod');

const build = ({ argv, extraConfiguration }) => {
  process.env.NODE_ENV = 'production';
  process.env.BABEL_ENV = 'production';

  const webpackProdConfig = webpackProd(
    {
      entry: extraConfiguration.fileAppRootPath,
    },
    extraConfiguration,
  );

  webpack(webpackProdConfig, (error, stats) => {
    if (error || stats.hasErrors()) {
      return console.log(chalk.red('Error to compile on production mode 😢', error || stats.hasErrors()))
    }

    console.log(chalk.green(`
Build successful! 🎉
    `))
    console.log(stats.toString({ all: false, assets: true, colors: true }))
  })
}

module.exports = build;