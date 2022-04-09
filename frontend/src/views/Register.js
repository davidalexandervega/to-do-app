import React from 'react';
import { useState, useEffect } from 'react';

const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: ''
    });

    const { username, email, password, confPassword } = formData;

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
        <div className='registerPage'>
            <section className='heading'>
                <div>registration</div>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <label for='username'>username </label>
                    <input type='text' className='formControl' id='username' 
                    name='username' value={username} onChange={onChange}/>

                    <label for='email'>email </label>
                    <input type='text' className='formControl' id='email' 
                    name='email' value={email} onChange={onChange}/>

                    <label for='password'>password </label>
                    <input type='password' className='formControl' id='password' 
                    name='password' value={password} onChange={onChange}/>

                    <label for='confPassword'>confirm password </label>
                    <input type='password' className='formControl' id='confPassword' 
                    name='confPassword' value={confPassword} onChange={onChange}/>

                    <button type='submit' className='submitForm'>submit</button>
                </form>
            </section>
        </div>
    )
}

export default Register;