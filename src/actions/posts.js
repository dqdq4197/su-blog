import {
    POST_PICK,
} from './ActionTypes';

export function postShowRequest(id) {
    return {
        type: POST_PICK,
        id
    };
}