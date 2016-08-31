import React from 'react';
import classNames from 'classnames/bind';

export default class SwitchButton extends React.Component {
    constructor(props) {
        super(props);

        const sizes = {
            'is-small': this.props.size === 'small',
            'is-large': this.props.size === 'large'
        };

        this.buttonClasses = classNames('button linear-grey', sizes);
        this.onClick = this.onClick.bind(this);
    }

    static get propTypes() {
        return {
            switch: React.PropTypes.bool.isRequired,
            action: React.PropTypes.func.isRequired,
            onText: React.PropTypes.string.isRequired,
            offText: React.PropTypes.string.isRequired,
            size: React.PropTypes.oneOf(['small', 'large'])
        };
    }

    onClick(event) {
        this.props.action(event);
    }

    render() {
        return (
            <div className="has-text-centered spacer">
                <button type="button" className={this.buttonClasses} onClick={this.onClick}>
                    { this.props.switch ? this.props.onText : this.props.offText }
                </button>
            </div>
        );
    }
}
