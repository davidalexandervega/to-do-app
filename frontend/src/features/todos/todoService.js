import axios from 'axios';

// this includes the proxy definied in package.json
// otherwise you would need the full path to the server-side:
const API_URL = '/api/todos/';

const createTodo = async (todoData, token) => {
  // set the correct header with the token to access the protected route:
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, todoData, config);

  return response.data;
};

const fetchTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const editTodo = async (todoData, token) => {
  let { title, notes, dueDate, list, id } = todoData;

  // due to the type constraints in todoModel.js, set the
  // req.body.list to null if it contains an empty string:
  if (list === '') {
    list = null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + id,
    {
      title,
      notes,
      dueDate,
      list,
    },
    config,
  );

  return response.data;
};

const deleteTodo = async (todoID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + todoID, config);

  return response.data;
};

const todoService = {
  createTodo,
  fetchTodos,
  editTodo,
  deleteTodo,
};

export default todoService;
