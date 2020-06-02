import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';
import authReducer from './authReducer';

export default combineReducers ({
    errorStore: errorReducer,
    projectStore: projectReducer,
    backlogStore: backlogReducer,
    authStore: authReducer
});