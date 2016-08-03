import React from 'react';
import { Link } from 'react-router';

export class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string
        };
    }

    render() {
        return (
            <div className="box mini text-important">
                <Link to={{ pathname: '/details', query: { collectionName: this.props.title }}}>
                    {this.props.title}
                </Link>
            </div>
        );
    }
}
