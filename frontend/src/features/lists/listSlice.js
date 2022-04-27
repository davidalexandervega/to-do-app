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
        const token = thunkAPI.getState().auth.user.token;
        return await listService.createList(listData, token);
    } catch (error) {
        // check if any errors, and using the message as the payload if so:
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// in order to pass in only thunkAPI, _ must be set as the first argument:
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
        // in this slice the entire state may be reset to the original,
        // whereas in authSlice.js the user must be persisted if authenticated:
        reset: (state) => initialState
    },
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
                // to reflect the edited change so it immediately appears
                // in the UI without reloading:
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
                // the deleted to-do item is filtered out so the UI
                // is immediately updated without reloading:
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