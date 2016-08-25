import React from 'react';

export default class BookDataPick extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            bookData: React.PropTypes.object.isRequired
        };
    }

    render() {
        return (
            <section>
                
            </section>
        );
    }
}
