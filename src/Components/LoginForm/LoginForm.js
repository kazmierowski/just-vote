import React, { Component } from 'react';
import './LoginForm.scss';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {nameValue: '', passwordValue: ''};
    }

    handleChange = (event) => {
        if(event.target.value !== '') {
            event.target.classList = 'not-empty';
        } else {
            event.target.classList = '';
        }

        if(event.target.id === "name") {
            this.setState({nameValue: event.target.value});
        } else if(event.target.id === "password") {
            this.setState({passwordValue: event.target.value});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit({name: this.state.nameValue, password: this.state.passwordValue});
    }

    render() {

        return(
            <form className={`LoginForm ${this.props.parentClassName}`} onSubmit={this.handleSubmit}>
                {/*<h2>Lets create</h2>*/}
                <div className="LoginForm-input-wrapper">
                    <input id="name" type="text" value={this.state.nameValue} onChange={this.handleChange}/>
                    <label>name</label>
                </div>
                <div className="LoginForm-input-wrapper">
                    <input id="password" type="password" value={this.state.value} onChange={this.handleChange}/>
                    <label>password</label>
                </div>
                <input className="LoginForm-button-submit" type="submit" value="Login"/>
            </form>
        )
    }
}

export default LoginForm;