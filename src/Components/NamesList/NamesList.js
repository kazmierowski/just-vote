import React from 'react';
import './NamesList.scss';
import FlipMove from 'react-flip-move';
import {animation} from "../../variables";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function NamesList(props) {

    if(props.where === 'insert') {

        console.log('from function', props.names)

        return(
            <FlipMove typeName="ul" className="Insert NamesList">
                {
                    props.names.map((name, index) =>
                        <li className="NamesList-element" key={name.id}>{name.value}</li>
                    )
                }
            </FlipMove>
        )
    } else if(props.where === 'vote') {
        console.log('goes with vote theme');
        return (
            <ul className='Vote NamesList'>
                {
                    props.names.map((name, index) =>
                        <li className="NamesList-element" key={index} id={index} onClick={props.onClickHandler}>{name}</li>
                    )
                }
            </ul>
        )
    } else {
        console.log('else');
    }
}