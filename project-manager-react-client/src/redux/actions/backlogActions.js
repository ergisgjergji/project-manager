import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';
import { clearErrors } from './errorActions';
import { toast } from 'react-toastify';

export const createProjectTask = (code, project_task, history) => dispatch => {

    axios.post(`/api/backlog/${code}`, project_task)
        .then(res => {
            history.push(`/projectBoard/${code}`);
            dispatch(clearErrors());
            toast.success('✔ Task was created successfully.');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getBacklog = (code) => dispatch => {

    axios.get(`/api/backlog/${code}`)
        .then(res => {
            dispatch({
                type: GET_BACKLOG,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getProjectTask = (code, sequence, history) => dispatch => {

    axios.get(`/api/backlog/${code}/${sequence}`)
        .then(res => {
            dispatch({
                type: GET_PROJECT_TASK,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => history.push("/dashboard"));
}

export const updateProjectTask = (code, sequence, project_task, history) => dispatch => {

    axios.patch(`/api/backlog/${code}/${sequence}`, project_task)
        .then(res => {
            history.push(`/projectBoard/${code}`);
            dispatch(clearErrors());
            toast.info('ℹ Task was updated successfully.');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const deleteProjectTask = (code, sequence) => dispatch => {

    axios.delete(`/api/backlog/${code}/${sequence}`)
        .then(res => {
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: sequence
            });
            toast.info('ℹ Task was deleted successfully.');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}