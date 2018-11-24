import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {


    render() {
        return(
            <header className="Header">
                <p>
                    just vote <span className="Header-version">v.0.1</span>
                </p>
            </header>
        )
    }
}

export default Header;