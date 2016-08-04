import React from 'react';

export default class MissingMedia extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            offset: React.PropTypes.bool.isRequired,
            volume: React.PropTypes.number.isRequired
        };
    }

    render() {
        return (
            <div className={'column is-4-mobile' + (this.props.offset ? ' is-offset-2-mobile' : '')}>
                <p className="media-element notification text-important">{ `Volume ${this.props.volume}` }</p>
            </div>

        );
    }
}
