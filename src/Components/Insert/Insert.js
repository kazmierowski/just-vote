import React, { Component } from 'react';
import './Insert.scss';
import NameForm from "../NameForm/NameForm";
import {addSelectedNames} from "../../actions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import NamesList from "../NamesList/NamesList";

class Insert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            names: []
        };
    }

    handleAddName = (name) => {

        if(this.state.names.length < 2) {
            this.setState((prevState) => ({
                names: [...prevState.names, name]
            }));
        }
    }

    handleRemoveName = (nameId) => {

    }

    render() {
        return(
            <div className="Insert">
                <NamesList where="insert" names={this.state.names}/>
                <NameForm parentClassName="Insert-form" handleAddName={this.handleAddName} isDisabled={this.state.names.length >= 2}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addSelectedNames: addSelectedNames}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Insert);