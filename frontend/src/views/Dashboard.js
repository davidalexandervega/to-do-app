import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from "../components/Sidebar";
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';

import { fetchLists, reset as resetLists } from '../features/lists/listSlice';
import { fetchTodos, reset as resetTodos } from '../features/todos/todoSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // may be notable later that this is a destructuring of state.auth.user,
    // and is equivalent to user = useSelector((state) => state.auth.user).
    const {user} = useSelector((state) => state.auth);

    const {todos, isError, message} = useSelector((state) => state.todos);

    // the state holds the array of to-do items that are displayed based
    // on the current view, which is actioned via the sidebar:
    const [viewItems, setView] =  useState([]);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        } else {
            // so the dashboard component here is listening for any firings
            // of the listed functions, and is updating the state from the global
            // store every time. this means any component that uses useSelector
            // to access the global state benefits by being updated with
            // the new state.
            dispatch(fetchLists());
            dispatch(fetchTodos());
        }

        if (isError) {
            console.log(message)
        }

        // in order to perform an action when a component unmounts,
        // you use a return statement:
        return () => {
            dispatch(resetLists());
            dispatch(resetTodos());
        }
    }, [user, navigate, isError, message, dispatch]);

    return (
        <div id='page'>
            <Sidebar setView={setView} todos={todos}/>
            <div className='dashboard'>
                <NewTodo />
                {viewItems.length > 0 ? (
                    <div className="todos">
                        {viewItems.map((todo) => (<Todo key={todo._id} todo={todo}/>))}
                    </div>
                ) : (<div>:/ no to-dos</div>)}
            </div>
        </div>
    )
}

export default Dashboard;