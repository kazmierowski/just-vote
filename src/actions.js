import axios from 'axios';

// Login

export const loginUser = (credentials) => {

    return dispatch => {

        dispatch(loginUserStarted());

        axios.post(window.location.host + '/user/login', credentials)
            .then(res => {
                dispatch(loginUserCompleted(res.data))
            })
            .catch(error => {
                dispatch(loginUserError(error.message))
            })
    }
}

export const loginUserStarted = () => {
    return {
        type: 'LOGIN_USER_STARTED'
    }
}

export const loginUserCompleted = (result) => {
    return {
        type: 'LOGIN_USER_COMPLETED',
        result
    }
}

export const loginUserError = (error) => {
    return {
        type: 'LOGIN_USER_ERROR',
        error
    }
}