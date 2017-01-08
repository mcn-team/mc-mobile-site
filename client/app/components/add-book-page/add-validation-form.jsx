import React from 'react';
import { browserHistory } from 'react-router';
import { HttpClient } from 'aurelia-fetch-client';
import _ from 'lodash';

import FormInputComponent from '../commons/form-input';
import { CheckboxInputComponent } from '../commons/checkbox-input';
import ComboBoxComponent from '../commons/combo-box-component';
import FormButtonComponent from '../commons/form-button';
import { sendBookAction, PICKED_DATA_RESET } from './add-validation-actions';
import { InlineButton } from '../commons/inline-button';

import { Authentication } from '../../utils/authentication-helper';
import { StringHelper } from '../../utils/strings-helper';
import { Config } from '../../config/config';

const bookTypes = [
    { label: 'Book', value: 'book' },
    { label: 'Comic', value: 'comics' },
    { label: 'Manga', value: 'manga' }
];

export default class AddValidationForm extends React.Component {
    constructor(props) {
        super(props);

        this.form = {};
        this.state = { book: props.book };

        this.sendBook = this.sendBook.bind(this);
        this.resetComponent = this.resetComponent.bind(this);
        this.renderCover = this.renderCover.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.renderMisspell = this.renderMisspell.bind(this);
        this.onClickMisspell = this.onClickMisspell.bind(this);
    }

    componentDidMount() {
        let httpClient = new HttpClient();

        const options = {
            method: 'GET',
            headers: { 'auth-web-token': Authentication.getUserToken() }
        };

        httpClient.fetch(Config.baseUrl + '/api/books/authors', options)
            .then((response) => {
                if (response.ok) {
                    return { data: response.json() };
                } else {
                    return { error: { code: response.status, err: response.statusText }, data: response.json() };
                }
            })
            .then((response) => {
                if (!response.error) {
                    response.data.then((parsedResponse) => {
                        this.setState({ existingAuthors: parsedResponse });
                    });
                }
            });
    }

    sendBook() {
        const newBook = {};

        newBook.authors = [this.form.author.state.value];
        if (this.state.book && this.state.book.cover) {
            newBook.cover = this.state.book.cover;
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
        if (this.state.book && this.state.book.volume) {
            newBook.volume = this.form.volume.state.value;
            newBook.collectionName = this.form.collection.state.value;
        }

        if (this.form.lastElement) {
            newBook.lastElement = this.form.lastElement;
        }
        newBook.isbn = this.state.book.isbn;
        newBook.type = this.form.type || 'book';

        this.props.dispatch(sendBookAction(newBook));
    }

    componentDidUpdate() {
        const book = this.state.book;
        const { existingAuthors, probableMisspell } = this.state;

        if (this.props.book.success) {
            this.resetComponent();
        }

        let misspell = null;

        if (probableMisspell === undefined && existingAuthors && existingAuthors.length > 0 && book && book.author) {
            _.forEach(existingAuthors, (element) => {
                const result = StringHelper.similarText(element, book.author, true);

                if (result > 65 && result < 100 && (!misspell || misspell.percent < result)) {
                    misspell = { label: element, percent: result };
                }
            });

            this.setState({ probableMisspell: misspell });
        }
    }

    renderCover() {
        if (this.state.book && this.state.book.cover)
            return (
                <div className="column is-6-mobile is-offset-3-mobile">
                    <img src={this.state.book.cover} alt="cover"/>
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

    onClickMisspell(event) {
        event.preventDefault();
        this.setState({
            book: Object.assign(this.props.book, { author: this.state.probableMisspell.label }),
            probableMisspell: null
        });
    }

    renderMisspell() {
        if (this.state && this.state.probableMisspell) {
            const { probableMisspell } = this.state;

            if (probableMisspell) {
                return (
                    <div className="bottom-spacer">
                        <span>Did you mean </span>
                        <InlineButton onClick={ this.onClickMisspell }>
                            { probableMisspell.label }
                        </InlineButton>
                        <span> ?</span>
                    </div>
                );
            }
        }
    }

    render() {
        let collectionFields = null;

        if (this.state.book && this.state.book.volume) {
            collectionFields = (
                <div>
                    <FormInputComponent
                        type="text"
                        label="Collection"
                        content={this.state.book && this.state.book.collection}
                        ref={(node) => {
                            return this.form.collection = node;
                        }}
                    />
                    <div className="columns is-mobile">
                        <FormInputComponent
                            type="number"
                            label="Volume"
                            size="is-one-third-mobile"
                            content={this.state.book && this.state.book.volume}
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
                                content={this.state.book && this.state.book.title}
                                ref={(node) => {
                                    return this.form.title = node;
                                }}
                            />
                            { collectionFields }
                            <FormInputComponent
                                type="text"
                                label="Author"
                                content={this.state.book && this.state.book.author}
                                ref={(node) => {
                                    return this.form.author = node;
                                }}
                            />
                            { this.renderMisspell() }
                            <FormInputComponent
                                type="text"
                                label="Publisher"
                                content={this.state.book && this.state.book.publisher}
                                ref={(node) => {
                                    return this.form.publisher = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Pages"
                                content={this.state.book && this.state.book.pages}
                                ref={(node) => {
                                    return this.form.pages = node;
                                }}
                            />
                            <FormInputComponent
                                type="number"
                                label="Price"
                                content={this.state.book && this.state.book.price}
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
