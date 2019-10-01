/* eslint-disable no-useless-escape */
function getPackageJsonTemplate({ projectName, author }) {
  return `
{
  "name": "${projectName}",
  "version": "0.0.1",
  "description": "",
  "keywords": [
    "webpack",
    "react",
    "styled-components",
    "react-dom"
  ],
  "author": "${author}",
  "license": "MIT",
  "scripts": {
    "start": "npx nexus-scripts start",
    "build": "npx nexus-scripts build"
  }
}

`;
}

module.exports = getPackageJsonTemplate;
