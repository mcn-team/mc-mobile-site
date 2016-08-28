import React from 'react';

import FormInputComponent from '../commons/form-input';

export default class AddValidationForm extends React.Component {
    constructor(props) {
        super(props);

        this.sendBook = this.sendBook.bind(this);
    }

    sendBook(form) {
        const newBook = {};

        newBook.author = [form.author.state.value];
        newBook.cover = this.props.book.cover;
        newBook.title = form.title.state.value;
        newBook.collectionName = form.collection.state.value;
        newBook.publisher = form.publisher.state.value;
        newBook.pageCount = form.pages.state.value;
        newBook.price = form.price.state.value;
        newBook.volume = form.volume.state.value;
        newBook.isbn = this.props.book.isbn;
        newBook.type = 'book';
    }

    render() {
        const form = {};
        return (
            <section className="spacer">
                <form className="has-control-centered has-text-centered">
                    <div className="columns is-marginless">
                        <div className="column is-6-mobile is-offset-3-mobile">
                            <img src={this.props.book && this.props.book.cover} alt="cover"/>
                        </div>
                        <div className="column is-10-mobile is-offset-1-mobile">
                            <FormInputComponent
                                type="text"
                                label="Title"
                                content={this.props.book && this.props.book.title}
                                ref={(node) => {
                                    return form.title = node;
                                }}
                            />
                            <FormInputComponent
                                type="text"
                                label="Collection"
                                content={this.props.book && this.props.book.collection}
                                ref={(node) => {
                                    return form.collection = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Volume"
                                content={this.props.book && this.props.book.volume}
                                ref={(node) => {
                                    return form.volume = node;
                                }}
                            />
                            <FormInputComponent
                                type="text"
                                label="Author"
                                content={this.props.book && this.props.book.author}
                                ref={(node) => {
                                    return form.author = node;
                                }}
                            />
                            <FormInputComponent
                                type="text"
                                label="Publisher"
                                content={this.props.book && this.props.book.publisher}
                                ref={(node) => {
                                    return form.publisher = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Pages"
                                content={this.props.book && this.props.book.pages}
                                ref={(node) => {
                                    return form.pages = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Price"
                                content={this.props.book && this.props.book.price}
                                ref={(node) => {
                                    return form.price = node;
                                }}
                            />
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}
