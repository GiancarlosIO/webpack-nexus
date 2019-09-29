const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function createFolder(folderName) {
  const newFolderPath = path.join(process.cwd(), folderName);

  return new Promise((resolve, reject) => {
    fs.mkdir(newFolderPath, error => {
      if (error) {
        if (error.code === 'EEXIST') {
          console.log(
            chalk.red(`>⚠️  Hey! The ${folderName} folder already exists!`),
          );
          reject(error);
          process.exit(1);
        } else {
          console.log(chalk.red('>⚠️ An error has occurred'));
          reject(error);
          process.exit(1);
        }
      } else {
        console.log(
          chalk.green(`> Success to create the ${folderName} folder`),
        );
        resolve({ folderPath: newFolderPath, folderName });
      }
    });
  });
}

module.exports = createFolder;
