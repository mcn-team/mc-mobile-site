import React from 'react';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="spacer-large has-text-centered">
                <img src="../dist/img/loading.gif" alt="loading..."/>
            </section>
        );
    }
}
