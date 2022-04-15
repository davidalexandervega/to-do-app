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
});

// note that in order to pass in just the thunkAPI, we need to pass an underscore
// in first as an empty argument:
export const fetchTodos = createAsyncThunk('/todos/fetchAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await todoService.fetchTodos(token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const editTodo = createAsyncThunk('todos/edit', async (todoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await todoService.editTodo(todoData, token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await todoService.deleteTodo(id, token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // in this slice we can just reset the entire state back to initial,
        // whereas in authSlice.js we need to persist the user if they're logged in.
        reset: (state) => initialState
    },
    // as described in authSlice.js, the extra reducers hook up our global state
    // to watch for the results of the functions in our slice. we then pass the
    // state to our components, which respond with handler logic as usual.
    // this way changes are shown *as they happen* without needing to reload
    // the page, aka the point of using react.
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
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isSuccess = true
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.isSuccess = true
                // here we reflect the change so it's immediately in the UI
                // without reloading:
                state.todos = state.todos.map(
                    (todo) => todo._id === action.payload._id ? {
                        ...todo,
                        title: action.payload.title,
                        notes: action.payload.notes,
                        dueDate: action.payload.dueDate
                    } : todo
                )
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isSuccess = true
                // here we filter out the todo we deleted so it's reflected
                // immediately in the UI:
                state.todos = state.todos.filter(
                    (todo) => todo._id !== action.payload.id
                )
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
});

export const {reset} = todoSlice.actions;
export default todoSlice.reducer;