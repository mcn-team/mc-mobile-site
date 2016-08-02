import React from 'react';
import { connect as Connect } from 'react-redux';

import { loginAction } from './actions';
import FormInputComponent from '../commons/form-input';
import FormButtonComponent from '../commons/form-button';
import { LocalStorage } from '../../utils/browser-storages';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps && nextProps.login && nextProps.login.token) {
            LocalStorage.setItem('user', nextProps.login.user);
            LocalStorage.setItem('token', nextProps.login.token);
            //TODO: redirect to home page
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
