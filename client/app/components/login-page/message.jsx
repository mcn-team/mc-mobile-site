import React from 'react';
import { connect as Connect } from 'react-redux';

const TYPES = {
    error: ' help is-danger text-important',
    info: ' help is-info',
    ok: ' help is-success'
};

const SIZES = {
    larger: 'larger'
};

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.baseClass = 'has-text-centered ';
        if (this.props.size) {
            this.baseClass += SIZES[this.props.size];
        }

        this.buildClass.bind(this);
    }

    buildClass(props) {
        return this.baseClass + TYPES[props.login.type]
    }

    static get propTypes() {
        return {
            message: React.PropTypes.string,
            type: React.PropTypes.oneOf(['error', 'info', 'ok']),
            size: React.PropTypes.oneOf(['larger'])
        };
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps) {
            return;
        }

        this.messageClass = this.buildClass(nextProps);
        return true;
    }

    render() {
        return (
            <span className={this.messageClass}>{this.props.login.message}</span>
        );
    }
}

const mapStateToProps = ({ login }, ownProps) => {
    return {
        login: {
            type: login.status,
            message: login.message
        },
        size: ownProps.size
    }
};

const MessageComponent = Connect(mapStateToProps)(Message);
export default MessageComponent;
