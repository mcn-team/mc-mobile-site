import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { fetchBookDataAction } from './add-book-actions';
import BookDataPick from './book-data-pick';
import Loader from '../commons/loader';

import { Authentication } from '../../utils/authentication-helper';
import { SessionStorage } from '../../utils/browser-storages';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.mainRendering = this.mainRendering.bind(this);
    }

    componentDidMount() {
        if (!this.state.book) {
            this.props.dispatch(fetchBookDataAction(this.props.isbn));
        }
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }

        this.setState({ book: SessionStorage.getItem('book') });
    }

    mainRendering() {
        let component = null;
        const book = this.state.book || this.props.book.response;

        if (this.props.book.fetching) {
            component = <Loader/>;
        } else if (this.state.book || (this.props.book.response && !this.props.book.fetching)) {
            if (!this.state.book) {
                SessionStorage.setItem('book', this.props.book.response);
            }

            component = <BookDataPick
                bookData={ book }
                isbn={ this.props.isbn }
                dispatch={(action) => {
                   this.props.dispatch(action);
                }} />;
        }

        return component;
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Add book" />
                { this.mainRendering() }
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
