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
                ...state, isReady: true
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


        default:
            return state;
    }
}