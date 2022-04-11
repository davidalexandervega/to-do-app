import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// so in redux toolkit, you can define your state, actions, and reducers
// all in a 'slice' of related state/action/reducer rather than all separately.
// in that sense, it's a 'slice' of the global store and its functionality.

// if user is in localStorage, load them in to the global store.
// we also need to convert the localStorage string into actual json:
const user = JSON.parse(localStorage.getItem('user'));

// so if the user is here, it'll be in the slice of the global store
// in a state called 'auth' (see below at createSlice). then when we load
// the state into the component, it'll be there and the component
// will handle the user being there as desired.
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    message: ''
};

// so we need to create the function that actually sends the data from
// the form as an http request and handles the error. since it's an async
// operation, we need createAsyncThunk, which takes and action and a callback
// that returns a promise:
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        // checking if any errors, and using the message as the payload
        // if there is one:
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        // checking if any errors, and using the message as the payload
        // if there is one:
        const message =  (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // so 'reset' is the action and what follows is the reducer:
        // you can also set (state, payload) => {} and call in a specific
        // argument to the reducer.
        reset: (state) => {
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        // so this hooks up the auth functions to our global state.
        // 'action.payload' refers to the fact that the functions
        // return a value in the relevant case, which is the 'payload'.
        // this way, the app is listening for changes as the result
        // of our functions and setting the appropriate state, with the
        // react components handling the resultant logic.
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
});

// you need to export the actions first so you can call them throughout the app:
export const {reset} = authSlice.actions

// now export the slice:
export default authSlice.reducer