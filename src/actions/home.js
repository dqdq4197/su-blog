import {
    HOME_LOAD_REQUEST,
    HOME_LOAD_SUCCESS,
    HOME_MORE_REQUEST
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
export function home_more_request(prevItem, Items) {
    return {
        type: HOME_MORE_REQUEST,
        prevItem,
        Items
    }
}