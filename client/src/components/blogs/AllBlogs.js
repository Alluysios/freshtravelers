import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBlogs } from '../../actions/blog';

import Spinner from '../layout/Spinner';

const AllBlogs = ({ getAllBlogs, blog: { blogs } }) => {
    
    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs])

    return (
        <Fragment>
            <section className="section blogs">
                <h1 className="heading-primary fluid center">Blog</h1>
                <div className="blogs__container">
                    {(blogs === null || blogs.length === 0 ? <Spinner /> : blogs.map(blog => 
                        <Fragment key={blog._id}>
                            <div className="card">
                                <div className="card__img">
                                    <Link to={`/blog/${blog._id}`}>
                                        <img src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt={blog.title} />
                                    </Link>
                                </div>
                                <div className="card__content">
                                    <h2 className='heading-secondary'>{blog.title}</h2>
                                    <p> { blog.description.substr(0, 250) }... </p>
                                    <div className="meta">
                                        <img src="img/heart.svg" className='heart' alt={blog.title} />
                                        {(blog.tags.length > 1 ? 
                                            blog.tags.map((tag, key) => 
                                            <Fragment key={key}>
                                                <span className='card__category'>{tag}</span>
                                            </Fragment>)
                                            :
                                            <span className='card__category'>{blog.tags}</span>
                                        )}
                                    </div>
                                    <Link to={`/blog/${blog._id}`} className='button button--primary mt'>Continue Reading...</Link>
                                </div>
                            </div>
                        </Fragment>    
                    ))}
                </div>
            </section>
        </Fragment>
    )
}

AllBlogs.propTypes = {
    blog: PropTypes.object.isRequired,
    getAllBlogs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, { getAllBlogs })(AllBlogs);
