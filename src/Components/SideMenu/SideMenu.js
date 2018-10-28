// react-burger-menu implementation

import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import './SideMenu.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {routes} from "../../router";

class SideMenu extends Component {

    onClickHandler(e) {

    }

    render () {
        return (
            <Menu pageWrapId={"App-page-wrap"} outerContainerId={"App-outer-container"} isOpen={false}>
                {routes.map((route, index) => (
                    <Link key={index} id={route.id} className="menu-item" to={route.path} onClick={this.onClickHandler}>{route.name}</Link>
                ))}
            </Menu>
        );
    }
}

export default SideMenu;