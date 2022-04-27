import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {register, reset} from '../features/auth/authSlice';

const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: ''
    });

    const { username, email, password, confPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        
        if (isError) {
            console.log(message);
        }

        if (isSuccess) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // this refers to the form control as e.target,
            // as each has a 'name' and 'value' attribute:
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = () => {
        if (password !== confPassword) {
            console.log('passwords do not match');
        } else {
            const userData = {
                username,
                email,
                password
            }
            dispatch(register(userData));
        }
    };

    return (
        <div className='registerPage'>
            <div className='registerContainer'>
                    <div className='formHeader'>registration</div>

                    <form className='authForm'>
                        <div className="formItem">
                            <label htmlFor='username'>username </label>
                            <input type='text' className='formControl' id='username' 
                            name='username' value={username} onChange={onChange} size='25'/>
                        </div>

                        <div className="formItem">
                            <label htmlFor='email'>email </label>
                            <input type='text' className='formControl' id='email' 
                            name='email' value={email} onChange={onChange} size='29'/>
                        </div>

                        <div className="formItem">
                            <label htmlFor='password'>password </label>
                            <input type='password' className='formControl' id='password' 
                            name='password' value={password} onChange={onChange} size='25'/>
                        </div>

                        <div className="formItem">
                            <label htmlFor='confPassword'>confirm password </label>
                            <input type='password' className='formControl' id='confPassword' 
                            name='confPassword' value={confPassword} onChange={onChange} size='16'/>
                        </div>
                    </form>
                    <span onClick={() => onSubmit()} className='confirm'>
                        <svg width="16" height="16" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
            </div>
        </div>
    )
}

export default Register;