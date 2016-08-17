import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Add book" />
            </section>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const AddBookPage = Connect(mapStateToProps)(AddBookPageComponent);
export default AddBookPage;
