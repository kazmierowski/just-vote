import React, { Component } from 'react';
import './NameForm.scss';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {animation} from "../../variables";

class NameForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', names: []};
    }

    handleChange = (event) => {
        if(event.target.value !== '') {
            event.target.classList = 'not-empty';
        } else {
            console.log('remove class');
            event.target.classList = '';
        }

        this.setState({value: event.target.value});
    }

    handleAdd = (event) => {
        event.preventDefault();
        this.props.handleAddName(this.state.value);
        this.setState({value: ''});

    }

    render() {
        return(
            <ReactCSSTransitionGroup
                transitionName="animation-mount"
                transitionAppear={true}
                transitionAppearTimeout={animation.mountAnimationDuration}
                transitionEnter={false}
                transitionLeave={false}>

            <form className={`NameForm ${this.props.parentClassName}`} onSubmit={this.handleAdd}>
                <h2>Lets add some names</h2>
                <div className="NameForm-input-wrapper">
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <label>name</label>
                </div>
                <input className="NameForm-button-submit" type="submit" value="Add" disabled={this.props.isDisabled}/>
            </form>
            </ReactCSSTransitionGroup>
        )
    }
}

export default NameForm;