import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { fetchBookDataAction } from './add-book-actions';
import BookDataPick from './book-data-pick';
import Loader from '../commons/loader';
import { Authentication } from '../../utils/authentication-helper';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.mainRendering = this.mainRendering.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchBookDataAction(this.props.isbn));
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
        }
    }

    mainRendering() {
        let component = null;

        if (this.props.book.response && !this.props.book.fetching) {
            component = <BookDataPick
                bookData={this.props.book.response}
                isbn={this.props.isbn}
                dispatch={(action) => {
                   this.props.dispatch(action);
                }} />;
        } else if (this.props.book.fetching) {
            component = <Loader/>;
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
