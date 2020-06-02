import { SET_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    user: {}
};

export default function( state = initialState, action ) {
    
    switch(action.type) {

        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: localStorage.getItem('token')
            }

        default:
            return state;
            
    }
}