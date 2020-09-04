import React from 'react';
import ReactDOM from 'react-dom';
import LoaderContainer from "./components/Loader/LoaderContainer"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <LoaderContainer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
