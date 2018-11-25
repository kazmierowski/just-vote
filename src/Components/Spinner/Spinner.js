import React, { Component } from 'react';
import './Spinner.scss';

export default function Spinner(props) {

    if(props.isActive) {
        return <div className="Spinner">Loading...</div>
    } else {
        return <div></div>
    }
}