import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className='header'>
            <div className='dashboardLink'>
                <Link to='/'>dashboard</Link>
            </div>
            <ul className='headerLinks'>
                {user ? (<li><div className='logout' onClick={onLogout}>logout</div></li>) : 
                (<>
                    <li>
                        <Link to='/login'>login</Link>
                    </li>
                    <li>
                        <Link to='/register'>register</Link>
                    </li>
                </>)}
            </ul>
        </header>
    )
}

export default Header;