import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// pitu.tk/ -> HomePage
// pitu.tk/:code -> RedirectPage
// pitu.tk/:code/stats -> StatsPage

import HomePage from '../pages/HomePage/index';
import RedirectPage from '../pages/RedirectPage/index';
import StatsPage from '../pages/StatsPage/index';
import NotFoundPage from '../pages/NotFoundPage/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:code" component={RedirectPage} />
        <Route exact path="/:code/stats" component={StatsPage} />
        <Route exact path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
