import React, {Component} from 'react';
import './App.scss';
import Menu from './Components/SideMenu/SideMenu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './router';

class App extends Component {
    render() {
        return (

            <Router>
                <div className="App" id="outer-container">
                    <Menu/>
                    <div id="page-wrap">
                        <header className="App-header">
                            <p>
                                just vote <span className="App-header-version">v.0.1</span>
                            </p>
                        </header>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a sidebar or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        ))}
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
