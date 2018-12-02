const initialState = {
    id: null,
    name: 'no one',
    loggedIn: true,
    loading: false,
    names: [],
    colour: null,
    error: null
}

export const userReducer = (state = initialState, action) => {

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

        default:
            return state;

    }
}