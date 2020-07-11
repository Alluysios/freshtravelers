import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Alert from '../Alert';

const Login = ({ login, auth }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onInputChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onFormSubmit = e => {
        e.preventDefault();

        login({email, password});
    }

    return (
        <Fragment>
            {
                !auth.isAuthenticated ? <Fragment>
                    <div className="container">
                        <h3 className="heading-primary">Join to our adventure!</h3>
                        <Alert />
                        <form action="#" className='form form--login' onSubmit={onFormSubmit}>
                            <div className="form__group">
                                <label className="form__label">email</label>
                                <input type='text' name='email' id='email' className="form__input" onChange={e => onInputChange(e)} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">password</label>
                                <input type='password' name='password' id='password' className="form__input" onChange={e => onInputChange(e)} />
                            </div>
                            <input type="submit" value='Login' className='button button--secondary' />
                        </form>
                    </div>
                </Fragment> :
                <Redirect to='/' />
            }
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login);
