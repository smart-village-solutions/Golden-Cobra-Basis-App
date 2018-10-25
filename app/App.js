import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Main from './Main';

/**
 * Makes the Redux store available to the `connect()` calls in the component hierarchy below.
 * Normally, you can’t use `connect()` without wrapping a parent component in <Provider>.
 * The Provider accepts one argument - which is our store.
 * Its role is to glue React and Redux together.
 */
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
