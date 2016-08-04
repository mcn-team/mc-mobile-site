import React from 'react';

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
        const media = this.props.list[this.props.list.length - 1];

        if (this.props.list && this.props.list.length > 0) {
            return (
                <LastMedia title={media.title} volume={media.volume} publisher={media.publisher}/>
            );
        } else {
            return null;
        }
    }

    renderMissingMedia() {
        if (this.props.list && this.props.list.length > 0) {
            let missing = [];
            const lastVolume = this.props.list[this.props.list.length - 1].volume;
            let i = 0;
            let volume = 1;
            while (volume < lastVolume) {
                if (volume === this.props.list[i].volume) {
                    i++;
                } else {
                    missing.push(volume);
                }

                volume++;
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
