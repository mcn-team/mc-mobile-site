import React from 'react';

export default class MissingList extends React.Component {
    constructor(props) {
        super(props);
        this.renderLastMedia.bind(this);
    }

    static get propTypes() {
        return {
            list: React.PropTypes.array
        };
    }

    renderLastMedia() {
        if (this.props.list && this.props.list.length > 0) {
            return (
                <p>{this.props.list[this.props.list.length - 1].title}</p>
            );
        } else {
            return null;
        }
    }

    render() {
        console.log(this.props.list);
        return (
            <section id="missing-list" className="spacer columns has-text-centered">
                <div className="media-element column is-10-mobile is-offset-1-mobile">
                    { this.renderLastMedia() }
                </div>
            </section>
        );
    }
}
