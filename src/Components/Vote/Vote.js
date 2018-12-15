import React, {Component} from 'react';
import './Vote.scss';
import NamesList from "../NamesList/NamesList";

const testList = ['biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter', 'bug', 'bar'];

class Vote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedElements: [],
        }
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
        return (
            <NamesList className="Vote" names={testList} where="vote" onClickHandler={this.voteClickHandler}/>
        )
    }
}

export default Vote;