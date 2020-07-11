import axios from 'axios';

import {
    GET_BLOGS,
    GET_BLOG,
    CREATE_BLOG,
    DELETE_BLOG,
    UPDATE_BLOG,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_IMAGES
} from './types';

import { setAlert } from './alert';

export const getAllBlogs = () => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.get('/api/v1/blogs', config);

        dispatch({ type: GET_BLOGS, payload: res.data });
    } catch(err) {
        console.log(err);
    }
}

export const getBlog = bid => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.get(`/api/v1/blogs/${bid}`, config);

        dispatch({ type: GET_BLOG, payload: res.data });
    } catch(err) {
        console.log(err);
    }
}

export const createBlog = (formData) => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.post('/api/v1/blogs', formData, config);

        dispatch({ 
            type: CREATE_BLOG, 
            payload: res.data
        });
    } catch(err) {
        console.log(err);
    }
}

export const deleteBlog = bid => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.delete(`/api/v1/blogs/${bid}`, config);

        dispatch({ 
            type: DELETE_BLOG, 
            payload: res.data
        });
    } catch(err) {
        console.log(err);
    }
}

export const createPost = (formData, bid) => async dispatch => {
    const config = { 
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.post(`/api/v1/posts/${bid}`, formData, config)

        dispatch({ type: CREATE_POST, payload: res.data });
        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        console.log(err);
    }
}

export const createComment = (formData, bid) => async dispatch => {
    const config = { 
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.post(`/api/v1/blogs/${bid}/comments`, formData, config)

        dispatch({ type: CREATE_COMMENT, payload: res.data });
    } catch (err) {
        console.log(err);
        // dispatch(setAlert('Please login', 'danger'))
    }
}

export const deleteComment = (cid) => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.patch(`/api/v1/comments/${cid}`, config);
        dispatch({ type: DELETE_COMMENT, payload: res.data })
    } catch (err) {
        console.log(err)
    }
}

export const getAllImages = () => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    try {
        const res = await axios.get('/api/v1/blogs/getPostImages', config);
        dispatch({ type: GET_IMAGES, payload: res.data })
    } catch(err) {
        console.log(err);
    }
}