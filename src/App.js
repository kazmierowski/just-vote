import React, {Component} from 'react';
import './App.scss';
import Menu from './Components/SideMenu/SideMenu';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {routes} from './router';
import {connect} from "react-redux";
import Footer from "./Components/Footer/Footer";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {animation} from './variables';
import socket from './socket';
import { bindActionCreators } from 'redux';
import { allVotersReady, getAllNames } from './actions';

class App extends Component {

    componentDidMount() {
        window.scrollTo(0, 1);

        if (!this.props.loggedIn && window.location.pathname !== "/login") {
            console.log(window.location.href);
            window.location.href = "/login";
        }

        socket.on('all-voters-ready', () => { 
            this.props.getAllNames();
            this.props.allVotersReady();
        })

        socket.on('new-voter', (data) => {
            console.log('new user logged in:', data.votersCount);
        })

        socket.on('end-of-vote', () => {
            console.log('END OF VOTE');
        })
    }

    render() {
        console.log('app render');

        return (

            <ReactCSSTransitionGroup
                transitionName="animation-mount"
                transitionAppear={true}
                transitionAppearTimeout={animation.mountAnimationDuration}
                transitionEnter={false}
                transitionLeave={false}>
                <Router>
                    <div className="App" id="App-outer-container">
                        <Menu/>
                        <div id="App-page-wrap">
                            <Header/>
                            <div className="App-content">
                                <Switch>

                                    {
                                        routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.component}
                                            />
                                        ))
                                    }

                                </Switch>

                            </div>
                            <div><Footer voterName={this.props.voterName}/></div>
                        </div>
                    </div>
                </Router>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    voterName: state.user.name
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({allVotersReady: allVotersReady, getAllNames: getAllNames}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
