import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG } from './types';
import { clearErrors } from './errorActions';

export const createProjectTask = (code, project_task, history) => dispatch => {

    axios.post(`/api/backlog/${code}`, project_task)
        .then(res => {
            history.push(`/projectBoard/${code}`);
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getBacklog = (code) => dispatch => {

    axios.get(`/api/backlog/${code}`)
        .then(res => dispatch({
            type: GET_BACKLOG,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}