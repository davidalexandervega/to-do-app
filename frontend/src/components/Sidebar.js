import React, { useEffect, useRef } from 'react';
import NewList from './NewList';
import { useSelector } from 'react-redux';

import './Sidebar.scss';

const Sidebar = (props) => {

    const {setView, todos} = props;

    const {lists} = useSelector((state) => state.lists);

    // this reference records the view last selected, starting with 'all'
    const currentView = useRef('all');

    // when the to-dos are loaded in at first this hook renders them in
    // and selects the 'all' tab. it also listens for any edits to any of the
    // to-dos and calls filter again (which sets a state thus causing a re-render),
    // in case the edit involves changing the list a to-do is on:
    useEffect(() => {
        filter(currentView.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos]);

    const filter = (view) => {
        currentView.current = view;

        let filtered = [];
        if (view === 'all') {
            setView(todos);
        } else {
            todos.map((todo) => `${todo.list}` === view ? filtered.push(todo) : '');
            setView(filtered);
        }
    }

    return (
        <div className='sidebar'>
            <span onClick={() => filter('all')} className='allList'>{currentView.current === 'all' ? `all to-dos •` : 'all to-dos'}</span>
            {lists.length > 0 ? (
                <div className="lists">
                    {lists.map((list, index) => 
                    (<span key={list._id} onClick={() => filter(`${list._id}`)} className='list'>{currentView.current === `${list._id}` ? `${list.title} •` : list.title}</span>))}
                </div>
            ) : (<></>)}
            <NewList />
        </div>
    )
}

export default Sidebar;