import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import todoService from './todoService';

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    message: ''
};

export const createTodo = createAsyncThunk('todos/create', async (todoData, thunkAPI) => {
    try {
        // the thunkAPI object also contains a getState() method that we can
        // use to retrieve any state from the global store. we need the token
        // since the create to-do route is protected:
        const token = thunkAPI.getState().auth.user.token;
        return await todoService.createTodo(todoData, token);
    } catch (error) {
        // checking if any errors, and using the message as the payload
        // if there is one:
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // in this slice we can just reset the entire state back to initial,
        // whereas in auth we need to persist the user if they're logged in.
        reset: (state) => initialState
    },
    // as described in authSlice.js, the extra reducers hook up our global state
    // to watch for the results of the functions in our slice. we then pass the
    // state to our components, which respond with handler logic as usual:
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isSuccess = true
                state.todos.push(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
});

export const reset = todoSlice.actions;
export default todoSlice.reducer;