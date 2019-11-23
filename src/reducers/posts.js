import * as types from '../actions/ActionTypes';

const initialState =  {
    postData: null
}



export default function poster(prevState = initialState, action) {

    switch(action.type) {
        case types.POST_PICK :
            return {
                ...prevState,
                postData: action.id
            }
            default : 
                return prevState;
    }
}