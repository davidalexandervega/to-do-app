import React from 'react';
import { useState, useEffect } from 'react';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password, } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // this refers to the form control as e.target,
            // as each has a 'name' and 'value' property:
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    };

    return (
        <div className='loginPage'>
            <section className='heading'>
                <div>login</div>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <label for='email'>email </label>
                    <input type='text' className='formControl' id='email' 
                    name='email' value={email} onChange={onChange}/>

                    <label for='password'>password </label>
                    <input type='password' className='formControl' id='password' 
                    name='password' value={password} onChange={onChange}/>

                    <button type='submit' className='submitForm'>submit</button>
                </form>
            </section>
        </div>
    )
}

export default Login;