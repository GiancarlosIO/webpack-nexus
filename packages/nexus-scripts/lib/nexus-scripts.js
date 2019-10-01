const fs = require('fs');
const path = require('path');

const { argv } = require('yargs');
const chalk = require('chalk');

// core scripts
const start = require('./scripts/start');
const build = require('./scripts/build');

const { ERRORS } = require('./strings');

const rootAppDirectoryPath = fs.realpathSync(process.cwd());
const srcAppDirectoryPath = path.resolve(rootAppDirectoryPath, 'src/');
const fileAppRootPathJS = path.resolve(srcAppDirectoryPath, 'index.js');
const fileAppRootPathTS = path.resolve(srcAppDirectoryPath, 'index.ts');
const fileAppRootPathTSX = path.resolve(srcAppDirectoryPath, 'index.tsx');
const htmlWebpackPluginTemplate = path.resolve(
  srcAppDirectoryPath,
  'index.html',
);

let fileAppRootPath = null;

if (fs.existsSync(fileAppRootPathJS)) {
  fileAppRootPath = fileAppRootPathJS;
} else if (fs.existsSync(fileAppRootPathTS)) {
  fileAppRootPath = fileAppRootPathTS;
} else if (fs.existsSync(fileAppRootPathTSX)) {
  fileAppRootPath = fileAppRootPathTSX;
}

if (!fileAppRootPath) {
  return console.log(
    chalk.red(ERRORS.mainJSFileNotExists(srcAppDirectoryPath)),
  );
}

if (!fs.existsSync(htmlWebpackPluginTemplate)) {
  return console.log(
    chalk.red(ERRORS.mainHTMLFileNotExists(srcAppDirectoryPath)),
  );
}

const PORT = argv.port || process.env.PORT || 3000;

const isAnalyzerEnabled = argv.analyzer;
const { clearConsole, openBrowser, reactProfiler } = argv;

const extraConfiguration = {
  rootAppDirectoryPath,
  srcAppDirectoryPath,
  fileAppRootPath,
  PORT,
  htmlWebpackPluginTemplate,
  // extra helper vars
  isAnalyzerEnabled,
  reactProfiler,
  clearConsole: clearConsole !== 'false',
  openBrowser: openBrowser !== 'false',
};

console.log('running start command', extraConfiguration);

const commands = {
  start,
  build,
};

const commandToRun = commands[argv._[0]];

// validate argvs
if (!argv._[0]) {
  console.error(
    chalk.red(`
You need to specify a command to run 😠
  `),
  );
} else if (!commandToRun) {
  console.error(
    chalk.red(`
This command doesn't exists in the webpack-nexus cli 😓
  `),
  );
} else {
  commandToRun({ argv, extraConfiguration });
}
