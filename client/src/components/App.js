import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

import NavHeader from './layout/NavHeader';
import Home from './home/Home';
import Gallery from './home/Gallery';
import BlogForm from './forms/BlogForm';
import PostForm from './forms/PostForm';
import Blog from './blog/Blog';
import Blogs from './blogs/AllBlogs';
import Register from './auth/Register';
import Login from './auth/Login';
import Account from './dashboard/Account';
import Admin from './dashboard/Admin';
import Footer from './layout/Footer';
import PrivateRoute from './auth/PrivateRoute';

import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import { store } from '../index'
import setAuthToken from '../utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  
  return (
    <Router>
      <Fragment>
        <NavHeader />
        <main className='main'>
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/blogs' component={Blogs} />
            <Route exact path='/blog/:bid' component={Blog} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Register} />
            <PrivateRoute exact path='/account' component={Account} />
            <PrivateRoute exact path='/admin' component={Admin} />
            <PrivateRoute exact path='/admin/create-blog' component={BlogForm} />
            <PrivateRoute exact path='/admin/create-post/:bid' component={PostForm} />
            <PrivateRoute exact path='/admin/edit-blog' />
            <PrivateRoute exact path='/admin/edit-post' />
          </Switch>
        </main>
        <Footer />
      </Fragment>
    </Router>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {loadUser})(App);
