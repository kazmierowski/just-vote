import React, { Component } from 'react';
import './NameForm.scss';

class NameForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.value !== '') {
            event.target.classList = 'not-empty';
        } else {
            console.log('remove class');
            event.target.classList = '';
        }

        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return(
            <form className={`NameForm ${this.props.parentClassName}`} onSubmit={this.handleSubmit}>
                <h2>Lets add some names</h2>
                <div className="NameForm-input-wrapper">
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <label>name</label>
                </div>
                <input className="NameForm-button-submit" type="submit" value="Submit"/>
            </form>
        )
    }
}

export default NameForm;