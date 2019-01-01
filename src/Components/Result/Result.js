import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from "react-redux/es/connect/connect";

import './Result.scss';

class Result extends Component {

    constructor(props) {
      super(props)

      this.introductionRef = React.createRef();
      this.nameRef = React.createRef();

      this.displayResults();
    }
    
    displayResults() {
        setTimeout(() => {
            this.introductionRef.current.classList.add('visible');
            setTimeout(() => {
                console.log(this.props.names)
                this.nameRef.current.classList.add('visible');
            }, 1500)
        }, 2000)
    }

    render() {
        return (
        <div className="Result">
            <p ref={this.introductionRef} className="Result-introduction">The winner is</p>
            <p ref={this.nameRef} className="Result-winner-name">{this.props.names.winner.name}</p>

            <div className="Result-diagram"></div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    names: state.names,
    user: state.user
});

const mapDispatchToProps = dispatch => {
    // return bindActionCreators({addSelectedNames: addSelectedNames, userReady: userReady}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
