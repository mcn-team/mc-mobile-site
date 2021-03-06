import React from 'react';
import { Link } from 'react-router';

export default class HomeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            disabled: React.PropTypes.bool,
            icon: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired,
            path: React.PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <div className={"tile is-vertical box" + (this.props.disabled ? ' is-disabled' : '')}>
                <Link to={this.props.path}>
                    <img src={this.props.icon} alt=""/>
                    <p>{this.props.label}</p>
                </Link>
            </div>
        );
    }
}
