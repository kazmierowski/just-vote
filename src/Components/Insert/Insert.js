import React, { Component } from 'react';
import NameForm from "../NameForm/NameForm";
import {addSelectedNames} from "../../actions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import NamesList from "../NamesList/NamesList";
import './Insert.scss';

class Insert extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     names: []
        // };
    }

    handleAddName = (name) => {

        console.log(this.props.user.names.length);
        console.log(this.props.user.names);
        console.log(this.props.user);

        if(this.props.userNames.length < 2 && name !== '') {
            this.props.addSelectedNames(name);

            // this.setState((prevState) => ({
            //     names: [...prevState.names, name]
            // }));
        }
    }

    handleRemoveName = (nameId) => {

    }

    render() {
        return(
            <div className="Insert">
                <NamesList where="insert" names={this.props.userNames}/>
                <NameForm parentClassName="Insert-form" handleAddName={this.handleAddName} isDisabled={this.props.userNames.length >= 2}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userNames: state.user.names
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addSelectedNames: addSelectedNames}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Insert);