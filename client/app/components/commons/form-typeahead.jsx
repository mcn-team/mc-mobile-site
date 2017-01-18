import React from 'react';
import { Typeahead } from 'react-typeahead';

export class FormTypeahead extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.value };
        this.classes = 'control';

        this.updateStateHandler = this.updateStateHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.refs.typeahead.setState({ entryValue: nextProps.value || '' });
    }

    updateStateHandler() {
        this.props.onInputChange(this.refs.typeahead.state);
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
                        onBlur={ this.updateStateHandler }
                    />
                </label>
            </section>
        );
    }
}
