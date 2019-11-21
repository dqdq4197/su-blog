import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_PROFILE_IMG_CHANGE_SUCCESS,
} from './ActionTypes';
import axios from 'axios';

//  LOGIN
export function loginRequest(email,password) {
    return (dispatch) => {
        dispatch(login());
        return axios.post('/auth/login', {email,password})
        .then((response) => {
            const id = response.data.id;
            const nick = response.data.nick;
            const profile_img_path = response.data.profile_img;
            dispatch(loginSuccess(id,email,nick,profile_img_path));
            console.log(response.data);
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

export function profile_img_change(formdata) {
    return (dispatch) => {
        return axios.post('/auth/profile/img',formdata)
        .then((res) => {
            dispatch(profile_img_change_success(res.data.path))
        }).catch((error) => {
            console.log("action profile_img_change_error")
        })
    }
}
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(id,email,nick,path) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        id,
        email,
        nick,
        path
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
export function profile_img_change_success(path) {
    return {
        type: AUTH_PROFILE_IMG_CHANGE_SUCCESS,
        path
    }
}