import React from 'react';

import ComboBoxComponent from '../commons/combo-box-component';
import LinkButton from '../commons/link-button';

export default class BookDataPick extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            bookData: React.PropTypes.object.isRequired
        };
    }

    render() {
        return (
            <section className="spacer has-control-centered columns">
                <ComboBoxComponent size="large" label="Title" content={this.props.bookData.title} />
                <ComboBoxComponent size="large" label="Collection" content={this.props.bookData.title} />
                <ComboBoxComponent size="small" label="Volume" content={this.props.bookData.volume} />
                <ComboBoxComponent size="small" label="Price" content={this.props.bookData.price} />
                <div className="columns is-marginless is-mobile has-text-centered">
                    <div className="column">
                        <LinkButton
                            label="NEXT"
                            path="/add/validation"
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
