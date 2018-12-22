import React from 'react';
import './NamesList.scss';
import FlipMove from 'react-flip-move';

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

        return (
            <FlipMove typeName="ul" className="Vote NamesList">
                {
                    Object.keys(props.names).map((nameId, index) =>
                        <li className="NamesList-element" key={index} id={props.names[nameId].id} onClick={props.onClickHandler}>{props.names[nameId].value}</li>
                    )
                }
            </FlipMove>
        )
    } else {
        console.log('else');
    }
}