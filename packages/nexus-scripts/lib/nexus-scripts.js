const { argv } = require('yargs');
const chalk = require('chalk');
// const ora = require('ora');

const start = require('./scripts/start');

const commands = {
  start,
};

const commandToRun = commands[argv._[0]];

if (!commandToRun) {
  console.error(
    chalk.red(`
You need to specify a command to run.
  `),
  );
} else {
  commandToRun({ argv });
}
