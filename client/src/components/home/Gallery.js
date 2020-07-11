import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllImages } from '../../actions/blog';
import { Link } from 'react-router-dom';

const Gallery = ({ getAllImages, images, limit = 9999 }) => {
    useEffect(() => {
        getAllImages();
    }, [getAllImages])

    return (
        <section className="section gallery">
            <h1 className="heading-primary center">Gallery</h1>
            <div className="gallery__container">
                {
                    images && images.slice(0, limit).map(image => 
                        <div className="gallery__item">
                            <img src={`http://localhost:8000/uploads/blogs/${image}`} />
                        </div>
                    )
                }
            </div>
            {
                images.slice(0, limit).length < 12 && <Link to='/gallery' className='button button--primary button--lg mt'>View More!</Link>
            }
            
        </section>
    )
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    getAllImages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    images: state.blog.gallery,
})

export default connect(mapStateToProps, { getAllImages })(Gallery)
