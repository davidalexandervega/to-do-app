import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoService';

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  message: '',
};

export const createTodo = createAsyncThunk('todos/create', async (todoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.createTodo(todoData, token);
  } catch (error) {
    // check if any errors, and using the message as the payload if so:
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// in order to pass in only thunkAPI, _ must be set as the first argument:
export const fetchTodos = createAsyncThunk('/todos/fetchAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.fetchTodos(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editTodo = createAsyncThunk('todos/edit', async (todoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.editTodo(todoData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.deleteTodo(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // in this slice the entire state may be reset to the original,
    // whereas in authSlice.js the user must be persisted if authenticated:
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isSuccess = true;
        // to reflect the edited change so it immediately appears
        // in the UI without reloading:
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id
            ? {
                ...todo,
                title: action.payload.title,
                notes: action.payload.notes,
                dueDate: action.payload.dueDate,
                list: action.payload.list,
              }
            : todo,
        );
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isSuccess = true;
        // the deleted to-do item is filtered out so the UI
        // is immediately updated without reloading:
        state.todos = state.todos.filter((todo) => todo._id !== action.payload.id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
