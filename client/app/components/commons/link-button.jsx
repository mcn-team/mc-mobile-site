import React from 'react';
import { Link } from 'react-router';

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            isDisabled: React.PropTypes.bool,
            label: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired
        }
    }

    render() {
        return (
            <button type="button" className={'link-button button linear-grey ' + (this.props.isDisabled ? ' is-disabled' : '')}>
                <Link to={this.props.path}>
                    <p>{this.props.label}</p>
                </Link>
            </button>
        );
    }
}
