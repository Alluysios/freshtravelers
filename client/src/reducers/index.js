import { combineReducers } from 'redux';
import auth from './auth'
import alert from './alert'
import blog from './blog'

export default combineReducers({
    auth,
    alert,
    blog
});