import React from 'react';

export default class LastMedia extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            volume: React.PropTypes.number.isRequired,
            title: React.PropTypes.string.isRequired,
            publisher: React.PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <div className="media-element column is-8-mobile is-offset-2-mobile">
                <p className="has-text-centered"><strong>Last owned</strong></p>
                <p className="text-important">{ `Volume ${this.props.volume}` }</p>
                <p><small>{this.props.title}</small></p>
                <p className="has-text-right">{this.props.publisher}</p>
            </div>
        );
    }
}
