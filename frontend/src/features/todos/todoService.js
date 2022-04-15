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

    const {title, notes, dueDate, id} = todoData

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(API_URL + id, {
        title,
        notes,
        dueDate
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