import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getAllBlogs } from '../../actions/blog';
import Spinner from '../layout/Spinner';

const Blog = ({ getAllBlogs, blog: { blogs }}) => {
    useEffect(() => {
        getAllBlogs();
    },[getAllBlogs])
    return (
        <section className="container section blog">
            <h1 className="heading-primary fluid center">Blog</h1>
            {/* <div className="blog__highlight hide-sm">
                <img src="img/avocado.jpg" className='blog__highlight-img' alt="avocado lover" />
                <div className="blog__highlight-content">
                    <h2 className='heading-secondary blog__highlight-title'>Avocado Lover</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptas, iste labore alias vitae incidunt voluptatem reprehenderit dolores!.</p>
                    <Link to="#" className='button button--secondary mt'>READ BLOGS</Link>
                </div>
            </div> */}
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
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, {getAllBlogs})(Blog);
