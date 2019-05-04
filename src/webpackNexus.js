const { argv } = require('yargs');
const chalk = require('chalk');
const slugify = require('slugify');

let projectName = argv._[0];

if (!projectName) {
  console.error(
    chalk.red(`
Hey! You forgot to pass the project name! 👺.
Ex:
  webpack-nexus mySuperCoolProject
  `),
  );
} else {
  projectName = slugify(projectName);
}

// commands
// const init = require('./commands/init');

console.log({ argv, projectName });
