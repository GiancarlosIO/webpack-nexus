function getEslintTemplate() {
  return `module.exports = {
  extends: 'eslint-config-webpack-nexus',
}
`;
}

module.exports = getEslintTemplate;
