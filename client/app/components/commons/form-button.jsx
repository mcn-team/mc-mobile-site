import React from 'react';

export default class FormButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        const buttonSizes = {
            small: ' is-small',
            normal: '',
            medium: ' is-medium',
            large: ' is-large'
        };

        this.sizeClass = this.props.size && buttonSizes[this.props.size];
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.action();
    }

    render() {
        return (
            <p className="control">
                <button
                    className={"button linear-grey" + this.sizeClass || ''}
                    type={this.props.type}
                    onClick={this.onClick}
                >{this.props.text}</button>
            </p>
        );
    }
}
