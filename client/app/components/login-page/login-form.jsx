import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginAction } from './login-actions';
import FormInputComponent from '../commons/form-input';
import FormButtonComponent from '../commons/form-button';
import { Authentication } from '../../utils/authentication-helper';
import { CheckboxInputComponent } from '../commons/checkbox-input';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentWillMount() {
        if (Authentication.isUserLoggedIn()) {
            browserHistory.push('/home');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps && nextProps.login && nextProps.login.token) {
            Authentication.saveCredentials(nextProps.login.user, nextProps.login.token);
            browserHistory.push('/home');
        }
    }

    onKeepLoggedInChecked(event) {
        Authentication.keepLoggedIn(event.target.checked)
    }

    onUsernameChange(value) {
        this.setState({ username: value });
    }

    onPasswordChange(value) {
        this.setState({ password: value });
    }

    onLogin() {
        const { username, password } = this.state;

        if (username) {
            this.props.dispatch(loginAction(username, password));
        }
    }

    render() {
        const { username, password } = this.state;

        return (
            <section className="spacer column is-half-mobile is-offset-one-quarter-mobile has-text-centered">
                <form className="has-control-centered">
                    <FormInputComponent
                        type="text"
                        label="Login"
                        forceLowerCase={ true }
                        content={ username }
                        onUpdate={ this.onUsernameChange }
                        />
                    <FormInputComponent
                        type="password"
                        label="Password"
                        content={ password }
                        onUpdate={ this.onPasswordChange }
                        />
                    <CheckboxInputComponent
                        containerStyle="control padding-10"
                        label="Remember me"
                        onChange={this.onKeepLoggedInChecked}
                        />
                    <FormButtonComponent
                        size="medium"
                        type="submit"
                        text="Sign in"
                        action={ this.onLogin }
                        />
                </form>
            </section>
        );
    }
}

const mapStateToProps = ({ login }) => {
    return {
        login: login
    }
};

const LoginFormComponent = Connect(mapStateToProps)(LoginForm);
export default LoginFormComponent;
