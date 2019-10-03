// validate if the has te requirements
const semver = require('semver');
const chalk = require('chalk');

const currentNodeVersion = process.versions.node;

// const packageDependencies = [
//   'webpack',
//   'webpack-cli',
//   'webpack-dev-middleware',
//   'webpack-hot-middleware',
//   'express',
//   'webpack-build-notifier',
// ];

if (!semver.satisfies(currentNodeVersion, '>=8.0.0')) {
  console.error(
    chalk.red(`
You are running Node ${currentNodeVersion} but webpack-nexus requires Node 8 or higher 😔. \n
Please upgrade your node version and try again 🙏.
    `),
  );
  process.exit(1);
}

require('./webpackNexus');
