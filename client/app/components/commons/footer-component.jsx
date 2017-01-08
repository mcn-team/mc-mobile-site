import React from 'react';

import { Config } from '../../config/config';

export class McmsFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const version = Config.version;

        return (
            <footer className="mini-spacer mini-left-spacer">
                <small>Media Collection Team - </small>
                <small>{ version }</small>
            </footer>
        );
    }
}
