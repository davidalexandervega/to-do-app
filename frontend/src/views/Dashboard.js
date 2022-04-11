import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NewTodo from '../components/NewTodo';

const Dashboard = () => {
    const navigate = useNavigate();

    // may be notable later that this is a destructuring of state.auth.user,
    // and is equivalent to user = useSelector((state) => state.auth.user).
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className='dashboard'>
            <NewTodo />
        </div>
    )
}

export default Dashboard;