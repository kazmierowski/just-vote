import React, {Component} from 'react';
import './Vote.scss';
import NamesList from "../NamesList/NamesList";
import {animation} from "../../variables";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {addSelectedNames, isAppWaiting, getAllNames, voteForName} from "../../actions";

const testList = ['biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter', 'bug', 'bar', 'biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter'];

class Vote extends Component {

    constructor(props) {
        super(props);

        props.isAppWaiting();
        props.getAllNames();

        this.state = {
            selectedNamesCount: 0
        }
    }

    voteClickHandler = (e) => {

        console.log('Vote class click handler')

        let targetId = e.target.id;

        if (e.target.classList.contains('selected')) {

            console.log('unselect vote');

            this.props.voteForName(e.target.id, 'remove');

            e.target.classList.remove('selected');

            this.setState((prevState) => ({
                selectedNamesCount: prevState.selectedNamesCount - 1
            }));
        } else {

            if (this.state.selectedNamesCount < 2) {

                console.log('selected name id:', e.target.id);
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

const mapStateToProps = (state) => ({
    app: state.app,
    names: state.names
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({isAppWaiting: isAppWaiting, getAllNames: getAllNames, voteForName: voteForName}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);