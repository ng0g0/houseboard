import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

import auth from './authenticator';
import LogInPage from './LogInPage';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
	<Route path="/login" component={LogInPage} />
    <Route path="/repos" component={Repos}  onEnter={requireAuth}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
);

function requireAuth(nextState, replace) {
  console.log(auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}