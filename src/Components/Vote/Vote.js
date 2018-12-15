import React, {Component} from 'react';
import './Vote.scss';
import NamesList from "../NamesList/NamesList";
import {animation} from "../../variables";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {addSelectedNames, isAppWaiting} from "../../actions";

const testList = ['biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter', 'bug', 'bar', 'biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter'];

class Vote extends Component {

    constructor(props) {
        super(props);

        props.isAppWaiting();
    }

    voteClickHandler = (e) => {

        let targetId = e.target.id;

        if (e.target.classList.contains('selected')) {
            this.setState({
                selectedElements: this.state.selectedElements.filter(element => element !== e.target.id)
            });

            e.target.classList.remove('selected');
        } else {
            if (this.state.selectedElements.length < 2) {
                this.setState(prevState => ({
                    selectedElements: [...prevState.selectedElements, targetId]
                }))

                e.target.classList.add('selected');
            } else {
                // handler for displaying information about already max amount of selected elements
            }
        }

        if(this.state.selectedElements.length === 2) {

        }
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
                    <NamesList className="Vote" names={testList} where="vote" onClickHandler={this.voteClickHandler}/>
                </ReactCSSTransitionGroup>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    app: state.app
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({isAppWaiting: isAppWaiting}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);