import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS } from './types';

export const createProject = (project, history) => dispatch => {

    axios.post("http://localhost:8080/api/project", project)
        .then(res => history.push("/dashboard"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getProjects = () => dispatch => {

    axios.get("http://localhost:8080/api/project/all")
        .then(res => dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }));
}