import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "../actions/types";

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
            };

        case DELETE_PROJECT: {
            return {
                ...state,
                projects: state.projects.filter(project => project.code !== action.payload)
            };
        }

        default:
            return state
    }
}
