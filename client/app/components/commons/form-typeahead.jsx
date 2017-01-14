import React from 'react';
import { Typeahead } from 'react-typeahead';

export class FormTypeahead extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.value };
        this.classes = 'control';
    }

    componentWillReceiveProps(nextProps) {
        this.refs.typeahead.setState({ entryValue: nextProps.value || '' });
    }

    render() {
        if (this.props.size) {
            this.classes += ' column ' + this.props.size;
        }

        return (
            <section className={ this.classes }>
                <label className="label has-text-left">
                    <p className="label">{this.props.label}</p>
                    <Typeahead
                        { ...this.props }
                        ref="typeahead"
                    />
                </label>
            </section>
        );
    }
}
