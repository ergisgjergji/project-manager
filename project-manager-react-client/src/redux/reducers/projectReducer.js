import { GET_PROJECTS, GET_PROJECT } from "../actions/types";

const initialState = {
    projects: [],
    currentProject: {}
};

export default function(state = initialState, action) {
    
    switch(action.type) {

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };

        case GET_PROJECT:
            return {
                ...state,
                currentProject: action.payload
            }

        default:
            return state
    }
}
