import 'react-native-console-time-polyfill';

/**
 * This is a debug middleware to measure how much time it takes for our reducers
 * to process an action.
 * This middleware completely ignores the first parameter (the object holding `getState()`)
 * and `dispatch()`, as we simply don't need it.
 */
const measureMiddleware = () => (next) => (action) => {
  console.time(action.type);
  next(action);
  console.timeEnd(action.type);
};

export default measureMiddleware;
