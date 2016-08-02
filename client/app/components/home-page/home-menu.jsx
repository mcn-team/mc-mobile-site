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
                        icon="http://icons.iconarchive.com/icons/itzikgur/my-seven/512/Books-2-icon.png"
                        label="Collections List"
                        path="/collections"
                    />
                    <HomeButton
                        icon="http://www.apkdad.com/wp-content/uploads/2012/10/Barcode-Scanner-Icon.png"
                        label="Add Book"
                        path="/scan"
                        disabled="true"
                    />
                </div>
            </div>

        );
    }
}
