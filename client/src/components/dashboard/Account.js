import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateAccount } from '../../actions/auth';

const Account = ({ auth: { user }, updateAccount }) => {
    const [accountFormData, accountSetFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        image: ''
    });

    const onInputChange = e => {
        accountSetFormData({...accountFormData, [e.target.name]: e.target.value })
    }

    const onFileChange = e => {
        accountSetFormData({ ...accountFormData, [e.target.name]: e.target.files[0]})
    }

    const onFormSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('firstname', accountFormData.firstname)
        formData.append('lastname', accountFormData.lastname)
        formData.append('email', accountFormData.email)
        formData.append('image', accountFormData.image)
        updateAccount(formData);
    }

    return (
        <div className="dashboard">
            <Link to="/" className='button button--tertiary'> &larr; Home</Link>
            {user.role === 'admin' && (
                <Fragment>
                    <Link to="/account" className='button button--tertiary ml'>
                        Account
                    </Link>
                    <Link to="/admin" className='button button--tertiary ml'>
                        Admin
                    </Link>
                </Fragment>
            )}
            <h1>My Account</h1>
            <div className="dashboard__account">
                <form action="#" className='form form--account' onSubmit={onFormSubmit}>
                    <div className="form__group">
                        <label className="form__label">First Name</label>
                        <input type='text' name='firstname' id='firstname' className="form__input" onChange={e => onInputChange(e)} placeholder={user.firstname} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">lastname</label>
                        <input type='text' name='lastname' id='lastname' className="form__input" onChange={e => onInputChange(e)} placeholder={user.lastname} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">email</label>
                        <input type='email' name='email' id='email' className="form__input" onChange={e => onInputChange(e)} placeholder={user.email} />
                    </div>
                    <div className="form__group">
                        <img src="img/allu.jpg" alt="" className='form__img' />
                        <input type='file' name='image' id='image' onChange={e => onFileChange(e)} className="form__input" />
                    </div>
                    <input type="submit" value='Update Account' className='button--tertiary' />
                </form>
            </div>
            <div className="divider"></div>
            <h1>Change Password</h1>
            <div className="dashboard__password">
                <form action="#" className='form form--account'>
                    <div className="form__group">
                        <label className="form__label">current password</label>
                        <input type='password' name='currentPassword' id='password' className="form__input" placeholder="******" />
                    </div>
                    <div className="form__group">
                        <label className="form__label">password</label>
                        <input type='password' name='password' id='password' className="form__input" placeholder="******" />
                    </div>
                    <div className="form__group">
                        <label className="form__label">confirm password</label>
                        <input type='password' name='passwordConfirm' id='passwordConfirm' className="form__input" placeholder="******" />
                    </div>
                    <input type="submit" value='Change Password' className='button--tertiary' />
                </form>
            </div>
        </div>
    )
}

Account.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updateAccount })(Account);