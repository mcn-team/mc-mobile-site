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

    render() {
        let form = {};
        return (
            <section className="spacer column is-half-mobile is-offset-one-quarter-mobile has-text-centered">
                <form className="has-control-centered">
                    <FormInputComponent type="text" label="Login"
                                        ref={(node) => {
                                            return form.username = node;
                                        }}
                    />
                    <FormInputComponent type="password" label="Password"
                                        ref={(node) => {
                                            return form.password = node;
                                        }}
                    />
                    <CheckboxInputComponent
                        containerStyle="control padding-10"
                        label="Remember me"
                        onChange={ this.onKeepLoggedInChecked }
                    />
                    <FormButtonComponent
                        size="medium"
                        type="submit"
                        text="Sign in"
                        action={() => {
                            if (form.username) {
                                this.props.dispatch(loginAction(form.username.state.value, form.password.state.value));
                            }
                        }}
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
