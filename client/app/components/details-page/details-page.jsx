import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { fetchDetailsAction } from './details-actions';

class DetailsPageComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
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

    componentWillUpdate(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <section>
                <HeaderComponent title="Media Collection" subtitle={this.props.collectionName} />
            </section>
        );
    }
}

const mapStateToProps = ({ details }, { params }) => {
    return {
        details: details,
        collectionName: params.collectionName
    };
};

const DetailsPage = Connect(mapStateToProps)(DetailsPageComponent);
export default DetailsPage;
