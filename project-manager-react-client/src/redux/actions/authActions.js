import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_USER, GET_ERRORS, PASSWORD_MISMATCH } from './types';
import { clearErrors } from './errorActions';
import headersConfig from './../securityUtils/headersConfig';

export const register = (newUser, history) => dispatch => {

    const { full_name, username, password, confirm_password } = newUser;
    const user = { full_name, username, password };
    // Password match validation
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

export const login = (loginRequest) => dispatch => {

    // Post -> Login Request
    axios.post("/api/user/login", loginRequest)
        .then(res => {
            // Extract token from response data
            const { token } = res.data;
            // Store the token in localStorage
            localStorage.setItem("token", token);
            // Set our token in header requests
            headersConfig(token);
            // Decode token on React
            const decoded = jwt_decode(token);
            // dispatch to our authReducer
            dispatch({
                type: SET_USER,
                payload: decoded
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}