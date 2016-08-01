import React from 'react';
import { Provider } from 'react-redux';

const mock_store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {}
};

export default class App extends React.Component {
    render() {
        return (
            <Provider store={mock_store}>
                <section>
                    <h2 className="title">Here goes MC Mobile Site</h2>
                    {this.props.children}
                </section>
            </Provider>
        );
    }
}
