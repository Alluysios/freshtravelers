import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../Alert';

const Register = ({ register, setAlert }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const { firstname, lastname, email, password, passwordConfirm } = formData;
    

    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const onFormSubmit = e => {
        e.preventDefault();

        if(formData.password !== formData.passwordConfirm) {
            setAlert('Passsword do not match');
        } else {
            register({firstname, lastname, email, password, passwordConfirm});
        }
        
    }

    return (
        <div className="container">
            <h3 className="heading-primary">Join our adventure!</h3>
            <Alert />
            <form action="#" className='form form--signup' onSubmit={e => onFormSubmit(e)}>
                <div className="form__group">
                    <label className="form__label">First Name</label>
                    <input type='text' name='firstname' id='firstname' className="form__input" placeholder='Ryan' onChange={e=> onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">Last Name</label>
                    <input type='text' name='lastname' id='lastname' className="form__input" placeholder="Smith" onChange={e=> onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">email</label>
                    <input type='email' name='email' id='email' className="form__input" placeholder="ryan@yahoo.com" onChange={e=> onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">password</label>
                    <input type='password' name='password' id='password' className="form__input" placeholder="******" onChange={e=> onInputChange(e)} />
                </div>
                <div className="form__group">
                    <label className="form__label">confirm password</label>
                    <input type='password' name='passwordConfirm' id='passwordConfirm' className="form__input" placeholder="******" onChange={e=> onInputChange(e)} />
                </div>
                <input type="submit" value='Sign Up' className='button--tertiary' />
            </form>
        </div>
    )
}

export default connect(null, { register, setAlert })(Register);
