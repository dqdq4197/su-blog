import * as types from '../actions/ActionTypes'

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: {
            user_email: '',
            user_nick: ''
        } 
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
                    currentUser: {
                        ...prevState.currentUser,
                        user_email : action.email,
                        user_nick : action.nick
                    }
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
                    currentUser: {
                        ...prevState.currentUser
                    }
                }
            };
        default:
            return prevState;
    }
}