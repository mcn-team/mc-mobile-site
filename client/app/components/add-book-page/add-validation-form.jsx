import React from 'react';
import { browserHistory } from 'react-router';
import { HttpClient } from 'aurelia-fetch-client';
import _ from 'lodash';
import { Typeahead } from 'react-typeahead';

import FormInputComponent from '../commons/form-input';
import { CheckboxInputComponent } from '../commons/checkbox-input';
import ComboBoxComponent from '../commons/combo-box-component';
import FormButtonComponent from '../commons/form-button';
import { sendBookAction, PICKED_DATA_RESET } from './add-validation-actions';
import { InlineButton } from '../commons/inline-button';
import { FormTypeahead } from '../commons/form-typeahead';
import { RadioButtonGroup, RadioButton } from '../commons/radio-button-group.component';

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
        this.renderAuthorMisspell = this.renderAuthorMisspell.bind(this);
        this.renderCollectionMisspell = this.renderCollectionMisspell.bind(this);
        this.onClickAuthorMisspell = this.onClickAuthorMisspell.bind(this);
        this.onClickCollectionMisspell = this.onClickCollectionMisspell.bind(this);
        this.evaluateMisspells = this.evaluateMisspells.bind(this);
        this.onAuthorOptionSelectedHandler = this.onAuthorOptionSelectedHandler.bind(this);
        this.onCollectionOptionSelectedHandler = this.onCollectionOptionSelectedHandler.bind(this);
        this.onReadChangeHandler = this.onReadChangeHandler.bind(this);
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
        httpClient.fetch(Config.baseUrl + '/api/books/collections/names', options)
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
                        this.setState({ existingCollections: parsedResponse });
                    });
                }
            });
    }

    sendBook() {
        const newBook = {};

        if (this.state.book && this.state.book.author) {
            newBook.authors = [this.state.book.author];
        }
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
            newBook.collectionName = this.state.book.collection;
        }

        if (this.form.lastElement) {
            newBook.lastElement = this.form.lastElement;
        }
        newBook.isbn = this.state.book.isbn;
        newBook.type = this.form.type || 'book';
        newBook.read = this.state.book.read || 'NOTREAD';

        this.props.dispatch(sendBookAction(newBook));
    }

    evaluateMisspells() {
        const book = this.state.book;
        const { existingAuthors, authorMisspell, existingCollections, collectionMisspell } = this.state;
        let misspell = null;
        const newState = {};

        if (authorMisspell === undefined && existingAuthors && existingAuthors.length > 0 && book && book.author) {
            _.forEach(existingAuthors, (element) => {
                const result = StringHelper.similarText(element, book.author, true);

                if (result > 65 && result < 100 && (!misspell || misspell.percent < result)) {
                    misspell = { label: element, percent: result };
                }
            });

            newState.authorMisspell = misspell;
            misspell = null;
        }

        if (collectionMisspell === undefined && existingCollections && existingCollections.length > 0 && book && book.collection) {
            _.forEach(existingCollections, (element) => {
                const result = StringHelper.similarText(element, book.collection, true);

                if (result > 65 && result < 100 && (!misspell || misspell.percent < result)) {
                    misspell = { label: element, percent: result };
                }
            });

            newState.collectionMisspell = misspell;
        }

        if (_.keys(newState).length > 0) {
            this.setState(newState);
        }
    }

    componentDidUpdate() {
        if (this.props.book.success) {
            this.resetComponent();
        }

        this.evaluateMisspells();
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

    onClickAuthorMisspell(event) {
        event.preventDefault();

        this.setState({
            book: Object.assign(this.props.book, { author: this.state.authorMisspell.label }),
            authorMisspell: null
        });
    }

    onClickCollectionMisspell(event) {
        event.preventDefault();

        this.setState({
            book: Object.assign(this.props.book, { collection: this.state.collectionMisspell.label }),
            collectionMisspell: null
        });
    }

    renderAuthorMisspell() {
        if (this.state && this.state.authorMisspell) {
            const { authorMisspell } = this.state;

            if (authorMisspell) {
                return (
                    <div className="bottom-spacer">
                        <span>Did you mean </span>
                        <InlineButton onClick={ this.onClickAuthorMisspell }>
                            { authorMisspell.label }
                        </InlineButton>
                        <span> ?</span>
                    </div>
                );
            }
        }
    }

    renderCollectionMisspell() {
        if (this.state && this.state.collectionMisspell) {
            const { collectionMisspell } = this.state;

            if (collectionMisspell) {
                return (
                    <div className="mini-spacer bottom-spacer">
                        <span>Did you mean </span>
                        <InlineButton onClick={ this.onClickCollectionMisspell }>
                            { collectionMisspell.label }
                        </InlineButton>
                        <span> ?</span>
                    </div>
                );
            }
        }
    }

    onAuthorOptionSelectedHandler(option, event) {
        this.setState({
            book: Object.assign(this.state.book, { author: option }),
            authorMisspell: null
        });
    }

    onCollectionOptionSelectedHandler(option, event) {
        this.setState({
            book: Object.assign(this.state.book, { collection: option }),
            collectionMisspell: null
        });
    }

    onReadChangeHandler(readStatus) {
        this.setState({ book: Object.assign(this.state.book, { read: readStatus }) });
    }

    render() {
        let collectionFields = null;
        const { existingAuthors, existingCollections } = this.state;

        if (this.state.book && this.state.book.volume) {
            collectionFields = (
                <div>
                    <FormTypeahead
                        label="Collection"
                        options={ existingCollections }
                        maxVisible={ 4 }
                        customClasses={ { input: 'input' } }
                        value={ this.state.book && this.state.book.collection }
                        onOptionSelected={ this.onCollectionOptionSelectedHandler }
                    />
                    { this.renderCollectionMisspell() }
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
                            <FormTypeahead
                                label="Author"
                                options={ existingAuthors }
                                maxVisible={ 4 }
                                customClasses={ { input: 'input' } }
                                value={ this.state.book && this.state.book.author }
                                onOptionSelected={ this.onAuthorOptionSelectedHandler }
                            />
                            { this.renderAuthorMisspell() }
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

                            <label className="label has-text-left">Read status</label>
                            <RadioButtonGroup onChange={ this.onReadChangeHandler } selected="notread" containerStyle="mini-spacer">
                                <RadioButton name="read" value="READ" containerStyle="padding-10 box valid">
                                    Read
                                </RadioButton>
                                <RadioButton name="ongoing" value="ONGOING" containerStyle="padding-10 box neutral">
                                    In progress
                                </RadioButton>
                                <RadioButton name="notread" value="NOTREAD" containerStyle="padding-10 box not-valid">
                                    Not read
                                </RadioButton>
                            </RadioButtonGroup>

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
