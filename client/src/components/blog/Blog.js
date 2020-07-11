import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { getBlog, createComment, deleteComment } from '../../actions/blog';
import Spinner from '../layout/Spinner';
import Alert from '../Alert';

const Blog = ({auth: { user }, match, getBlog, createComment, deleteComment, blog: { blog, comments, loading } }) => {
    useEffect(() => {
        const blogId = match.params.bid;
        getBlog(blogId);
    }, [getBlog, match.params.bid])

    const [formData, setFormData] = useState({
        content: ''
    });

    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onFormSubmit = e => {
        e.preventDefault();
        createComment(formData, match.params.bid);
    }

    return (
        <Fragment>
            {blog === null || loading ? <Spinner /> : 
                <Fragment>
                    <section className='container blog'>
                        <h1 className="heading-primary underline">{blog.title}</h1>
                        { user && user.role === 'admin' && !loading && <Link to={`/admin/create-post/${blog._id}`} className='button button--tertiary ml'>Create Post</Link>}
                        <div className="blog__card">
                            <div className='blog__card-img'>
                                <img src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt={blog.title} />
                                <div className="blog__card-tags">
                                    {blog.tags && blog.tags.map(tag =>
                                        <p>{tag}</p>
                                    )}
                                </div>
                            </div>
                            <div className="blog__card-content">
                                <p>{blog.description}</p>
                            </div>
                        </div>
                    </section>
                    <div className="divider"></div>
                    <section className="container post">
                        {blog.posts.length === 0 ? <div className='unavailable'>No post available</div> : 
                            blog.posts.map(post => 
                                <Fragment key={post._id}>
                                    <h2 className="heading-secondary">{post.title}</h2>
                                    { user && user.role === 'admin' && !loading && <Link to={`/admin/update-post/${blog._id}`} className='button button--tertiary ml'>Update Post</Link>}
                                    <div className="post__content">
                                        <p>{post.description}</p>
                                        <p>{post.subdescription}</p>
                                    </div>
                                    <div className="post__images">
                                        { post.images.length >= 1 && post.images.map(image => 
                                        <div className="post__images-item">
                                            <img src={`http://localhost:8000/uploads/blogs/${image}`} alt={post.title} />
                                        </div>
                                        )}
                                        
                                    </div>
                                </Fragment>
                            )
                        }
                    </section>
                    <div className="divider"></div>
                    <section className='container comment'>
                        <div className="comment__post">
                            <h1 className="heading-primary">Comments</h1>
                            <form action="#" className="form form--comment" onSubmit={onFormSubmit}>
                                <div className="form__group">
                                    <textarea cols="30" rows="5" name='content' id='content' className="form__input" onChange={e => onInputChange(e)} /> 
                                </div>

                                <input type="submit" value='Comment' className='button--tertiary' />
                            </form>
                            <Alert />
                        </div>
                        
                        { comments.length === 0 ? <div className='unavailable'>No Comments</div> :
                            comments.map(comment =>
                                <div className="comment__item" key={comment._id}>
                                    <div className="comment__img">
                                        <img src={`http://localhost:8000/uploads/users/${comment.user.image}`} alt="" />
                                    </div>
                                    <div className="comment__box">
                                        <strong className='comment__name'>{comment.user.firstname} {comment.user.lastname}</strong>
                                        <div className="meta">
                                            <span className='comment__date'><Moment format='YYYY/DD/MM'>{comment.date}</Moment></span>
                                        </div>
                                        <p>
                                            {comment.content}
                                        </p>
                                    </div>
                                    <div className="comment__btn">
                                        <button className='button--sm' onClick={() => deleteComment(comment._id)}> delete </button>
                                        <button className='button--sm'> reply </button>
                                    </div>    
                                </div>
                            )
                        }
                    </section>
                </Fragment>
            }
        </Fragment>
    )
}

Blog.propTypes = {
    auth: PropTypes.object.isRequired,
    getBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    blog: state.blog,
    auth: state.auth,
    comments: state.comments
})

export default connect(mapStateToProps, { getBlog, createComment, deleteComment })(Blog);
