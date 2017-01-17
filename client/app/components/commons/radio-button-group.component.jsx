import React from 'react';

export class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={ 'radio-button-group ' + this.props.containerStyle }>
                { this.props.children }
            </section>
        );
    }
}

export class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}