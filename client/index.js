import ReactDOM from 'react-dom';
import React from 'react';

import Home from 'pages/home/Home';
import Todos from 'pages/todos/Todos';
import About from 'pages/about/About';

// Redux and React Router
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from 'store';

// React Intl
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import messages from './../locales/zh-CN.json';

import './index.html';
import './styles.scss';

const history = createHistory();

addLocaleData([...en, ...zh]);

ReactDOM.render(
  <IntlProvider locale={'en'} messages={messages}>
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/about" component={About} />
        </div>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);
