import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { fetchBookDataAction } from './add-book-actions';
import BookDataPick from './book-data-pick';

class AddBookPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchBookDataAction(this.props.isbn));
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <section className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Add book" />
                { this.props.book.response && <BookDataPick bookData={this.props.book.response} dispatch={(action) => {
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
