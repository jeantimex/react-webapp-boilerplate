import ReactDOM from 'react-dom';
import React from 'react';

import Home from 'pages/home/Home';
import Todos from 'pages/todos/Todos';
import About from 'pages/about/About';

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from 'store';

import './index.html';
import './styles.scss';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/todos" component={Todos} />
        <Route exact path="/about" component={About} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
