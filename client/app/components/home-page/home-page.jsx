import React from 'react';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import HomeMenu from './home-menu';
import { Authentication } from '../../utils/authentication-helper';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <section className="spacer columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Home Page" />
                <HomeMenu/>
            </section>
        );
    }
}
