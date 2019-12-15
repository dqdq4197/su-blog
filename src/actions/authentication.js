import storage from '../lib/storage';

import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_PROFILE_IMG_CHANGE_SUCCESS,
    AUTH_LOGIN_INFO_SAVE,
} from './ActionTypes';
import axios from 'axios';

//  LOGIN
export function loginRequest(email,password) {
    return async(dispatch) => {
        dispatch(login());
        return await axios.post('/auth/login', {email,password})
        .then((response) => {
            const id = response.data.id;
            const nick = response.data.nick;
            const profile_img_path = response.data.profile_img;
            dispatch(loginSuccess(id,email,nick,profile_img_path));
            console.log(response.data);
            storage.set('loginInfo',response.data);
        }).catch((error) => {
            dispatch(loginFailure());
            alert(error.response.data.message);
            
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
            console.log('path: ',res.data.path)
        }).catch((error) => {
            console.log("action profile_img_change_error")
        })
    }
}
export function login() {
    return {
        type: AUTH_LOGIN_REQUEST
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
export function login_info_save(userinfo) {
    return {
        type: AUTH_LOGIN_INFO_SAVE,
        userinfo
    }
}