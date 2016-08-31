import React from 'react';
import { Link } from 'react-router';

export class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            hidden: React.PropTypes.bool
        };
    }

    render() {
        return (
            <div className={ "box box-paddingless text-important" + (this.props.hidden ? " hidden" : "") + (this.props.completed ? " passive" : "") }>
                <Link to={ `/details/${this.props.title}` }>
                    {this.props.title}
                </Link>
            </div>
        );
    }
}
/*
 <Link to={{ pathname: '/details', query: { collectionName: this.props.title }}}>
 {this.props.title}
 </Link>

 */
