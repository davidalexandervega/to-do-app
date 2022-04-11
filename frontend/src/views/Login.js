import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {login, reset} from '../features/auth/authSlice';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password, } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // retrieving from the global state:
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
            // as each has a 'name' and 'value' property:
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    };

    return (
        <div className='loginPage'>
            <section className='heading'>
                <div>login</div>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='email'>email </label>
                    <input type='text' className='formControl' id='email' 
                    name='email' value={email} onChange={onChange}/>

                    <label htmlFor='password'>password </label>
                    <input type='password' className='formControl' id='password' 
                    name='password' value={password} onChange={onChange}/>

                    <button type='submit' className='submitForm'>submit</button>
                </form>
            </section>
        </div>
    )
}

export default Login;