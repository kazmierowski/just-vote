import React, { Component } from 'react';
import './Insert.scss';
import NameForm from "../NameForm/NameForm";

const inputElement = () => (
    <input/>
);

class Insert extends Component {

    render() {
        return(
            <div className="Insert">
                <NameForm parentClassName="Insert-form"/>
            </div>
        )
    }
}

export default Insert;