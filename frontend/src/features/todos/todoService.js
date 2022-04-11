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

const todoService = {
    createTodo
};

export default todoService;