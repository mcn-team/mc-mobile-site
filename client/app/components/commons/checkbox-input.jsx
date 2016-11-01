import React from 'react';

export class CheckboxInputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            label: React.PropTypes.string.isRequired,
            onChange: React.PropTypes.func.isRequired
        };
    }

    render() {
        return (
            <section className="control">
                <label className="label checkbox" htmlFor={this.props.label.toLocaleLowerCase()}>
                    <input
                        type="checkbox"
                        onChange={this.props.onChange}
                    />
                    <span>{this.props.label}</span>
                </label>
            </section>
        );
    }
}
