import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_ACCOUNT
} from './types';

export const loadUser = () => async dispatch => {
    dispatch(setAlert());
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/v1/users/auth')
        dispatch({ type: USER_LOADED, payload: res.data })
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({ firstname, lastname, email, password, passwordConfirm }) => async dispatch => {
    dispatch(setAlert());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ firstname, lastname, email, password, passwordConfirm });

    try {
        const res = await axios.post('/api/v1/users/signup', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Thanks for joining!', 'success'));
    } catch(err) {
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({ type: REGISTER_FAIL })
    }
}

export const login = ({email, password}) => async dispatch => {
    dispatch(setAlert())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.post('/api/v1/users/login', {email, password}, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Welcome back!', 'success'))
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        
        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({ type: LOGIN_FAIL })
    }
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}

export const updateAccount = (formData) => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.patch('/api/v1/users', formData, config);
        
        dispatch({ type: UPDATE_ACCOUNT, payload: res.data});
        dispatch(setAlert('Account Updated', 'success'));
    } catch(err) {
        console.log(err);
    }
}