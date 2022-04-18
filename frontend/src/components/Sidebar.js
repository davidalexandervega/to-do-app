import React from 'react';
import NewList from './NewList';
import { useSelector } from 'react-redux';

const Sidebar = () => {

    const lists = useSelector((state) => state.lists.lists);

    return (
        <div className='sidebar'>
            sidebar
            {lists.length > 0 ? (
                <div className="todos">
                    {lists.map((list) => (<div key={list._id}>{list.title}</div>))}
                </div>
            ) : (<></>)}
            <NewList />
        </div>
    )
}

export default Sidebar;