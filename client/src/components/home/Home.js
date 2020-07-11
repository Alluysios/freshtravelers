import React, { Fragment } from 'react'

import Category from './Category';
import About from './About';
import Blog from './Blog';
import Gallery from './Gallery';

const Home = () => {
    return (
        <Fragment>
            <Category />
            <About />
            <Blog />
            <Gallery limit={12} />
        </Fragment>
    )
}

export default Home
