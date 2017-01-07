import React from 'react';

export class CheckboxInputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            label: React.PropTypes.string.isRequired,
            onChange: React.PropTypes.func.isRequired,
            containerStyle: React.PropTypes.string
        };
    }

    render() {
        return (
            <section className={ this.props.containerStyle }>
                <label className="label checkbox">
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
