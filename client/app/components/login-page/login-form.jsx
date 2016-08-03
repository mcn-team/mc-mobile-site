import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { loginAction } from './login-actions';
import FormInputComponent from '../commons/form-input';
import FormButtonComponent from '../commons/form-button';
import { Authentication } from '../../utils/authentication-helper';

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
                    <FormButtonComponent
                        size="medium"
                        type="submit"
                        text="Sign in"
                        action={() => {
                            this.props.dispatch(loginAction(form.username.state.value, form.password.state.value));
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
