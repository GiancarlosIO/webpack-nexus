const { execSync } = require('child_process');

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
  return new Promise((resolve, reject) => {
    const installingPackages = ora('npm: Installing packages...').start();
    /**
     * pass Pipe to silent the child process output
     * actually pipe is the default value but for some reason setting it changes its behavior
     * */

    try {
      execSync(
        `npm install ${packages} ${areDevDependencies ? '--save-dev' : ''}`,
        {
          encoding: 'utf8',
          stdio: 'pipe',
          cwd: path,
        },
        // (error, stdout, stderr) => {
        //   if (error) {
        //     ora.fail();
        //     console.error(chalk.red(`\nexec error ${error}`));
        //     reject(error);
        //     return;
        //   }

        //   // this are just logs stuff
        //   console.info(`\n${stderr}\n`);
        // },
      );
      installingPackages.succeed('Successfull to install npm packages.');
      resolve(true);
    } catch (npmError) {
      ora.fail();
      console.log(chalk.red('Error to install packages with npm'), npmError);
      resolve(npmError);
    }
  });
}

module.exports = installNpmPackages;
