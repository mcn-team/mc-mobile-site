import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { fetchCollectionAction } from './actions';

class CollectionsListPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchCollectionAction());
    }

    render() {
        return (
            <section id="collections" className="spacer columns is-marginless">
                <HeaderComponent title="Media Collection" subtitle="Collections list" />
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
