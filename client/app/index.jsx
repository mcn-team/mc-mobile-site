import React from 'react';
import { render as Render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './app';
import LoginPage from './components/login-page/login-page';

Render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginPage} />
        </Route>
    </Router>,
    document.getElementById('app')
);
