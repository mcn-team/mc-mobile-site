import React from 'react';
import { Provider } from 'react-redux';

import Store from './store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <section>
                    {this.props.children}
                </section>
            </Provider>
        );
    }
}
