module.exports.ERRORS = {
  mainJSFileNotExists: sourceDirectoryRootPath =>
    `Missing files: Hey!, the ${sourceDirectoryRootPath}/index.(js|ts|tsx) file does not exists`,
  mainHTMLFileNotExists: sourceDirectoryRootPath =>
    `Missing files: Hey!, the ${sourceDirectoryRootPath}/index.html file does not exists`,
};
