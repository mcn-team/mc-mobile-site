import React from 'react';

export class InlineButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a onClick={ this.props.onClick }>
                <strong>
                    { this.props.children }
                </strong>
            </a>
        );
    }
}
