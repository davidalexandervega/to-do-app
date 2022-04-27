import React, { useEffect, useRef } from 'react';
import NewList from './NewList';
import EditList from './EditList';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './Sidebar.scss';

const Sidebar = (props) => {
  const { setView, sort, sortView, todos } = props;

  const { lists } = useSelector((state) => state.lists);

  // record the view last selected, starting with 'all':
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

    // to provision the filtered list of to-do items via setView,
    // then sort them using whatever the previous sort setting is:
    if (view === 'all') {
      setView(todos);
      sort(sortView.current, todos);
    } else {
      todos.map((todo) => (`${todo.list}` === view ? filtered.push(todo) : ''));
      setView(filtered);
      sort(sortView.current, filtered);
    }

    // close the edit panel if the list being switched to view is not
    // already the one being edited:
    if (view !== `${toEdit._id}`) {
      setToEdit('');
    }
  };

  const [toEdit, setToEdit] = useState('');
  // the list is passed to the sidebar state, in turn passed down to the EditList component,
  // setting its view to visible and arming it to dispatch from listSlice.js:
  const onEdit = (list) => {
    setToEdit(list);
  };

  return (
    <div className="sidebar">
      <div className="innerSidebar">
        <span onClick={() => filter('all')} className="allList link">
          {currentView.current === 'all' ? `all to-dos •` : 'all to-dos'}
        </span>
        {lists.length > 0 ? (
          <div className="lists">
            {lists.map((list) => (
              <div className="list" key={list._id}>
                <span onClick={() => filter(`${list._id}`)} className="link">
                  {currentView.current === `${list._id}` ? `${list.title} •` : list.title}
                </span>
                <span onClick={() => onEdit(list)} className="edit editList">
                  <svg
                    width="12"
                    height="12"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 21L12 21H21"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.2218 5.82839L15.0503 2.99996L20 7.94971L17.1716 10.7781M12.2218 5.82839L6.61522 11.435C6.42769 11.6225 6.32233 11.8769 6.32233 12.1421L6.32233 16.6776L10.8579 16.6776C11.1231 16.6776 11.3774 16.5723 11.565 16.3847L17.1716 10.7781M12.2218 5.82839L17.1716 10.7781"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <NewList />
        <EditList list={toEdit} setList={setToEdit} filter={filter} />
      </div>
    </div>
  );
};

export default Sidebar;
