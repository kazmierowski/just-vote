import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class Login extends Component {

    render() {
        return(
            <p>Login</p>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);