import React from 'react';
import { Link } from 'react-router';

export default class HomeButton extends React.Component {
    constructor(props) {
        super(props);
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
