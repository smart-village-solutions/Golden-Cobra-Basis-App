/**
 * Reducers in Redux are pure functions, meaning they don't have any side effets such as
 * changing local storage, contacting the server or saving any data in variables.
 * They are the final stage in the unidirectional data flow. After an action is dispatched
 * to the store and has passed through all the middleware, reducers receive it together
 * with the current state of the application. Then they can create a new state that has
 * been modified according to the action and return it to the store.
 *
 * Reducers should never mutate the existing state!
 */

import { combineReducers } from 'redux';

import articles from './articles';

const reducers = combineReducers({
  articles
});

export default reducers;
