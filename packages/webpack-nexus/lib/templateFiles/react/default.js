import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>Hello world!! </h1>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#rootApp'),
);
