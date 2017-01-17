import React from 'react';

import HomeButton from './home-button';
import { RadioButtonGroup, RadioButton } from '../commons/radio-button-group.component';

export default class HomeMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    changeHandler(data) {
        //TODO: Implement handler
    }

    render() {
        return (
            <div className="columns is-mobile is-marginless">
                <div className="column is-6 is-offset-3 tile has-text-centered">
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
                    <RadioButtonGroup onChange={ this.changeHandler } childContainerStyle="padding-10" selected="v2">
                        <RadioButton value="v1">
                            Yo
                        </RadioButton>
                        <RadioButton name="v2" value="v2">
                            Salut
                        </RadioButton>
                    </RadioButtonGroup>
                </div>
            </div>

        );
    }
}
