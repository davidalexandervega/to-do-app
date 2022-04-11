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

    // retrieving from the global state:
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth);

    // setting up the useEffect to watch for when any of the variables in
    // the array change, and actions to perform based on those changes:
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
            // as each has a 'name' and 'value' property:
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

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
            <section className='heading'>
                <div>registration</div>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='username'>username </label>
                    <input type='text' className='formControl' id='username' 
                    name='username' value={username} onChange={onChange}/>

                    <label htmlFor='email'>email </label>
                    <input type='text' className='formControl' id='email' 
                    name='email' value={email} onChange={onChange}/>

                    <label htmlFor='password'>password </label>
                    <input type='password' className='formControl' id='password' 
                    name='password' value={password} onChange={onChange}/>

                    <label htmlFor='confPassword'>confirm password </label>
                    <input type='password' className='formControl' id='confPassword' 
                    name='confPassword' value={confPassword} onChange={onChange}/>

                    <button type='submit' className='submitForm'>submit</button>
                </form>
            </section>
        </div>
    )
}

export default Register;