import React from 'react';

import ComboBoxComponent from '../commons/combo-box-component';
import LinkButton from '../commons/link-button';
import { updatePickedData } from './add-validation-actions';

import { SessionStorage } from '../../utils/browser-storages';

export default class BookDataPick extends React.Component {
    constructor(props) {
        super(props);
        this.pickedData = {
            title: this.props.bookData.title && this.props.bookData.title[0],
            collection: this.props.bookData.title && this.props.bookData.title[0],
            volume: this.props.bookData.volume && this.props.bookData.volume[0],
            price: this.props.bookData.price && this.props.bookData.price[0],
            author: this.props.bookData.author,
            pages: this.props.bookData.pages,
            publisher: this.props.bookData.publisher,
            cover: this.props.bookData.cover,
            isbn: this.props.isbn
        };
        if (this.props.bookData.volume === null) {
            delete this.pickedData.collection;
            delete this.pickedData.volume;
        }
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCollectionChange = this.onCollectionChange.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.renderCollectionFields = this.renderCollectionFields.bind(this);
    }

    componentDidMount() {
        this.dispatchPickedData();
    }

    static get propTypes() {
        return {
            bookData: React.PropTypes.object.isRequired
        };
    }

    onTitleChange(event) {
        this.pickedData.title = event.target.value.trim();
        this.dispatchPickedData()
    }

    onCollectionChange(event) {
        this.pickedData.collection = event.target.value.trim();
        this.dispatchPickedData()
    }

    onVolumeChange(event) {
        this.pickedData.volume = event.target.value;
        this.dispatchPickedData()
    }

    onPriceChange(event) {
        this.pickedData.price = event.target.value;
        this.dispatchPickedData()
    }

    dispatchPickedData() {
        if (this.pickedData.title === '-- No title --') {
            delete this.pickedData.title;
        }

        if (this.pickedData.price === '-- No price --') {
            delete this.pickedData.price;
        }

        SessionStorage.setItem('picked', this.pickedData);
        this.props.dispatch(updatePickedData(this.pickedData));
    }

    renderCollectionFields() {
        if (this.props.bookData.volume) {
            return (
                <div className="has-control-centered">
                    <ComboBoxComponent size="large" label="Collection" content={this.props.bookData.title} onChange={this.onCollectionChange} />
                    <ComboBoxComponent size="small" label="Volume" content={this.props.bookData.volume} onChange={this.onVolumeChange} />
                </div>
            );
        }
    }

    render() {
        const titleData = [
            ...this.props.bookData.title,
            '-- No title --'
        ]

        const priceData = [
            ...this.props.bookData.price,
            '-- No price --'
        ];

        return (
            <section className="spacer has-control-centered columns">
                <ComboBoxComponent size="large" label="Title" content={ titleData } onChange={this.onTitleChange}/>
                { this.renderCollectionFields() }
                { this.props.bookData.price && <ComboBoxComponent size="small" label="Price" content={ priceData } onChange={this.onPriceChange} /> }
                <div className="columns is-marginless is-mobile has-text-centered">
                    <div className="column">
                        <LinkButton
                            label="NEXT"
                            path="/validation"
                        />
                    </div>
                    <div className="column">
                        <LinkButton
                            label="CANCEL"
                            path="/home"
                        />
                    </div>
                </div>
            </section>
        );
    }
}
