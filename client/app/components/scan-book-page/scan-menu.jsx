import React from 'react';

export default class ScanMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    onSmallClick(event) {
        event.preventDefault();
    }

    onLargeClick(event) {
        event.preventDefault();
    }

    render() {
        return (
            <section className="spacer">
                <h5 className="title is-5 has-text-centered is-marginless">Scan size</h5>
                <div className="columns has-text-centered is-marginless is-mobile">
                    <div className="column">
                        <button type="button" className="button linear-grey" onClick={this.onSmallClick}>
                            Small
                        </button>
                    </div>
                    <div className="column">
                        <button type="button" className="button linear-grey" onClick={this.onLargeClick}>
                            Large
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}
