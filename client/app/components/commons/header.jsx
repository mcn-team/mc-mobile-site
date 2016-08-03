import React from 'react';

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.subtitle) {
            this.subHeader = <h3 className="subtitle is-3">{this.props.subtitle}</h3>
        }
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            subtitle: React.PropTypes.string
        };
    }

    render() {
        return (
            <section className="column is-12 has-text-centered spacer">
                <h2 className="title is-2">{this.props.title}</h2>
                {this.subHeader}
            </section>
        );
    }
}
