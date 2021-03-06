const initialUserState = {
    id: null,
    name: 'no one',
    loggedIn: false,
    loading: false,
    names: [],
    colour: null,
    error: null,
    isReady: false
}

const initialAppState = {
    waiting: false,
    afterVote: false,
    loading: false,
    resultMessage: null,
    roundCount: 0,
    possibleVotes: 2
}

const initialNamesState = {
    list: [],
    winner: null,
    loading: false
}

export const userReducer = (state = initialUserState, action) => {

    switch (action.type) {

        case 'LOGIN_USER_STARTED':
            return {
                ...state, loading: true, name: 'loading'
            }

        case 'LOGIN_USER_COMPLETED':
            console.log('user login completed from reducer', action.response);
            return {
                ...state, loggedIn: true, loading: false, id: action.response.voter.id, name: action.response.voter.name
            }

        case 'LOGIN_USER_ERROR':
            return {
                ...state, loading: false, error: action.error.message, name: 'no one'
            }

        case 'ADD_SELECTED_NAMES_COMPLETED':
            return {
                ...state, names: action.names
            }

        case 'ADD_SELECTED_NAMES_ERROR':
            return {
                ...state, error: action.error.message
            }

        case 'USER_READY':
            return {
                ...state, isReady: action.isReady
            }

        default:
            return state;
    }
}

export const appReducer = (state = initialAppState, action) => {

    switch (action.type) {

        case 'APP_READY':
            return {
                ...state, waiting: false
            }

        case 'IS_APP_WAITING_START':
            return {
                ...state, loading: true
            }

        case 'IS_APP_WAITING_COMPLETED':
            console.log('app waiting complete', action.isWaiting);
            return {
                ...state, waiting: action.isWaiting, loading: false
            }

        case 'ALL_VOTERS_READY':
            return {
                ...state, waiting: false
            }

        case 'UPDATE_RESULT_MESSAGE':
            return {
                ...state, resultMessage: action.message
            }

        case 'UPDATE_ROUND_COUNT':
            return {
                ...state, roundCount: action.roundCount, possibleVotes: action.possibleVotes
            }


        default:
            return state;
    }
}

export const namesReducer = (state = initialNamesState, action) => {

    switch (action.type) {

        case 'GET_ALL_NAMES_START':
            return {
                ...state, loading: true
            }

        case 'GET_ALL_NAMES_COMPLETED':
        
            return {
                ...state, loading: false, list: action.names
            }

        case 'VOTE_FOR_NAME_START':
            return {
                ...state, loading: true
            }

        case 'VOTE_FOR_NAME_COMPLETED':

            let newState = Object.assign({}, state);

            newState.list[action.voteResponse.id].votesCount = action.voteResponse.votesCount;


            return {
                ...state, loading: false, list: newState.list
            }

        case 'GET_WINNER_NAME_START':
            return {
                ...state, loading: true
            }

        case 'GET_WINNER_NAME_COMPLETED':
            return {
                ...state, loading: false, winner: action.winner
            }

        case 'GET_WINNER_NAME_ERROR':
            return {
                state
            }


        default:
            return state;
    }

}