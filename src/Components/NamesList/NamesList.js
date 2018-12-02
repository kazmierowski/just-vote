import React from 'react';
import './NamesList.scss';
import {animation} from "../../variables";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function NamesList(props) {

    if(props.where === 'insert') {

        return(
            <ul className="Insert NamesList">
                {
                    props.names.map((name, index) =>
                        <li className="NamesList-element" key={index}>{name}</li>
                    )
                }
            </ul>
        )
    } else if(props.where === 'vote') {
        console.log('goes with vote theme');
        return (
            <ul className='Vote NamesList'>

            </ul>
        )
    }
}