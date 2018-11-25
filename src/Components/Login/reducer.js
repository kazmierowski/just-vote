const initialState = {
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
            console.log('user login completed from reducer');
            return {
                ...state, loggedIn: true, loading: false
            }

        case 'LOGIN_USER_ERROR':
            return {
                ...state, loading: false, error: action.error.message
            }

        default:
            return state;

    }
}