import React from 'react';

export class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box mini text-important">
                {this.props.title}
            </div>
        );
    }
}
