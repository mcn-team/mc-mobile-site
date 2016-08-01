import React from 'react';
import { render as Render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './app';

Render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute />
        </Route>
    </Router>,
    document.getElementById('app')
);
