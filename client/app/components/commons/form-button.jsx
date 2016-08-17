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

    static get propTypes() {
        return {
            size: React.PropTypes.oneOf(['small', 'normal', 'medium', 'large']).isRequired,
            type: React.PropTypes.oneOf(['submit', 'button', 'reset']),
            text: React.PropTypes.string,
            action: React.PropTypes.func
        };
    }

    onClick(event) {
        event.preventDefault();
        this.props.action();
    }

    render() {
        return (
            <p className={this.props.type === 'button' ? '' : 'control'}>
                <button
                    className={"button linear-grey" + this.sizeClass || ''}
                    type={this.props.type}
                    onClick={this.onClick}
                >{this.props.text}</button>
            </p>
        );
    }
}
