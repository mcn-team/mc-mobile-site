import React from 'react';

import HeaderComponent from '../commons/header';
import LoginFormComponent from './login-form';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="spacer columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Mobile Site" />
                <LoginFormComponent />
            </section>
        );
    }
}
