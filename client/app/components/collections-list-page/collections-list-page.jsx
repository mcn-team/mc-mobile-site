import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { fetchCollectionAction, DISPLAY_COLLECTION } from './collections-list-actions';
import { CollectionList } from './collection-list';
import { Authentication } from '../../utils/authentication-helper';
import Loader from '../commons/loader';
import SwitchButton from '../commons/switch-button';

class CollectionsListPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.mainRendering = this.mainRendering.bind(this);
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

    onClick(event) {
        event.preventDefault();
        this.props.dispatch(DISPLAY_COLLECTION);
    }

    mainRendering() {
        let component = null;

        if (this.props.collections.fetching) {
            component = <Loader/>;
        } else if (this.props.collections.response.length > 0) {
            component = (
                <section>
                    <SwitchButton
                        action={ this.onClick }
                        switch={ this.props.collections.showCompleted}
                        onText="Show unfinished"
                        offText="Show all"
                    />
                    <CollectionList
                        list={ this.props.collections.response }
                        showCompleted={ this.props.collections.showCompleted }
                    />
                </section>);
        }

        return component;
    }

    render() {
        return (
            <section id="collections" className="columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Collections list" />
                { this.mainRendering() }
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
