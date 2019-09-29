/* eslint-disable newline-after-var */
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const parseArgs = require('minimist');

const createFolderOnTheCurrentPath = require('./utils/createFolderOnTheCurrentPath');
const getPackageJsonTemplate = require('./templateFiles/getPackageJsonTemplate');
const getGitIgnoreContent = require('./templateFiles/getGitIgnoreTemplate');

// 1. accept the name of the project like second param
const argv = parseArgs(process.argv.slice(2), {
  alias: { 'package-manager': 'pm' },
});

const projectName = argv._[0];

// 2. Create the folder with the name of the project
createFolderOnTheCurrentPath(projectName)
  .then(({ folderPath }) => {
    /**
     * 3. Copy the main folders and files
     * - package.json: react, react-dom, nexus-scripts, styled-components
     * - .gitignore
     * - src/index.html and src/index.tsx
     */
    console.dir(folderPath);
    const packageJsonPath = path.join(folderPath, 'package.json');
    const packageJsonContent = getPackageJsonTemplate({
      projectName,
    });
    fs.writeFileSync(packageJsonPath, packageJsonContent);

    const gitignoreDestPath = path.join(folderPath, '.gitignore');
    const gitIgnoreContent = getGitIgnoreContent();
    fs.writeFileSync(gitignoreDestPath, gitIgnoreContent);

    console.log(
      chalk.green(`> Success to copy the package.json and .gitignore files`),
    );

    // install the packages inside the folder
    const coreNpmPackages = 'react react-dom styled-components nexus-scripts';
    const installingPackages = ora('Yarn: Installing packages...').start();
    try {
      /**
       * pass Pipe to silent the child process output
       * actually pipe is the default value but for some reasong setting it changes its behavior
       * */
      execSync('yarn -v', { encoding: 'buffer', stdio: 'pipe' });
      exec(
        `yarn add ${coreNpmPackages}`,
        { encoding: 'utf8', stdio: 'pipe', cwd: folderPath },
        yarnError => {
          if (yarnError) {
            console.log(yarnError);
            process.exit(1);
          }
          installingPackages.succeed('Successfull to install packages.');
        },
      );
    } catch (error) {
      console.log(
        chalk.yellow(
          '> Yarn is not installed, using npm to install packages...',
        ),
      );
      installingPackages('Npm: Installing packages...');
      exec(
        `npm install ${coreNpmPackages}`,
        {
          encoding: 'utf8',
          stdio: 'pipe',
          cwd: folderPath,
        },
        npmError => {
          if (npmError) {
            console.log(error);
            process.exit(1);
          }
          installingPackages.succeed('Successfull to install packages.');
        },
      );
    }
  })
  .catch(console.error);
