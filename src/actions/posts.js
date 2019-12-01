import {
    POST_PICK,
    POSTER_LOAD_REQUEST,
    POSTER_LOAD_SUCCESS
} from './ActionTypes';

export function postShowRequest(id) {
    return {
        type: POST_PICK,
        id
    };
};
export function posterLoadRequest() {
    return {
        type: POSTER_LOAD_REQUEST,
    }
}
export function posterLoadSuccess() {
    return {
        type: POSTER_LOAD_SUCCESS,
    }
}