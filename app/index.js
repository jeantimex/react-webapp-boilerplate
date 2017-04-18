import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from 'home/Home';
import About from 'about/About';

import 'index.html';

import './styles.scss';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  </Router>
), document.getElementById('root'));
