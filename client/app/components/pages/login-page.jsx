import React from 'react';

import HeaderComponent from '../commons/header';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="spacer columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Mobile Site" />
            </section>
        );
    }
}
