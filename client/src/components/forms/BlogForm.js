import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';

import { createBlog } from '../../actions/blog'

const BlogForm = ({ createBlog }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        destination: 'NA',
        image: 'defaultblog.jpeg'
    })

    const onInputChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0]})
    }

    const onFormSubmit = e => {
        e.preventDefault();
        let blogFormData = new FormData();
        blogFormData.append('title', formData.title)
        blogFormData.append('description', formData.description)
        blogFormData.append('tags', formData.tags)
        blogFormData.append('destination', formData.destination)
        blogFormData.append('image', formData.image)
        
        createBlog(blogFormData);
    }

    return (
        <div className="container">
            <Link to="/admin" className='button button--tertiary m'>
                Back to admin
            </Link>
            <h1 className="heading-primary">Create Blog</h1>
            <Alert />
            <form action="#" className='form' onSubmit={onFormSubmit}>
                <div className="form__group">
                    <label className="form__label">Title</label>
                    <input type='text' name='title' className="form__input" onChange={e => onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">description</label>
                    <textarea id="" cols="30" rows="10" name='description' className="form__input" onChange={e => onInputChange(e)}></textarea>
                </div>
                <div className="form__group">
                    <label className="form__label">Tags</label>
                    <input type='text' name='tags' className="form__input" onChange={e => onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">Continent:</label>
                    <select className='form__select' name='destination' onChange={e => onInputChange(e)}>
                        <option value="NA">NA</option>
                        <option value="EUROPE">EUROPE</option>
                        <option value="ASIA">ASIA</option>
                      </select>
                </div>
                <div className="form__group">
                    <label className="form__label">image:</label>
                    <input type='file' name='image' className="form__input" onChange={e => onFileChange(e)} />
                </div>
                <input type="submit" value='Create' className='button--tertiary' />
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default connect(null, { createBlog })(BlogForm);
