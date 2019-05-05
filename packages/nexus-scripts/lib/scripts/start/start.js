const fs = require('fs');
const path = require('path');

const server = require('./webpack/server');

const start = ({ argv }) => {
  // set the development variables
  process.env.NODE_ENV = 'development';
  process.env.BABEL_ENV = 'development';

  // TODO: Validate if this directories exists!
  const rootAppDirectoryPath = fs.realpathSync(process.cwd());
  const srcAppDirectoryPath = path.resolve(rootAppDirectoryPath, 'src/');
  const fileAppRootPath = path.resolve(srcAppDirectoryPath, 'index.js');
  const htmlWebpackPluginTemplate = path.resolve(
    srcAppDirectoryPath,
    'index.html',
  );

  const PORT = argv.port || process.env.PORT || 3000;
  const isAnalyzerEnabled = argv.analyzer;

  const extraConfiguration = {
    rootAppDirectoryPath,
    srcAppDirectoryPath,
    fileAppRootPath,
    PORT,
    isAnalyzerEnabled,
    htmlWebpackPluginTemplate,
  };

  console.log('running start command', extraConfiguration);

  server(extraConfiguration);
};

module.exports = start;
