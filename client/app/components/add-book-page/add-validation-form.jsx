import React from 'react';
import { browserHistory } from 'react-router';

import FormInputComponent from '../commons/form-input';
import { CheckboxInputComponent } from '../commons/checkbox-input';
import ComboBoxComponent from '../commons/combo-box-component';
import FormButtonComponent from '../commons/form-button';
import { sendBookAction, PICKED_DATA_RESET } from './add-validation-actions';

const bookTypes = [
    { label: 'Book', value: 'book' },
    { label: 'Comic', value: 'comics' },
    { label: 'Manga', value: 'manga' }
];

export default class AddValidationForm extends React.Component {
    constructor(props) {
        super(props);

        this.form = {};

        this.sendBook = this.sendBook.bind(this);
        this.resetComponent = this.resetComponent.bind(this);
        this.renderCover = this.renderCover.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
    }

    sendBook() {
        const newBook = {};

        newBook.authors = [this.form.author.state.value];
        if (this.props.book && this.props.book.cover) {
            newBook.cover = this.props.book.cover;
        }
        newBook.title = this.form.title.state.value;
        if (this.form.pages.state.value) {
            newBook.pageCount = this.form.pages.state.value;
        }
        if (this.form.price.state.value) {
            newBook.price = this.form.price.state.value;
        }
        if (this.form.publisher.state.value) {
            newBook.publisher = this.form.publisher.state.value;
        }
        if (this.props.book && this.props.book.volume) {
            newBook.volume = this.form.volume.state.value;
            newBook.collectionName = this.form.collection.state.value;
        }

        if (this.form.lastElement) {
            newBook.lastElement = this.form.lastElement;
        }
        newBook.isbn = this.props.book.isbn;
        newBook.type = this.form.type || 'book';

       this.props.dispatch(sendBookAction(newBook));
    }

    componentDidUpdate() {
        if (this.props.book.success) {
            this.resetComponent();
        }
    }

    renderCover() {
        if (this.props.book && this.props.book.cover)
            return (
                <div className="column is-6-mobile is-offset-3-mobile">
                    <img src={this.props.book.cover} alt="cover"/>
                </div>
            );
    }

    resetComponent() {
        this.props.dispatch(PICKED_DATA_RESET);
        browserHistory.push('/home');
    }

    onTypeChanged(event) {
        this.form.type = event.target.value
    }

    render() {
        let collectionFields = null;

        if (this.props.book && this.props.book.volume) {
            collectionFields = (
                <div>
                    <FormInputComponent
                        type="text"
                        label="Collection"
                        content={this.props.book && this.props.book.collection}
                        ref={(node) => {
                            return this.form.collection = node;
                        }}
                    />
                    <div className="columns is-mobile">
                        <FormInputComponent
                            type="number"
                            label="Volume"
                            size="is-one-third-mobile"
                            content={this.props.book && this.props.book.volume}
                            ref={(node) => {
                            return this.form.volume = node;
                        }}
                        />
                        <CheckboxInputComponent
                            containerStyle="control column auto checkbox-center"
                            label="Last Element"
                            onChange={ (event) => {
                                this.form.lastElement = event.target.checked;
                        } }
                        />
                    </div>
                </div>
            );
        }

        return (
            <section className="spacer">
                <form className="has-control-centered has-text-centered">
                    <div className="columns is-marginless">
                        { this.renderCover() }
                        <div className="column is-10-mobile is-offset-1-mobile">
                            <ComboBoxComponent
                                label="Type"
                                content={ bookTypes }
                                size="full"
                                style="input-style"
                                onChange={ this.onTypeChanged }
                            />
                            <FormInputComponent
                                type="text"
                                label="Title"
                                content={this.props.book && this.props.book.title}
                                ref={(node) => {
                                    return this.form.title = node;
                                }}
                            />
                            { collectionFields }
                            <FormInputComponent
                                type="text"
                                label="Author"
                                content={this.props.book && this.props.book.author}
                                ref={(node) => {
                                    return this.form.author = node;
                                }}
                            />
                            <FormInputComponent
                                type="text"
                                label="Publisher"
                                content={this.props.book && this.props.book.publisher}
                                ref={(node) => {
                                    return this.form.publisher = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Pages"
                                content={this.props.book && this.props.book.pages}
                                ref={(node) => {
                                    return this.form.pages = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Price"
                                content={this.props.book && this.props.book.price}
                                ref={(node) => {
                                    return this.form.price = node;
                                }}
                            />
                            <div className="columns is-marginless is-mobile has-text-centered">
                                <div className="column has-control-centered">
                                    <FormButtonComponent
                                        size="normal"
                                        text="SEND"
                                        type="submit"
                                        action={() => {
                                            this.sendBook();
                                        }}
                                    />
                                </div>
                                <div className="column has-control-centered">
                                    <FormButtonComponent
                                        size="normal"
                                        text="QUIT"
                                        type="reset"
                                        action={() => {
                                            this.resetComponent();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}
