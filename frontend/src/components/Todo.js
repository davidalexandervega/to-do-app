import React from 'react';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, deleteTodo } from '../features/todos/todoSlice';

import './Todo.scss';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const lists = useSelector((state) => state.lists.lists);

  const [editMode, setEditMode] = useState(false);

  // this way the component itself is maintained but renders different
  // jsx based on the selected mode:
  const toggleEdit = () => {
    setEditMode(true);
  };

  const [formData, setFormData] = useState({
    title: todo.title,
    notes: todo.notes,
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
    list: todo.list ? todo.list : '',
  });

  const { title, notes, dueDate, list } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const cancelEdit = () => {
    errorRef.current.innerHTML = '';
    setFormData((prevState) => ({
      ...prevState,
      title: todo.title,
      notes: todo.notes,
      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
      list: todo.list,
    }));

    setEditMode(false);
  };

  const confirmEdit = () => {
    const todoData = {
      title,
      notes,
      dueDate,
      list,
      id: todo._id,
    };

    if (title !== '') {
      errorRef.current.innerHTML = '';
      dispatch(editTodo(todoData), setEditMode(false));
    } else {
      errorRef.current.innerHTML = 'to-dos require at least a title';
    }
  };

  const errorRef = useRef();

  // format the date from the string of a Date object
  // to MM-DD-YYYY for display:
  const formatDate = (dueDate) => {
    let date = dueDate.split('T')[0];
    let dateParts = date.split('-');
    let formatted = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
    return formatted;
  };

  return (
    <>
      {editMode ? (
        <div className="todo">
          <div className="editTodoForm">
            <label htmlFor="title">
              <b>title</b>{' '}
            </label>
            <input
              type="text"
              className="formControl"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
            />

            <label htmlFor="notes">
              <b>notes</b>{' '}
            </label>
            <input
              type="text"
              className="formControl"
              id="notes"
              name="notes"
              value={notes}
              onChange={onChange}
            />

            <label htmlFor="dueDate">
              <b>due date</b>{' '}
            </label>
            <input
              type="date"
              className="formControl"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={onChange}
            />

            {lists.length > 0 ? (
              <>
                <label htmlFor="list">
                  <b>list</b>{' '}
                </label>
                <select id="list" name="list" onChange={onChange} value={list}>
                  <option value={''}>-</option>
                  {lists.map((list) => (
                    <option key={list._id} value={list._id}>
                      {list.title}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="todoActions">
            <div className="error" ref={errorRef}></div>
            <span onClick={() => cancelEdit()} className="cancel">
              <svg
                width="17"
                height="17"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10.625H14.2C14.2 10.625 14.2 10.625 14.2 10.625C14.2 10.625 17 10.625 17 13.625C17 17 14.2 17 14.2 17H13.4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 14L7 10.625L10.5 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span onClick={() => confirmEdit()} className="confirm">
              <svg
                width="17"
                height="17"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12.5L10 15.5L17 8.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      ) : (
        <div className="todo">
          <div className="todoHeader">
            <div className="todoTitle">
              <b>{todo.title}</b>
            </div>

            <div className="todoDate">
              due{' '}
              <i>
                {todo.dueDate ? (
                  <>
                    {new Date(todo.dueDate) < new Date() ? (
                      <span className="late">{formatDate(todo.dueDate)}</span>
                    ) : (
                      formatDate(todo.dueDate)
                    )}
                  </>
                ) : (
                  'whenever'
                )}
              </i>
            </div>
          </div>
          <div className="todoNotes">{todo.notes}</div>
          <div className="todoActions">
            <span onClick={() => toggleEdit()} className="edit">
              <svg
                width="17"
                height="17"
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
            <span onClick={() => dispatch(deleteTodo(todo._id))} className="delete">
              <svg
                width="17"
                height="17"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
