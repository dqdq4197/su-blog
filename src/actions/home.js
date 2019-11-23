import {
    HOME_LOAD_REQUEST,
    HOME_LOAD_SUCCESS,
} from './ActionTypes';

export function home_load_request() {
    return {
        type: HOME_LOAD_REQUEST,
    }
}
export function home_load_success() {
    return {
        type: HOME_LOAD_SUCCESS,
    }
}