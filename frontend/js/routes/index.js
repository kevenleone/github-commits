import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Repository } from '../pages/Repository';

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Repository} exact path="/repository/:user/:repo" />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
