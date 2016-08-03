import React from 'react';

import HeaderComponent from '../commons/header';

export default class CollectionsListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="collections" className="spacer columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Collections list" />
            </section>
        );
    }
}
