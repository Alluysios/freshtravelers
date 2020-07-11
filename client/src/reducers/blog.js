import {
    GET_BLOG,
    GET_BLOGS,
    CREATE_BLOG,
    DELETE_BLOG,
    UPDATE_BLOG,
    CREATE_POST,
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_IMAGES
} from '../actions/types';

const initialState = {
    blog: null,
    blogs: [],
    posts: [],
    comments: [],
    gallery: [],
    loading: true
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_BLOGS: 
            return {
                ...state,
                blogs: payload,
                loading: false
            }
        case GET_BLOG:
            return {
                ...state,
                blog: payload,
                comments: payload.comments,
                loading: false
            }
        case CREATE_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, payload],
                loading: false
            }
        case DELETE_BLOG:
            return {
                ...state,
                blogs: payload,
                loading: false
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.blog.posts, payload]
            }
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: payload
            }
        case GET_IMAGES:
            return {
                ...state,
                gallery: payload
            }
        default:
            return state;
    }
}