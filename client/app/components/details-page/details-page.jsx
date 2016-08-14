import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { fetchDetailsAction } from './details-actions';
import MissingList from './missing-list';

class DetailsPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
            browserHistory.push('/');
        }
    }

    componentDidMount() {
        if (Authentication.isUserLoggedIn()) {
            this.props.dispatch(fetchDetailsAction(this.props.collectionName));
        }
    }

    render() {
        return (
            <section>
                <HeaderComponent title="Media Collection" subtitle={this.props.collectionName} />
                <MissingList list={this.props.details.response} />
            </section>
        );
    }
}

/**
 * Params from ownProps to allow easy access to route parameters
 */
const mapStateToProps = ({ details }, { params }) => {
    return {
        details: details,
        collectionName: params.collectionName
    };
};

const DetailsPage = Connect(mapStateToProps)(DetailsPageComponent);
export default DetailsPage;
