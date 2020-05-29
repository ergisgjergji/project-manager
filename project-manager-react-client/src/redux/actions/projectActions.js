import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types';
import { clearErrors } from './errorActions';

export const createOrUpdateProject = (project, history) => dispatch => {

    axios.post("/api/project", project)
        .then(res => {
            history.push("/dashboard");
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getProjects = () => dispatch => {

    axios.get("/api/project/all")
        .then(res => dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }));
};

export const getProject = (code, history) => dispatch => {
    axios.get(`/api/project/${code}`)
        .then(res => dispatch({
            type: GET_PROJECT,
            payload: res.data
        }))
        .catch(err => history.push("/dashboard"));
};

export const deleteProject = (code) => dispatch => {
    axios.delete(`/api/project/${code}`)
        .then(res => dispatch({
            type: DELETE_PROJECT,
            payload: code
        }));
};