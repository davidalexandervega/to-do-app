import axios from 'axios';

// this includes the proxy, otherwise you would need the full path
// to the server-side:
const API_URL = '/api/lists/';

// handling the http request:
const createList = async (listData, token) => {

    // setting the right header with the token in it to access
    // the protected route:
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, listData, config);

    return response.data;
};

const fetchLists = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

const editList = async (listData, token) => {

    const {title, id} = listData

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(API_URL + id, {
        title,
    }, config);

    return response.data;
};

const deleteList = async (listID, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + listID, config);

    return response.data;
};

const listService = {
    createList,
    fetchLists,
    editList,
    deleteList
};

export default listService;