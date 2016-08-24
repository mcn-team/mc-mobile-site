import React from 'react';
import { render as Render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import LoginPage from './components/login-page/login-page';
import HomePage from './components/home-page/home-page';
import CollectionListPage from './components/collections-list-page/collections-list-page';
import DetailsPage from './components/details-page/details-page';
import ScanBookPage from './components/add-book-page/scan-book-page';

Render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginPage} />
            <Route path="home" component={HomePage} />
            <Route path="collections" component={CollectionListPage}/>
            <Route path="scan" component={ScanBookPage}/>
            <Route path="/details/:collectionName" component={DetailsPage} />
        </Route>
    </Router>,
    document.getElementById('app')
);
