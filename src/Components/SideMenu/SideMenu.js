// react-burger-menu implementation

import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import './SideMenu.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {routes} from "../../router";
import connect from "react-redux/es/connect/connect";

class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        }
    }

    onClickHandler = (e) => {

        this.setState({
            menuOpen: false
        })
    }

    render () {

        let availableOptions;

        if(this.props.loggedIn) {
            availableOptions = (routes) => {
                return routes.map((route, index) => (
                    <Link key={index} id={route.id} className="menu-item" to={route.path} onClick={this.onClickHandler}>{route.name}</Link>
                ))
            }
        } else {
            availableOptions = () => {
                return <Link key={101} id='login' className="menu-item" to={'/login'} onClick={this.onClickHandler}>Login</Link>
            }
        }


        return (
            <Menu pageWrapId={"App-page-wrap"} outerContainerId={"App-outer-container"} isOpen={false}>
                {availableOptions(routes)}
            </Menu>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.user.loggedIn
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);