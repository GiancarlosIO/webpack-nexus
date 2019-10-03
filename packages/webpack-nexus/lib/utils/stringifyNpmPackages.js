function stringifyNpmPackages(npmPackagesObject) {
  return Object.keys(npmPackagesObject).reduce((packages, packageKey) => {
    return `${packages} ${packageKey}@${npmPackagesObject[packageKey]}`;
  }, '');
}

module.exports = stringifyNpmPackages;
