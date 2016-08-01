import React from 'react';

export default class FormInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    inputChangeHandler(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <section className="control">
                <label className="label has-text-left" htmlFor={this.props.label.toLocaleLowerCase()}>{this.props.label}</label>
                <p className="control">
                    <input
                        className="input"
                        id={this.props.label.toLocaleLowerCase()}
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