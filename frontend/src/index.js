import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

// provider provides the global store's state:
import { Provider } from 'react-redux';
import store from './app/store'

// so redux allows for the existence of a global state in addition to
// the usual states held and passed down components.
// the global state is held in the store.
// the store's state can be changed through components calling actions.
// actions are sent to reducers, which based on the action change the store.
// these are typically held as separate action & reducer files.
// it is important to note that the store can only hold one reducer,
// so typically you combine reducers into what is known as a 'root reducer'
// and then createStore(rootReducer).

// however, with redux toolkit, 'slices' are in play.
// a slice is a file that contains related state, actions, and reducers all in one.
// in that sense, it's a 'slice' of the global store and its functionality.
// redux toolkit also carries the configureStore function, where you simply
// import and state your slices in the store file. in that way, it's a lot simpler.

// to call on an element in the global state, you can use the useSelector function
// from any component.
// redux toolkit's 'dispatch' hook allows to call actions on your reducers.

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);