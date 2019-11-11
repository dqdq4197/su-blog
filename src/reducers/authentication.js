import * as types from '../actions/ActionTypes'

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(prevState, action) {
    if(typeof state === "undefined") {
        prevState = initialState;
    }
    
    switch(action.type) {
        //LOGIN
        case types.AUTH_LOGIN:
            return {
                ...prevState,
                login: {
                    status: { $set: 'WAITTING'}
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...prevState,
                login: {
                    status: { $set: 'SUCCESS'}
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.email}
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...prevState,
                login: {
                    status: { $set: 'FAILURE'}
                }
            };
        //  LOG_OUT
        case types.AUTH_LOGOUT:
            return {
                ...prevState,
                status: {
                    isLoggedIn: { $set: false},
                    currentUser: { $set: ''}
                }
            };
        default:
            return prevState;
    }
}