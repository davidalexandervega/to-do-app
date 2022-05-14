// tests in redux will not run without a provider,
// & the way to solve that is by wrapping tested components
// in a mock environment by overriding jest's render function
// with a custom render:
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// importing the store's reducers to pass into the mock provider:
import authReducer from './features/auth/authSlice';
import listReducer from './features/lists/listSlice';
import todoReducer from './features/todos/todoSlice';

function render(
  ui, // the component being rendered
  {
    preloadedState,
    store = configureStore({
      reducer: { auth: authReducer, lists: listReducer, todos: todoReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything:
export * from '@testing-library/react';
// override render method:
export { render };
