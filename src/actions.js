import axios from 'axios';

// Login

export const loginUser = (credentials) => {

    return dispatch => {

        console.log('credentials from action', credentials);
        dispatch(loginUserStarted());

        // axios.post(window.location.protocol + '//' + window.location.host + '/user/login', credentials)
        //     .then(res => {
        //         setTimeout(() => { // for smoothness
        //             dispatch(loginUserCompleted(res.data))
        //         }, 2000)
        //     })
        //     .catch(error => {
        //         setTimeout(() => { // for smoothness
        //             dispatch(loginUserError(error))
        //         }, 2000)
        //     })

        setTimeout(() => {
            dispatch(loginUserCompleted({success: true}))
        }, 2000);
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