import axios from 'axios';

// this includes the proxy, otherwise you would need the full path
// to the server-side:
const API_URL = '/api/todos/';

// handling the http request:
const createTodo = async (todoData, token) => {

    // setting the right header with the token in it to access
    // the protected route:
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, todoData, config);

    return response.data;
};

const fetchTodos = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

const editTodo = async (todoData, token) => {

    let {title, notes, dueDate, list, id} = todoData;

    // due to the type constraints in the todoModel, we set the default
    // value in the schema to null, and then make sure we set it back
    // to null in the request body if the edit form returns an empty string:
    if (list === '') {
        list = null;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(API_URL + id, {
        title,
        notes,
        dueDate,
        list
    }, config);

    return response.data;
};

const deleteTodo = async (todoID, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + todoID, config);

    return response.data;
};

const todoService = {
    createTodo,
    fetchTodos,
    editTodo,
    deleteTodo
};

export default todoService;