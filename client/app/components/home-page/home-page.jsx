import React from 'react';

import HeaderComponent from '../commons/header';
import HomeMenu from './home-menu';

import { Authentication } from '../../utils/authentication-helper';
import { SessionStorage } from '../../utils/browser-storages';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }

        SessionStorage.removeItem('book');
        SessionStorage.removeItem('picked');
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
