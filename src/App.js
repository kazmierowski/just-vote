import React, {Component} from 'react';
import './App.scss';
import Menu from './Components/SideMenu/SideMenu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './router';

class App extends Component {
    render() {
        return (

            <Router>
                <div className="App" id="App-outer-container">
                    <Menu/>
                    <div id="App-page-wrap">
                        <header className="App-header">
                            <p>
                                just vote <span className="App-header-version">v.0.1</span>
                            </p>
                        </header>
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
