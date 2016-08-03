import React from 'react';
import { connect as Connect } from 'react-redux';

import HeaderComponent from '../commons/header';
import { Authentication } from '../../utils/authentication-helper';
import { fetchDetailsAction } from './details-actions';

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
            this.props.dispatch(fetchDetailsAction(this.props.location.query.collectionName));
        }
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <section>
                <HeaderComponent title="Media Collection" subtitle={this.props.location.query.collectionName} />
            </section>
        );
    }
}

const mapStateToProps = ({ details }) => {
    return {
        details: details
    };
};

const DetailsPage = Connect(mapStateToProps)(DetailsPageComponent);
export default DetailsPage;
