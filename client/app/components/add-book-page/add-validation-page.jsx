import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';

class AddValidationPageComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.book);
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Validate book"/>
            </section>
        );
    }
}

const mapStateToProps = ({ pickedData }) => {
    return {
        book: pickedData
    };
};

const AddValidationPage = Connect(mapStateToProps)(AddValidationPageComponent);
export default AddValidationPage;
