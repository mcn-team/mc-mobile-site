import React from 'react';
import _ from 'lodash';

import LastMedia from './last-media';
import MissingMedia from './missing-media';

export default class MissingList extends React.Component {
    constructor(props) {
        super(props);
        this.renderLastMedia.bind(this);
        this.renderMissingMedia.bind(this);
    }

    static get propTypes() {
        return {
            list: React.PropTypes.array
        };
    }

    renderLastMedia() {
        const list = _.filter(this.props.list, { bought: true }).sort((a, b) => {
            return a.volume - b.volume;
        });

        let media = null;

        if (list.length > 0) {
            media = list[list.length - 1];
        }

        if (media) {
            return (
                <LastMedia title={media.title} volume={media.volume} publisher={media.publisher}/>
            );
        } else {
            return (
                <div className="media-element column is-8-mobile is-offset-2-mobile">
                    <p className="has-text-centered"><strong>This collection has no book already bought</strong></p>
                    <p className="has-text-centered"><small>The first tome is in the list of books to buy</small></p>
                </div>
            );
        }
    }

    renderMissingMedia() {
        if (this.props.list && this.props.list.length > 0) {
            const list = _.filter(this.props.list, { bought: true }).sort((a, b) => {
                return a.volume - b.volume;
            });
            let lastVolume = this.props.list[this.props.list.length - 1].volume;
            let missing = [];
            let volume = 1;

            if (list.length > 0) {
                lastVolume = list[list.length - 1].volume;

                while (volume < lastVolume) {
                    const media = _.filter(this.props.list, { volume: volume });
                    if (media.length === 0 || media[0].bought === false) {
                        missing.push(volume);
                    }

                    volume++;
                }
            }

            return (
                <div className="columns mini-spacer is-multiline is-mobile">
                    { missing.map((element, index) => {
                        return (
                            <MissingMedia offset={index % 2 === 0} volume={element} key={`missing${element}`}/>
                        );
                    }) }
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <section id="missing-list" className="spacer columns">
                { this.renderLastMedia() }
                { this.renderMissingMedia() }
            </section>
        );
    }
}
