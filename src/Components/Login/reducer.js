const initialState = {
    id: null,
    loggedIn: false,
    loading: false,
    names: [],
    colour: null,
    error: null
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'LOGIN_USER_STARTED':
            return {
                ...state, loading: true
            }

        case 'LOGIN_USER_COMPLETED':
            console.log('user login completed from reducer', action.response);
            return {
                ...state, loggedIn: true, loading: false, id: action.response.voter.id
            }

        case 'LOGIN_USER_ERROR':
            return {
                ...state, loading: false, error: action.error.message
            }

        default:
            return state;

    }
}