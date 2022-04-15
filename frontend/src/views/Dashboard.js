import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo'
import { fetchTodos, reset } from '../features/todos/todoSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // may be notable later that this is a destructuring of state.auth.user,
    // and is equivalent to user = useSelector((state) => state.auth.user).
    const {user} = useSelector((state) => state.auth);

    const {todos, isError, message} = useSelector((state) => state.todos);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        } else {
            dispatch(fetchTodos());
        }

        if (isError) {
            console.log(message)
        }

        // in order to perform an action when a component unmounts,
        // you use a return statement:
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]);

    return (
        <div className='dashboard'>
            <NewTodo />
            {todos.length > 0 ? (
                <div className="todos">
                    {todos.map((todo) => (<Todo key={todo._id} todo={todo}/>))}
                </div>
            ) : (<div>:/ no to-dos</div>)}
        </div>
    )
}

export default Dashboard;