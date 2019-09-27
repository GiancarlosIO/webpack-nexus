const fs = require('fs');
const path = require('path');

const { argv } = require('yargs');
const chalk = require('chalk');

const start = require('./scripts/start');

const commands = {
  start,
};

const commandToRun = commands[argv._[0]];

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
const { clearConsole, openBrowser } = argv;

const extraConfiguration = {
  rootAppDirectoryPath,
  srcAppDirectoryPath,
  fileAppRootPath,
  PORT,
  htmlWebpackPluginTemplate,
  // extra helper vars
  isAnalyzerEnabled,
  clearConsole: clearConsole !== 'false',
  openBrowser: openBrowser !== 'false',
};

console.log('running start command', extraConfiguration);

if (!commandToRun) {
  console.error(
    chalk.red(`
You need to specify a command to run.
  `),
  );
} else {
  commandToRun({ argv, extraConfiguration });
}
