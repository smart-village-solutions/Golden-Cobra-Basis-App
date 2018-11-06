/**
 * Working with the store
 *
 * The `getState()` method returns the reference to the current state in the store.
 *  - `store.getState();`
 *
 * Sending action objects to reducers is done via the store using the store's `dispatch()` method,
 * which accepts a single argument, the action object.
 *  - `store.dispatch(action);`
 *
 * To update the UI or other parts of our application when the state changes,
 * the store allows us to subscribe to state changes using the `subscribe()` method.
 * It accepts a callback function, which will be executed after every action has been dispatched.
 *  - `store.subscribe(callback);`
 *
 * The return value of the `subscribe()` method is a function that can be used to unsubscribe
 * from the store. It is important to remember to call `unsubscribe()` for all subscriptions to
 * prevent memory leaks.
 *  - `const unsubscribe = store.subscribe(callback);`
 */

import { applyMiddleware, createStore, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import defaultOfflineConfig from '@redux-offline/redux-offline/lib/defaults';
import offlineActionTracker from '@redux-offline/redux-offline/lib/offlineActionTracker';
import logMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import apiMiddleware from './apiMiddleware';
import measureMiddleware from './measureMiddleware';
import { NetworkError, getResponseBody } from '../helpers/storeHelper';

/**
 * We use the redux fatory function `createStore()` to create our store.
 * It accepts three arguments:
 *  - a mandatory reducer function
 *  - an optional initial state
 *  - an optional store enhancer (e.g. middleware)
 *
 * Middleware are one of Redux's most powerful concepts. An action dispatched to the store
 * is passed to the root reducer together with the current state to generate a new one.
 * The concept of middleware allows us to add code that will run before the action is passed
 * to the reducer. Multiple middleware can be added in a chain, thus allowing each to run its
 * own logic, one after another.
 *
 * We want some middleware only for development purposes. Therefore we can apply middleware
 * to the store conditionally.
 */

/**
 * Add own persistCallback() to trigger rehydrated() action to render main application after
 * rehydration has taken place.
 *
 * Thx to:
 * http://www.petecorey.com/blog/2017/07/24/offline-graphql-queries-with-redux-offline-and-apollo/#rehydration-race-conditions
 *
 */
const offlineConfig = {
  ...defaultOfflineConfig,
  effect: (effect) => {
    // Change how network requests are made. We want to handle 304 requests as is without throwing
    // errors. They should go through without changing any data.
    // https://github.com/redux-offline/redux-offline/tree/master#change-how-network-requests-are-made
    const { url, ...options } = effect;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    return fetch(url, { ...options, headers }).then((response) => {
      if (response.status === 200 && response.ok) {
        return getResponseBody(response);
      }
      if (response.status === 304) {
        return;
      }
      return getResponseBody(response).then((body) => {
        throw new NetworkError(body || '', response.status);
      });
    });
  },
  offlineActionTracker: offlineActionTracker.withoutPromises,
  // persistCallback: () => store.dispatch(rehydrated()),
  persistOptions: {
    // blacklist: ['rehydrated', 'geolocation']
  }
};

// https://github.com/redux-offline/redux-offline/blob/develop/docs/api/create-offline.md
const { middleware: offlineMiddleware, enhanceReducer, enhanceStore } = createOffline(
  offlineConfig
);
const middleware = [thunkMiddleware, offlineMiddleware, apiMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(measureMiddleware);
  /**
   *  Note: logger must be the last middleware in chain, otherwise it will log
   *        thunk and promise, not actual actions
   */
  middleware.push(logMiddleware);
}

const store = createStore(
  enhanceReducer(reducers),

  // https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md#use-redux-devtools-extension-api
  process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),

  compose(
    applyMiddleware(...middleware),
    enhanceStore
  )
);

export default store;
