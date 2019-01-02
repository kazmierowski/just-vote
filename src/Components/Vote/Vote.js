import React, {Component} from 'react';
import './Vote.scss';
import NamesList from "../NamesList/NamesList";
import {animation} from "../../variables";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {addSelectedNames, isAppWaiting, getAllNames, voteForName, getWinnerName, updateResultMessage, updateRoundCount} from "../../actions";
import socket from '../../socket';
import Redirect from "react-router-dom/es/Redirect";
class Vote extends Component {

    constructor(props) {
        super(props);

        props.isAppWaiting();

        this.state = {
            selectedNamesCount: 0,
            allowedSelectionCount: 2
        }
    }

    componentDidMount() {
        socket.on('end-of-vote', (data) => {
            this.props.getWinnerName(data.winner);
            this.props.updateResultMessage(data.message);

            console.log('END OF VOTE');
            this.props.history.push("result");
        })

        socket.on('next-round', (data) => {
            this.props.updateResultMessage(data.message);
            this.props.getAllNames(data.newRoundNames);
            this.props.updateRoundCount(data.roundCount, 1);
            
            setTimeout(() => {
                this.props.history.push("vote")
            }, 8000);
            
            this.props.history.push("result");
        })
    }

    voteClickHandler = (e) => {

        console.log('possibleVotes:', this.props.app.possibleVotes)
        if (e.target.classList.contains('selected')) {

            this.props.voteForName(e.target.id, 'remove');

            e.target.classList.remove('selected');

            this.setState((prevState) => ({
                selectedNamesCount: prevState.selectedNamesCount - 1
            }));
        } else {

            if (this.state.selectedNamesCount < this.props.app.possibleVotes) {

                this.props.voteForName(e.target.id, 'add');
                e.target.classList.add('selected');

                this.setState((prevState) => ({
                    selectedNamesCount: prevState.selectedNamesCount + 1
                }));
            } else {
                //FIXME: do we need anything here ?
                // handler for displaying information about already max amount of selected elements
            }
        }

        // if(this.state.selectedElements.length === 2) {
        //
        // }
    }

    render() {
        console.log('render of vote');
        if(this.props.app.waiting) {
            return (
                <ReactCSSTransitionGroup
                    transitionName="animation-mount"
                    transitionAppear={true}
                    transitionAppearTimeout={animation.mountAnimationDuration}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <div className="Vote-waiting">
                        <p>Waiting for other users</p>
                    </div>

                </ReactCSSTransitionGroup>
            )
        } else {

            if(this.props.app.afterVote) {
                return (
                    <Redirect to={"/result"}/>
                )

            } else {
                return (
                    <ReactCSSTransitionGroup
                        transitionName="animation-mount"
                        transitionAppear={true}
                        transitionAppearTimeout={animation.mountAnimationDuration}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <NamesList className="Vote" names={this.props.names.list} where="vote" onClickHandler={this.voteClickHandler}/>
                    </ReactCSSTransitionGroup>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({
    app: state.app,
    names: state.names
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            isAppWaiting: isAppWaiting,
            getAllNames: getAllNames,
            voteForName: voteForName,
            getWinnerName: getWinnerName,
            updateResultMessage: updateResultMessage,
            updateRoundCount: updateRoundCount
        }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);