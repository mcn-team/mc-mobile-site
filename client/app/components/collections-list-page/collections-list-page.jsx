import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { fetchCollectionAction } from './actions';
import { CollectionItem } from './collection-item';
import { Authentication } from '../../utils/authentication-helper';

class CollectionsListPageComponent extends React.Component {
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
            this.props.dispatch(fetchCollectionAction());
        }
    }

    render() {
        return (
            <section id="collections" className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Collections list" />
                <div className="spacer column is-10-mobile is-offset-1-mobile has-text-centered">
                    { this.props.collections.response.map((element, index) => {
                        return (
                            <CollectionItem key={index} title={element}/>
                        );
                    }) }
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ collections }) => {
    return {
        collections: collections
    };
};

const CollectionsListPage = Connect(mapStateToProps)(CollectionsListPageComponent);
export default CollectionsListPage;
