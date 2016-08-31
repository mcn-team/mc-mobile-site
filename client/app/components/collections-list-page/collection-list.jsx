import React from 'react';

import { CollectionItem } from './collection-item';

export class CollectionList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static get propTypes() {
        return {
            list: React.PropTypes.array.isRequired,
            showCompleted: React.PropTypes.bool.isRequired
        };
    }

    render() {
        return (
            <div className="spacer column is-10-mobile is-offset-1-mobile has-text-centered">
                { this.props.list.map((element, index) => {
                    return (
                        <CollectionItem
                            hidden={!this.props.showCompleted && !element.isMissing && element.isCompleted}
                            completed={!element.isMissing && element.isCompleted}
                            key={index}
                            title={element._id}
                        />
                    );
                }) }
            </div>

        );
    }
}
