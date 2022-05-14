import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import listReducer from '../features/lists/listSlice';
import todoReducer from '../features/todos/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    todos: todoReducer,
  },
});

export default store;
