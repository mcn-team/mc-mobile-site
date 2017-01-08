import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import AddValidationForm from './add-validation-form';

class AddValidationPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }

        if (Object.keys(this.props.book).length === 0) {
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Validate book"/>
                <AddValidationForm book={this.props.book.data} dispatch={(action) => {
                    this.props.dispatch(action);
                }}/>
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
