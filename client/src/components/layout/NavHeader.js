import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../logo.png';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const renderNav = (auth, logout) => {
    if(auth.isAuthenticated) {
        return <ul className="nav__menu">
            <li className="nav__item"><Link to="/account" className="nav__link">Account</Link></li>
            <li className="nav__item"><Link to="/" className="nav__link" onClick={logout}>Logout</Link></li>
        </ul>
    } else {
        return <ul className="nav__menu">
            <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
            <li className="nav__item"><Link to="/signup" className="nav__link">Sign Up</Link></li>
        </ul>
    }
}

const Navbar = ({ auth, logout }) => {
    return (
        <Fragment>
            <nav className="nav">
                <div className="collapse">
                    <ul className="nav__menu">
                        <li className="nav__item"><Link to="#!" className="nav__link">Destinations</Link></li>
                        <li className="nav__item"><Link to="/blogs" className="nav__link">Blog</Link></li>
                        <li className="nav__item"><Link to="/food" className="nav__link">Food</Link></li>
                        <li className="nav__item"><Link to="/gallery" className="nav__link">Gallery</Link></li>
                    </ul>
                </div>

                <div className="collapse">
                    { renderNav(auth, logout) }
                </div>
            </nav>
            <header className='header'>
                <Link className="header__logo" to='/'>
                    &hearts; Fresh Travelers &hearts;
                    <div className="header__img">
                            <img src={logo} alt="Travel" />
                    </div>
                </Link>
            </header>
                
        </Fragment>
        

        
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);
