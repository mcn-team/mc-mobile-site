import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { fetchBookDataAction } from './add-book-actions';
import BookDataPick from './book-data-pick';
import { Authentication } from '../../utils/authentication-helper';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchBookDataAction(this.props.isbn));
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Add book" />
                { this.props.book.response && <BookDataPick bookData={this.props.book.response} isbn={this.props.isbn} dispatch={(action) => {
                    this.props.dispatch(action);
                }} /> }
            </section>
        );
    }
}

const mapStateToProps = ({ bookData }, { params }) => {
    return {
        book: bookData,
        isbn: params.isbn
    };
};

const AddBookPage = Connect(mapStateToProps)(AddBookPageComponent);
export default AddBookPage;
