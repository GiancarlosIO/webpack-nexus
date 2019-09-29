const fs = require('fs');
const chalk = require('chalk');

/**
 * Create a folder
 *
 * @param {Object} config
 * @param {String} config.pathToCreate
 * @param {String} config.folderName
 * @param {Function} config.callback
 */
function createFolder({ pathToCreate, folderName, callback }) {
  fs.mkdir(pathToCreate, error => {
    if (error) {
      if (error.code === 'EEXIST') {
        console.log(
          chalk.red(`>⚠️  Hey! The ${folderName} folder already exists!`),
        );
        process.exit(1);
      } else {
        console.log(
          chalk.red('>⚠️ Error to create the folder in the current path'),
        );
        process.exit(1);
      }
    } else {
      console.log(chalk.green(`> Success to create the ${folderName} folder`));
      callback({ pathToCreate, folderName, callback });
    }
  });
}

module.exports = createFolder;
