import axios from 'axios';
import { SET_USER, GET_ERRORS, PASSWORD_MISMATCH } from './types';
import { clearErrors } from './errorActions';

export const register = (newUser, history) => dispatch => {

    const { full_name, username, password, confirm_password } = newUser;
    const user = { full_name, username, password };

    if(password !== confirm_password) {
        dispatch({
            type: PASSWORD_MISMATCH
        });
    }

    else {
        axios.post("/api/user/register", user)
        .then(res =>{
            history.push("/login");
            dispatch(clearErrors());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
    }
}