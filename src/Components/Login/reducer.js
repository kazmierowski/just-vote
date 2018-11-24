const initialState = {
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
                ...state, loading: true
            }

        case 'LOGIN_USER_COMPLETED':
            return {
                ...state, loggedId: true, loading: false
            }

        case 'LOGIN_USER_ERROR':
            return {
                loading: false, error: action.payload.error
            }

        default:
            return state;

    }
}