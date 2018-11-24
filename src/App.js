import React, {Component} from 'react';
import './App.scss';
import Menu from './Components/SideMenu/SideMenu';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './router';

class App extends Component {

    componentDidMount() {
        window.scrollTo(0,1);
    }

    render() {
        return (

            <Router>
                <div className="App" id="App-outer-container">
                    <Menu/>
                    <div id="App-page-wrap">
                        <Header/>
                        <div className="App-content">
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
