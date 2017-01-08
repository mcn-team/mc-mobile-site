import React from 'react';
import { connect as Connect } from 'react-redux';

import { Authentication } from '../../utils/authentication-helper';
import { logoutAction } from '../login-page/login-actions';

class Header extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.subtitle) {
            this.subHeader = <h3 className="subtitle is-3">{this.props.subtitle}</h3>
        }

        this.onLogOut = this.onLogOut.bind(this);
        this.renderLogoutButton = this.renderLogoutButton.bind(this);
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            subtitle: React.PropTypes.string
        };
    }

    onLogOut() {
        Authentication.dropCredentials();
        this.props.dispatch(logoutAction());
    }

    renderLogoutButton() {
        return (
            <button onClick={ this.onLogOut } className="logout-button box is-hidden-tablet">
                <span>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </span>
            </button>
        );
    }

    render() {
        return (
            <section className="column is-12 has-text-centered spacer">
                { Authentication.isUserLoggedIn() && this.renderLogoutButton() }
                <h2 className="title is-2">{this.props.title}</h2>
                {this.subHeader}
            </section>
        );
    }
}

const mapStateToProps = ({ login }) => {
    return {
        login: login
    }
};

const HeaderComponent = Connect(mapStateToProps)(Header);
export default HeaderComponent;
