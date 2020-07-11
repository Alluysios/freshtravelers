import React, { Fragment } from 'react';

const Header = () => {
    return (
        <Fragment>
            <header className='header'>
                <a className="header__logo" href='/'>&hearts; Fresh Travelers &hearts;</a>
                <div className="header__img">
                    <img src='./logo.png' alt="Travel" />
                </div>
            </header>
        </Fragment>
    )
}

export default Header;
