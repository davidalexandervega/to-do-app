import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state, action) => {
	return state;
};

let store = createStore(reducer);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);