import React, { Component } from 'react';
import NameForm from "../NameForm/NameForm";
import {addSelectedNames, userReady} from "../../actions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import NamesList from "../NamesList/NamesList";
import './Insert.scss';
import {withRouter} from "react-router-dom";
import Redirect from 'react-router/es/Redirect';
class Insert extends Component {

    handleAddName = (name) => {
        if(this.props.userNames.length < 2 && name !== '') {
            this.props.addSelectedNames(name);
        }
    }

    handleRemoveName = (nameId) => {

    }

    handleContinue = () => {
        this.props.userReady();
        this.props.history.push("vote");
    }

    render() {
        // if(this.props.user.isReady) {
        //     return(
        //         <Redirect to={'/vote/'} />
        //     )
        // }
        return(
            <div className="Insert">
                <NamesList where="insert" names={this.props.userNames}/>
                <NameForm parentClassName="Insert-form" handleAddName={this.handleAddName} handleContinue={this.handleContinue} isFull={this.props.userNames.length >= 2}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    userNames: state.user.names,
    userReady: state.user.isReady
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addSelectedNames: addSelectedNames, userReady: userReady}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Insert));