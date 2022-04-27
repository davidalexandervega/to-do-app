import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTodo } from '../features/todos/todoSlice';
import { deleteList, editList } from '../features/lists/listSlice';

const DeleteList = (props) => {
  const { list, setList, filter } = props;
  const editRef = useRef();

  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    renameTitle: '',
    deleteTitle: '',
  });

  const { renameTitle, deleteTitle } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (list !== '') {
      editRef.current.style.visibility = 'visible';
      setFormData((prevState) => ({
        ...prevState,
        renameTitle: list.title,
        deleteTitle: '',
      }));
    } else {
      editRef.current.style.visibility = 'hidden';
    }
  }, [list]);

  const cancel = () => {
    setList('');
    editRef.current.style.visibility = 'hidden';
  };

  const confirmEdit = () => {
    const listData = {
      title: renameTitle,
      id: list._id,
    };
    dispatch(editList(listData));
    cancel();
  };

  const confirmDelete = () => {
    // if the deletion form is validated, first all to-do items
    // that refer to the list are deleted, following by the list itself.
    // then the edit form is closed and the list view is set back to 'all':
    if (deleteTitle === list.title) {
      todos.map((todo) => {
        if (todo.list === list._id) {
          dispatch(deleteTodo(todo._id));
        }
        return todos;
      });
      dispatch(deleteList(list._id));
      cancel();
      filter('all');
    }
  };

  return (
    <>
      <div ref={editRef} className="editListContainer">
        <div className="listHeader listForm">
          <div>
            <b>edit list</b>
          </div>
          <span onClick={() => cancel()} className="cancel">
            <svg
              width="16"
              height="16"
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
        </div>
        <div className="renameListHeader">
          <b>new list title</b>:
        </div>
        <form className="listForm">
          <input
            type="text"
            className="formControl"
            id="renListTitle"
            name="renameTitle"
            value={renameTitle}
            onChange={onChange}
            size="10"
          ></input>
          <span onClick={() => confirmEdit()} className="listActions confirm">
            <svg
              width="16"
              height="16"
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
        </form>

        <div className="deleteListHeader">
          to <b>delete,</b> type{' '}
          <i>
            <b>{list.title}</b>
          </i>{' '}
          into the field & click to <b>confirm deletion</b>:
        </div>
        <form className="listForm">
          <input
            type="text"
            className="formControl"
            id="delListTitle"
            name="deleteTitle"
            value={deleteTitle}
            onChange={onChange}
            size="10"
          ></input>
          <span onClick={() => confirmDelete()} className="listActions confirm">
            <svg
              width="16"
              height="16"
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
        </form>
      </div>
    </>
  );
};

export default DeleteList;
