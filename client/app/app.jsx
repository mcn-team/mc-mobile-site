import React from 'react';
import { Provider } from 'react-redux';

import Store from './store';
import { McmsFooter } from './components/commons/footer-component';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <section>
                    {this.props.children}
                    <McmsFooter />
                </section>
            </Provider>
        );
    }
}
