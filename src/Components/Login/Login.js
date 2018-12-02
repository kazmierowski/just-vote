import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import {loginUser} from "../../actions";
import {bindActionCreators} from "redux";
import LoginForm from "../LoginForm/LoginForm";
import Spinner from "../Spinner/Spinner";
import Redirect from "react-router-dom/es/Redirect";

class Login extends Component {

    render() {

        if(this.props.user.loggedIn) {
            return(
                    <Redirect to={"/insert"}/>
            )
        }

        return(
            <div className="Login">
                <LoginForm onSubmit={this.props.loginUser}/>
                <Spinner isActive={this.props.user.loading}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({loginUser: loginUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);