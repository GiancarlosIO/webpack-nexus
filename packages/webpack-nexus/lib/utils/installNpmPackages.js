const { exec, execSync } = require('child_process');

const ora = require('ora');
const chalk = require('chalk');

/**
 * Install npm packages with yarn
 * fallback to npm if yarn is not installed in the current system
 *
 * @param {Object} config { packages, path }
 * @param {String} config.packages
 * @param {String} config.path
 * @param {Boolean} config.areDevDependencies
 * @returns {Promise}
 */
function installNpmPackages({ packages, path, areDevDependencies }) {
  const installingPackages = ora('Npm: Installing packages...').start();
  /**
   * pass Pipe to silent the child process output
   * actually pipe is the default value but for some reason setting it changes its behavior
   * */
  installingPackages('Npm: Installing packages...');
  try {
    exec(
      `npm install ${packages} ${areDevDependencies ? '--save-dev' : ''}`,
      {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: path,
      },
    );
    installingPackages.succeed('Successfull to install npm packages.');
  } catch (npmError) {
    console.log(chalk.red('Error to install packages with npm'), npmError);
    process.exit(1);
  }
}

module.exports = installNpmPackages;
