import React from 'react';
import { render as Render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './app';

Render(
    <App />,
    document.getElementById('app')
);
