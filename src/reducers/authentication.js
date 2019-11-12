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

export default function authentication(prevState=initialState, action) {
   
    switch(action.type) {
        //LOGIN
        case types.AUTH_LOGIN:
            return {
                ...prevState,
                login: {
                    status : 'WAITING'
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...prevState,
                login: {
                    status:  'SUCCESS'
                },
                status: {
                    isLoggedIn: true ,
                    currentUser: action.email,
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...prevState,
                login: {
                    status: 'FAILURE'
                }
            };
        //  LOG_OUT
        case types.AUTH_LOGOUT:
            return {
                ...prevState,
                status: {
                    isLoggedIn: false,
                    currentUser: ''
                }
            };
        default:
            return prevState;
    }
}