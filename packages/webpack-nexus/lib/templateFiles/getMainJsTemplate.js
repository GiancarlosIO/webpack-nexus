/**
 * Get the main js content
 * @returns {string} template
 *
 */
function getMainJsTemplate() {
  return `
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>Hello world!! </h1>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#rootApp'));
`;
}

module.exports = getMainJsTemplate;
