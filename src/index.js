import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Home from './components/home/Home';
import DoTest from './components/doTest/DoTest';
import CreateTest from './components/createTest/CreateTest';
import TestDetails from './components/createTest/TestDetails';
import Register from './components/register/Register';
import Login from './components/login/Login';
import About from './components/about/About';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='test/:id' component={DoTest} />
      <Route path='createTest' component={CreateTest} />
      <Route path="tests/:testId" component={TestDetails}>
        <Route path="details" component={TestDetails} />
        <Route path="perform" component={TestDetails} />
      </Route>
      <Route path='register' component={Register} />
      <Route path='login' component={Login} />
      <Route path='about' component={About} />
      <Route path='logout' component={Home} />
    </Route>
  </Router>,
  document.getElementById('root')
);
