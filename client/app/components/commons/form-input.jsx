import React from 'react';

export default class FormInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.content || '' };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.classes = 'control';
    }

    static get propTypes() {
        return {
            type: React.PropTypes.oneOf(['text', 'password', 'number', 'date', 'email']),
            label: React.PropTypes.string,
            size: React.PropTypes.oneOf(['is-one-third-mobile', 'is-half-mobile', 'is-three-quarters-mobile', 'is-two-thirds-mobile', 'is-one-quarter-mobile', 'auto', 'is-12-mobile'])
        };
    }

    inputChangeHandler(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        if (this.props.size) {
            this.classes += ' column ' + this.props.size;
        }

        return (
            <section className={this.classes}>
                <label className="label has-text-left" htmlFor={this.props.label.toLocaleLowerCase()}>{this.props.label}</label>
                <p className="control">
                    <input
                        className="input"
                        id={this.props.label.toLocaleLowerCase().replace(' ', '_')}
                        type={this.props.type}
                        placeholder={this.props.label}
                        value={this.state.value}
                        onChange={this.inputChangeHandler}
                    />
                </p>
            </section>
        );
    }
}
