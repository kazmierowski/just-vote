import axios from 'axios';

// Login

export const loginUser = (credentials) => {

    return dispatch => {

        console.log('credentials from action', credentials);
        dispatch(loginUserStarted());

        axios.post(window.location.protocol + '//' + window.location.host + '/user/login', credentials)
            .then(res => {
                setTimeout(() => { // for smoothness
                    dispatch(loginUserCompleted(res.data))
                }, 1000)
            })
            .catch(error => {
                setTimeout(() => { // for smoothness
                    dispatch(loginUserError(error))
                }, 1000)
            })

        // for offline testing
        // setTimeout(() => {
        //     dispatch(loginUserCompleted({success: true}))
        // }, 2000);
    }
}

export const loginUserStarted = () => {
    return {
        type: 'LOGIN_USER_STARTED'
    }
}

export const loginUserCompleted = (response) => {
    return {
        type: 'LOGIN_USER_COMPLETED',
        response
    }
}

export const loginUserError = (error) => {
    return {
        type: 'LOGIN_USER_ERROR',
        error
    }
}

// Names

export const addSelectedNames = (names) => {
    return dispatch => {
        console.log('names to be added', names);

        axios.post(window.location.protocol + '//' + window.location.host + '/user/add-selected-names', {'names': names})
            .then(
                res => {console.log(res); dispatch(addSelectedNamesCompleted(res.data.names))},
                error => {dispatch(addSelectedNamesError(error))}
                )
            .catch(error => {dispatch(addSelectedNamesError(error))})
    }
}

export const addSelectedNamesCompleted = (names) => {
    console.log(names);
    return {
        type: 'ADD_SELECTED_NAMES_COMPLETED',
        names: names
    }
}

export const addSelectedNamesError = (error) => {
    return {
        type: 'ADD_SELECTED_NAMES_ERROR',
        error: error
    }
}

// User ready
export const userReady = () => {
    return dispatch => {

        console.log('user ready triggered');

        axios.post(window.location.protocol + '//' + window.location.host + '/user/ready', {isReady: true})
            .then(res => {
                dispatch(userReadyCompleted(res.data.isReady))
            })
    }
}

export const userReadyCompleted = (isReady) => {
    return {
        type: 'USER_READY',
        isReady: isReady
    }
}

// App
export const isAppWaiting = () => {

    return dispatch => {

        console.log('is app waiting start');

        dispatch(isAppWaitingStart());

        axios.post(window.location.protocol + '//' + window.location.host + '/app/is-waiting')
            .then(res => {
                dispatch(isAppWaitingCompleted(res.data.app.isWaiting))
            })
            .catch(error => {
                dispatch(isAppWaitingError(error))
            })

        // for offline testing
        // setTimeout(() => {
        //     dispatch(loginUserCompleted({success: true}))
        // }, 2000);
    }
}

export const isAppWaitingStart = () => {
    return {
        type: 'IS_APP_WAITING_START'
    }
}

export const isAppWaitingCompleted = (isWaiting) => {
    return {
        type: 'IS_APP_WAITING_COMPLETED',
        isWaiting: isWaiting
    }
}

export const isAppWaitingError = (error) => {
    return {
        type: 'IS_APP_WAITING_ERROR',
        error: error
    }
}

export const allVotersReady = () => {

    return {
        type: 'ALL_VOTERS_READY'
    }
}

export const updateResultMessage = (message) => {

    return {
        type: 'UPDATE_RESULT_MESSAGE',
        message: message
    }
}

export const updateRoundCount = (roundCount, possibleVotes) => {
    return {
        type: 'UPDATE_ROUND_COUNT',
        roundCount: roundCount,
        possibleVotes: possibleVotes
    }
}

// Names
export const getAllNames = (names = null) => {

    return dispatch => {

        if(names !== null) {
            dispatch(getAllNamesCompleted(names));
            return;
        }

        console.log('get all names start');

        dispatch(getAllNamesStart());

        axios.post(window.location.protocol + '//' + window.location.host + '/names/get-all')
            .then(res => {
                console.log('names from action', res.data.names);
                dispatch(getAllNamesCompleted(res.data.names))
            })
            .catch(error => {
                console.log('get all names error', error);
            })

        // for offline testing
        // setTimeout(() => {
        //     dispatch(loginUserCompleted({success: true}))
        // }, 2000);
    }
}

export const getAllNamesStart = () => {
    return {
        type: 'GET_ALL_NAMES_START'
    }
}

export const getAllNamesCompleted = (names) => {
    return {
        type: 'GET_ALL_NAMES_COMPLETED',
        names: names
    }
}

export const voteForName = (nameId, option) => {

    return dispatch => {

        console.log('vote for name start');

        dispatch(voteForNameStart());

        axios.post(window.location.protocol + '//' + window.location.host + '/names/vote', {nameId: nameId, option: option})
            .then(res => {
                dispatch(voteForNameCompleted(res.data.voteResponse))
                console.log('response: ', res.data.voteResponse)
            })
            .catch(error => {
                console.log('vote for name error', error);
            })

        // for offline testing
        // setTimeout(() => {
        //     dispatch(loginUserCompleted({success: true}))
        // }, 2000);
    }
}

export const voteForNameStart = () => {
    return {
        type: 'VOTE_FOR_NAME_START'
    }
}

export const voteForNameCompleted = (voteResponse) => {
    return {
        type: 'VOTE_FOR_NAME_COMPLETED',
        voteResponse: voteResponse
    }
}

export const getWinnerName = (winner = null) => {

    return dispatch => {

        if(winner) {
            dispatch(getWinnerNameCompleted(winner));
            return;
        }

        console.log('getting the winner name');
        dispatch(getWinnerNameStart());

        axios.post(window.location.protocol + '//' + window.location.host + '/names/winner')
            .then(res => {
                dispatch(getWinnerNameCompleted(res.data.winner, res.data.message));
                console.log('winner response:', res.data.winner);
            })
            .catch(error => {
                dispatch(getWinnerNameError(error));
                console.log('get winner error:', error);
            })
    }
}

export const getWinnerNameStart = () => {
    return {
        type: 'GET_WINNER_NAME_START'
    }
}

export const getWinnerNameCompleted = (winner, resultMessage) => {
    return {
        type: 'GET_WINNER_NAME_COMPLETED',
        winner: winner,
        resultMessage: resultMessage
    }
}

export const getWinnerNameError = (error) => {
    return {
        type: 'GET_WINNER_NAME_ERROR',
        error: error
    }
}