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
                }, 2000)
            })
            .catch(error => {
                setTimeout(() => { // for smoothness
                    dispatch(loginUserError(error))
                }, 2000)
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

        axios.post(window.location.protocol + '//' + window.location.host + '/user/add-selected-names', names)
            .then(
                () => {dispatch(addSelectedNamesCompleted(names))},
                error => {dispatch(addSelectedNamesError(error))}
                )
            .catch(error => {dispatch(addSelectedNamesError(error))})
    }
}

export const addSelectedNamesCompleted = (names) => {
    return {
        type: 'ADD_SELECTED_NAMES_COMPLETED',
        names: names
    }
}

export const addSelectedNamesError = (error) => {
    return {
        type: 'ADD_SELECTED_NAMES_ERROR',
        error
    }
}