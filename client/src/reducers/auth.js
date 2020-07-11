import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGOUT,
    USER_LOADED,
    UPDATE_ACCOUNT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: false,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            }
        case UPDATE_ACCOUNT:
            return {
                ...state,
                loading: false,
                user: payload
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                user: null
            }
        default:
            return state;
    }
}