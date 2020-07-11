import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { getAllBlogs, deleteBlog } from '../../actions/blog';

const Admin = ({ auth, getAllBlogs, deleteBlog, blog: { blogs, loading } }) => {
    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs])
    return (
        <div className="dashboard">
            <Link to="/" className='button button--tertiary'> &larr; Home</Link>
            {auth.user.role === 'admin' && (
                <Fragment>
                    <Link to="/account" className='button button--tertiary ml'>
                        Account
                    </Link>
                    <Link to="/admin" className='button button--tertiary ml'>
                        Admin
                    </Link>
                </Fragment>
            )}
            <h1>Blogs</h1>
            <div className="dashboard__admin">
                <Link to="/admin/create-blog" className='button button--tertiary m'>
                    Create Blog
                </Link>
                <table className='table'>
                    <tr>
                        <th>Title</th>
                        <th>Continent</th>
                        <th className='hide-sm-t'>Tags</th>
                        <th className='hide-sm-t'>Image</th>
                        <th className='hide-sm-t'>Post</th>
                        <th></th>
                    </tr>
                    { blogs === null || loading ? <div> Loading...</div> :
                        blogs.map(blog => 
                            <tr>
                                <td>{blog.title}</td>
                                <td>{blog.destination}</td>
                                <td className='hide-sm-t'>{blog.tags}</td>
                                <td className='hide-sm-t'><img src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="avocado lover" /></td>
                                <td className='hide-sm-t'>{blog.posts.length > 0 ? blog.posts.length : 0 }</td>
                                <td>
                                    <Link to="/admin" className='button button--danger mlr' onClick={() => deleteBlog(blog._id)}>delete</Link>
                                    <Link to="/" className='button button--update mlr'>update</Link>
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    blog: state.blog
})

export default connect(mapStateToProps, { getAllBlogs,deleteBlog })(Admin);
