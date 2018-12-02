import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="Footer">
                <p className="Footer-voter-name">{this.props.voterName}</p>
            </div>
        )
    }
}

export default Footer;