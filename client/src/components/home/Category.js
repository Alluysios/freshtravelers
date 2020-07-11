import React from 'react'
import { Link } from 'react-router-dom';

const Category = () => {
    return (
        <section className="section destination">

            <div className="destination__container">
                <div className="destination__card">
                    <Link to="/" className='destination__link'>
                        <img src="/img/asia.jpg" alt="" className='destination__img' />
                    </Link>
                    <h2 className='destination__title'>Asia</h2>
                </div>
                <div className="destination__card">
                    <Link to="/" className='destination__link'>
                        <img src="/img/Europe.jpg" alt="" className='destination__img' />
                    </Link>
                    
                    <h2 className='destination__title'>Europe</h2>
                </div>
                <div className="destination__card">
                    <Link to="/" className='destination__link'>
                        <img src="/img/NA.jpg" alt="" className='destination__img' />
                    </Link>
                    <h2 className='destination__title'>NA</h2>
                </div>
            </div>
        </section>
    )
}

export default Category
