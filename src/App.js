import React, {Component} from 'react';
import './App.scss';
import Menu from './Components/SideMenu/SideMenu';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './router';
import {connect} from "react-redux";
import Login from "./Components/Login/Login";

class App extends Component {

    componentDidMount() {
        window.scrollTo(0,1);

        if(!this.props.loggedIn && window.location.pathname !== "/login") {
            console.log(window.location.href);
            window.location.href = "/login";
        }
    }

    render() {
        let router;

        if(this.props.loggedIn) {
            router = (routes) => {
                return routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            };
        } else {
            router = () => {
                return <Route
                    key={101}
                    path={'/login'}
                    exact={true}
                    component={Login}
                />
            }
        }


        return (

            <Router>
                <div className="App" id="App-outer-container">
                    <Menu/>
                    <div id="App-page-wrap">
                        <Header/>
                        <div className="App-content">
                            {router(routes)}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.user.loggedIn
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
