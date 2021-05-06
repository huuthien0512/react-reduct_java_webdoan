import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from '../serviceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './pages/Main';
import { Provider } from 'react-redux';
import { listUsers } from "../redux/actions/userActions";
import store from "../index";

const rootElement = document.getElementById('root');
store.dispatch(listUsers());
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./pages/Main', () => {
    const NextApp = require('./pages/Main').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();