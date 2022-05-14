import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar';
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';

import { fetchLists, reset as resetLists } from '../features/lists/listSlice';
import { fetchTodos, reset as resetTodos } from '../features/todos/todoSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { todos, isError, message } = useSelector((state) => state.todos);

  // to hold the array of to-do items that are displayed based
  // on the current list view, which is actioned via the sidebar:
  const [viewItems, setView] = useState([]);

  // to hold the array viewItems and arrange them for display
  // based on the selected sort view:
  const [sortItems, setSort] = useState([]);
  let sortView = useRef('created-increasing');

  const sort = (setting, viewItems) => {
    if (setting === 'created-increasing') {
      sortView.current = 'created-increasing';
      setSort([...viewItems]);
    }
    if (setting === 'created-decreasing') {
      sortView.current = 'created-decreasing';
      let reverse = [...viewItems];
      setSort(reverse.reverse());
    }

    // if there's no due date set for a to-do item, the sorting method places it at
    // the front of the list if viewing by increasing due date. this isn't really desirable,
    // since 'due whenever' should really mean it goes at the end of the list.
    // for this reason, dueDate is arbitrarily set 2222-12-31 for any to-dos with
    // no due date for the purposes of sorting:
    if (setting === 'dueDate-increasing') {
      sortView.current = 'dueDate-increasing';
      let byDate = [...viewItems];
      byDate.sort(
        (a, b) =>
          (a.dueDate ? new Date(a.dueDate) : new Date('2222-12-31')) -
          (b.dueDate ? new Date(b.dueDate) : new Date('2222-12-31')),
      );
      setSort(byDate);
    }
    if (setting === 'dueDate-decreasing') {
      sortView.current = 'dueDate-decreasing';
      let byDate = [...viewItems];
      byDate.sort(
        (a, b) =>
          (b.dueDate ? new Date(b.dueDate) : new Date('2222-12-31')) -
          (a.dueDate ? new Date(a.dueDate) : new Date('2222-12-31')),
      );
      setSort(byDate);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchLists());
      dispatch(fetchTodos());
    }

    if (isError) {
      console.log(message);
    }

    // reset the global state upon unmount:
    return () => {
      dispatch(resetLists());
      dispatch(resetTodos());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div id="page">
      <Sidebar setView={setView} sort={sort} sortView={sortView} todos={todos} />
      <div className="dashboard">
        <NewTodo />
        <div className="sortContainer">
          <div>sort:</div>
          {sortView.current.includes('created') ? (
            <>
              {sortView.current === 'created-increasing' ? (
                <div className="sortLink" onClick={() => sort('created-decreasing', viewItems)}>
                  <b>created (old - new)</b>
                </div>
              ) : (
                <div className="sortLink" onClick={() => sort('created-increasing', viewItems)}>
                  <b>created (new - old)</b>
                </div>
              )}
            </>
          ) : (
            <div className="sortLink" onClick={() => sort('created-increasing', viewItems)}>
              created (old - new)
            </div>
          )}
          {sortView.current.includes('dueDate') ? (
            <>
              {sortView.current === 'dueDate-increasing' ? (
                <div className="sortLink" onClick={() => sort('dueDate-decreasing', viewItems)}>
                  <b>due date (increasing)</b>
                </div>
              ) : (
                <div className="sortLink" onClick={() => sort('dueDate-increasing', viewItems)}>
                  <b>due date (decreasing)</b>
                </div>
              )}
            </>
          ) : (
            <div className="sortLink" onClick={() => sort('dueDate-increasing', viewItems)}>
              due date (increasing)
            </div>
          )}
        </div>
        {sortItems.length > 0 ? (
          <div className="todos">
            {sortItems.map((todo) => (
              <Todo key={todo._id} todo={todo} />
            ))}
          </div>
        ) : (
          <div className="todos">
            <div className="todo">
              <div className="noTodos">no to-dos here yet!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
