import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

//  LOGIN
export function loginRequest(email,password) {
    return (dispatch) => {
        dispatch(login());
        return axios.post('/auth/login', {email,password})
        .then((response) => {
            dispatch(loginSuccess(email));
        }).catch((error) => {
            dispatch(loginFailure());
        });
    };
}

export function logoutRequest() {
    return (dispatch) => {
        return axios.get('/auth/logout')
        .then((response) => {
            dispatch(logout())
        }).catch((error) => {
            console.log(error.response);
        })

    }
}
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(email) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        email
    };
}

export function loginFailure() { 
    return{
        type: AUTH_LOGIN_FAILURE
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}