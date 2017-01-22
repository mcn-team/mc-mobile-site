import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import AddValidationForm from './add-validation-form';
import { PICKED_DATA_RESET } from './add-validation-actions';

import { Authentication } from '../../utils/authentication-helper';
import { SessionStorage } from '../../utils/browser-storages';

class AddValidationPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { pickedData: SessionStorage.getItem('picked') };
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }

        if (!this.state.pickedData) {
            browserHistory.push('/home');
        }
    }

    componentDidUpdate() {
        if (this.props.book.data && this.props.book.data.success) {
            this.props.dispatch(PICKED_DATA_RESET);
            browserHistory.push('/home');
            SessionStorage.removeItem('picked');
            SessionStorage.removeItem('book');
        }
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Validate book"/>
                <AddValidationForm book={ this.state.pickedData } dispatch={(action) => {
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
