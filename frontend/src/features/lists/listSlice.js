import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import listService from './listService';

const initialState = {
    lists: [],
    isError: false,
    isSuccess: false,
    message: ''
};

export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
    try {
        // the thunkAPI object also contains a getState() method that we can
        // use to retrieve any state from the global store. we need the token
        // since the create list route is protected:
        const token = thunkAPI.getState().auth.user.token;
        return await listService.createList(listData, token);
    } catch (error) {
        // checking if any errors, and using the message as the payload
        // if there is one:
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// note that in order to pass in just the thunkAPI, we need to pass an underscore
// in first as an empty argument:
export const fetchLists = createAsyncThunk('/lists/fetchAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.fetchLists(token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const editList = createAsyncThunk('lists/edit', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.editList(listData, token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteList = createAsyncThunk('lists/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.deleteList(id, token);
    } catch (error) {
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const listSlice = createSlice({
    name: 'list',
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
            .addCase(createList.fulfilled, (state, action) => {
                state.isSuccess = true
                state.lists.push(action.payload)
            })
            .addCase(createList.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.isSuccess = true
                state.lists = action.payload
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(editList.fulfilled, (state, action) => {
                state.isSuccess = true
                // here we reflect the change so it's immediately in the UI
                // without reloading:
                state.lists = state.lists.map(
                    (list) => list._id === action.payload._id ? {
                        ...list,
                        title: action.payload.title
                    } : list
                )
            })
            .addCase(editList.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.isSuccess = true
                // here we filter out the list we deleted so it's reflected
                // immediately in the UI:
                state.lists = state.lists.filter(
                    (list) => list._id !== action.payload.id
                )
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
});

export const {reset} = listSlice.actions;
export default listSlice.reducer;