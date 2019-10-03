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
  const installingPackages = ora('Yarn: Installing packages...').start();

  try {
    /**
     * pass Pipe to silent the child process output
     * actually pipe is the default value but for some reason setting it changes its behavior
     * */
    execSync('yarn -v', { encoding: 'buffer', stdio: 'pipe' });
    try {
      execSync(`yarn add ${packages} ${areDevDependencies ? '-D' : ''}`, {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: path,
      });
      installingPackages.succeed('Successfull to install npm packages.');
    } catch (yarnError) {
      console.log(chalk.red('Error to install packages with Yarn'), yarnError);
      process.exit(1);
    }
  } catch (error) {
    console.log(
      chalk.yellow('> Yarn is not installed, using npm to install packages...'),
    );
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
}

module.exports = installNpmPackages;
