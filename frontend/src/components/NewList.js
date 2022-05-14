import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createList } from '../features/lists/listSlice';

const NewList = () => {
  const [formData, setFormData] = useState({
    title: '',
  });

  const dispatch = useDispatch();

  const { title } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const listData = {
      title,
    };

    dispatch(createList(listData));

    setFormData((prevState) => ({
      ...prevState,
      title: '',
    }));
  };

  return (
    <div className="newListContainer">
      <div className="listHeader">new list</div>
      <form className="listForm">
        <input
          type="text"
          className="formControl"
          id="listTitle"
          name="title"
          value={title}
          onChange={onChange}
          size="10"
          maxLength={12}
        />

        <span onClick={() => onSubmit()} className="new listActions">
          <svg
            width="16"
            height="16"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 12H12M16 12H12M12 12V8M12 12V16"
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
  );
};

export default NewList;
