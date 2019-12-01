import * as types from '../actions/ActionTypes';

const initialState =  {
    postData: null,
    isLoadding: '',
}



export default function poster(prevState = initialState, action) {

    switch(action.type) {
        case types.POST_PICK :
            return {
                ...prevState,
                postData: action.id
            }
        case types.POSTER_LOAD_REQUEST :
            return {
                ...prevState,
                isLoadding: 'WAITTING'
            }
        case types.POSTER_LOAD_SUCCESS :
            return {
                ...prevState,
                isLoadding: 'SUCCESS'
            }
            
        default : 
            return prevState;
    }
        
}