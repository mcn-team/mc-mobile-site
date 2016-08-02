import React from 'react';

import HeaderComponent from '../commons/header';
import HomeMenu from './home-menu';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
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
