import React, {Component} from 'react';
import './Vote.scss';

const testList = ['biology', 'binnacles', 'boby', 'bingo', 'banana', 'biscuit', 'butter', 'bug', 'bar'];

const VotingList = (props) => (

    <ul className="Vote-select">
        {
            props.listOfNames.map((name, index) => (
                <li key={index} type="checkbox" id={index} className="Vote-select-element"
                    onClick={props.onClickHandler}>{name}</li>
            ))
        }
    </ul>
)

class Vote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedElements: new Array(),
        }

        this.voteClickHandler = this.voteClickHandler.bind(this);
    }

    voteClickHandler(e) {
        let targetId = e.target.id;

        if (e.target.classList.contains('selected')) {
            this.setState({
                selectedElements: this.state.selectedElements.filter(element => element != e.target.id)
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
            <div className="Vote">
                <VotingList listOfNames={testList} onClickHandler={this.voteClickHandler}/>
            </div>
        )
    }
}

export default Vote;