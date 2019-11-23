import * as types from '../actions/ActionTypes';

const initialState = {
    isLoading : '',
};

export default function homeLoad(prevState=initialState, action) {

    switch(action.type) {

        case types.HOME_LOAD_REQUEST :
            return {
                ...prevState,
                isLoading: 'WAITING'
            }
        case types.HOME_LOAD_SUCCESS :
            return {
                ...prevState,
                isLoading: 'SUCCESS'
            }
        default :
            return prevState
    }
}