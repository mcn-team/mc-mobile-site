import React from 'react';
import { connect as Connect } from 'react-redux';
import { browserHistory } from 'react-router';

import HeaderComponent from '../commons/header';
import { fetchCollectionAction, DISPLAY_COLLECTION } from './collections-list-actions';
import { CollectionItem } from './collection-item';
import { Authentication } from '../../utils/authentication-helper';
import Loader from '../commons/loader';

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

        console.log(this.props.collections);
        if (this.props.collections.fetching) {
            component = <Loader/>;
        } else if (this.props.collections.response.length > 0) {
            component = (
                <section>
                    <div className="has-text-centered spacer">
                        <button type="button" className="button linear-grey is-small" onClick={this.onClick}>
                            { this.props.collections.showCompleted ? "Show unfinished" : "Show all" }
                        </button>
                    </div>
                    <div className="spacer column is-10-mobile is-offset-1-mobile has-text-centered">
                        { this.props.collections.response.map((element, index) => {
                            return (
                                <CollectionItem
                                    hidden={!this.props.collections.showCompleted && !element.isMissing && element.isCompleted}
                                    completed={!element.isMissing && element.isCompleted}
                                    key={index}
                                    title={element._id}
                                />
                            );
                        }) }
                    </div>
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
