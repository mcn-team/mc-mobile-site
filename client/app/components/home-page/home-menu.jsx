import React from 'react';

import HomeButton from './home-button';

export default class HomeMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns is-mobile is-marginless" >
                <div className="column is-6 is-offset-3 tile has-text-centered" >
                    <HomeButton
                        icon="dist/img/collections-icon.png"
                        label="Collections List"
                        path="/collections"
                    />
                    <HomeButton
                        icon="dist/img/add-icon.png"
                        label="Scan Book"
                        path="/scan"
                    />
                </div>
            </div>

        );
    }
}
