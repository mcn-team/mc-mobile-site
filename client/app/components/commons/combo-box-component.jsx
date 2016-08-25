import React from 'react';

export default class ComboBoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.columnsClasses = {
            small: ' column is-one-third-mobile is-offset-one-third-mobile',
            medium: ' column is-half-mobile is-offset-one-quarter-mobile',
            large: ' column is-10-mobile is-offset-1-mobile'
        }
    }

    static get propTypes() {
        return {
            label: React.PropTypes.string.isRequired,
            content: React.PropTypes.array.isRequired,
            size: React.PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <div className={'control has-text-centered' + this.columnsClasses[this.props.size] }>
                <label className="label" >{this.props.label}</label>
                <select name={this.props.label.toLocaleLowerCase()} id={this.props.label.toLocaleLowerCase()}>
                    {this.props.content.map((element, index) => {
                        return (
                            <option value={element} key={index}>{element}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
}
