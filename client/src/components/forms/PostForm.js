import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../Alert';

import { createPost } from '../../actions/blog';

const PostForm = ({ match, createPost }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        food: false,
        subdescription: '',
        image: '',
        images: []
    })

    let blogId = match.params.bid;

    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = e => {
        const value = e.target.name === 'food' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }

    const onFileChange = e => {
        if(e.target.name === 'image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        }

        if(e.target.name === 'images') {
            setFormData({ ...formData, [e.target.name]: e.target.files })
        }
        
    }


    const onFormSubmit = e => {
        e.preventDefault();
        let postFormData = new FormData();
        postFormData.append('title', formData.title)
        postFormData.append('location', formData.location)
        postFormData.append('food', formData.food)
        postFormData.append('description', formData.description)
        postFormData.append('subdescription', formData.subdescription)
        postFormData.append('image', formData.image)
        for(const key of Object.keys(formData.images)) {
            postFormData.append('images', formData.images[key])
        }
        createPost(postFormData, blogId);
    }

    return (
        <div className="container">
            <Link to="/admin" className='button button--tertiary m'>
                Back to admin
            </Link>
            <Alert />
            <h1 className="heading-primary">Create Post</h1>
            <form action="#" className='form' onSubmit={onFormSubmit}>
                <div className="form__group">
                    <label className="form__label">Title</label>
                    <input type='text' name='title' className="form__input" onChange={e => onInputChange(e)} />
                </div>
                <input type="checkbox" id="food" name="food" checked={formData.food} onChange={e => onCheckboxChange(e)} />
                <label for="food" className='form__label'>About Food?</label>
                <div className="form__group">
                    <label className="form__label">description</label>
                    <textarea id="" cols="30" rows="10" name='description' className="form__input" onChange={e => onInputChange(e)}></textarea>
                </div>
                <div className="form__group">
                    <label className="form__label">sub description</label>
                    <input type='text' name='subdescription' className="form__input" onChange={e => onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">image:</label>
                    <input type='file' name='image' className="form__input" onChange={e => onFileChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">images:</label>
                    <input type='file' name='images' className="form__input" onChange={e => onFileChange(e)} multiple />
                </div>
                <input type="submit" value='Create' className='button--tertiary' />
            </form>
        </div>
    )
}

export default connect(null, { createPost })(PostForm);