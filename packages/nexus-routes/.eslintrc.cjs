const path = require('path')
module.exports = {
  "extends": "eslint-config-webpack-nexus/lib/eslint-config-webpack-nexus.js",
  "parserOptions": {
    project: [path.resolve(__dirname, './tsconfig.eslint.json')]
  },
}