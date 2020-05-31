import axios from 'axios';
import { GET_ERRORS } from './types';
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
