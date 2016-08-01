import React from 'react';
import { connect as Connect } from 'react-redux';

import { LOGIN_FAIL, LOGIN_SUCCESS } from './actions';
import FormInputComponent from '../commons/form-input';
import FormButtonComponent from '../commons/form-button';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
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
                            let action = LOGIN_FAIL;
                            if (form.username.state.value === 'Kaze' && form.password.state.value === 'yolo') {
                                action = LOGIN_SUCCESS;
                            }
                            this.props.dispatch(action);
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
