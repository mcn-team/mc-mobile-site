import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { fetchDetailsAction, resetDetailsAction } from './details-actions';
import MissingList from './missing-list';
import Loader from '../commons/loader';

class DetailsPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getCollectionData.bind(this);
    }

    componentWillMount() {
        if (!Authentication.isUserLoggedIn()) {
            Authentication.dropCredentials();
            browserHistory.push('/');
        }
    }

    componentDidMount() {
        if (Authentication.isUserLoggedIn() && this.props.collections.response.length === 0) {
            this.props.dispatch(fetchDetailsAction(this.props.collectionName));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetDetailsAction);
    }

    getCollectionData() {
        const collection = _.find(this.props.collections.response, { _id: this.props.collectionName });

        return collection ? collection.data : this.props.details.response;
    }

    missingListRendering(collection) {
        if (this.props.details && this.props.details.fetching === true) {
            return <Loader/>;
        }
        collection.sort(function (a, b) {
            return a.volume - b.volume;
        });

        return <MissingList list={collection} />
    }

    render() {
        const collection = this.getCollectionData();

        return (
            <section>
                <HeaderComponent title="Media Collection" subtitle={this.props.collectionName} />
                { this.missingListRendering(collection) }
            </section>
        );
    }
}

/**
 * Params from ownProps to allow easy access to route parameters
 */
const mapStateToProps = ({ details, collections }, { params }) => {
    return {
        details: details,
        collections: collections,
        collectionName: params.collectionName
    };
};

const DetailsPage = Connect(mapStateToProps)(DetailsPageComponent);
export default DetailsPage;
