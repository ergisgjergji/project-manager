import { GET_ERRORS, CLEAR_ERRORS, PASSWORD_MISMATCH } from '../actions/types';

const initialState = {};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case GET_ERRORS:
            return action.payload;

        case CLEAR_ERRORS:
            return {};

        case PASSWORD_MISMATCH:
            const newState = {...state};
            newState.confirm_password = "Passwords do not match";
            return newState;

        default:
            return state;
            
    }
}