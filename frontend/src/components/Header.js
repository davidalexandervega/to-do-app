import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className='header'>
            <div className='dashboardLink'>
                <Link to='/'>dashboard</Link>
            </div>
            <ul className='headerLinks'>
                <li>
                    <Link to='/login'>login</Link>
                </li>
                <li>
                    <Link to='/register'>register</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;