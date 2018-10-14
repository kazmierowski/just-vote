import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import './SideMenu.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {routes} from "../../router";

class SideMenu extends Component {

    render () {
        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
                {routes.map((route, index) => (
                    <Link key={index} id={route.id} className="menu-item" to={route.path}>{route.name}</Link>
                ))}
                {/*<Link id="home" className="menu-item" to="/">Home</Link>*/}
                {/*<Link id="insert" className="menu-item" to="/insert">Insert names</Link>*/}
                {/*<Link id="contact" className="menu-item" to="/contact">Contact</Link>*/}
            </Menu>
        );
    }
}

export default SideMenu;