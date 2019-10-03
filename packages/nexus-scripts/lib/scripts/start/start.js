const server = require('../../webpack/server');

const start = ({ extraConfiguration }) => {
  // set the development variables
  process.env.NODE_ENV = 'development';
  process.env.BABEL_ENV = 'development';
  server(extraConfiguration);
};

module.exports = start;
