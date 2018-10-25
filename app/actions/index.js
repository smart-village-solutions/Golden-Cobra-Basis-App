/**
 * Actions are the driving fore of every dynamic application, as they are the medium
 * by which all changes are communicated within a Redux application. In a Redux application
 * we have two sides:
 *  - senders of actions (event handlers, timeouts, network events, middleware, ...)
 *  - receivers of actions (middleware, reducers)
 *
 * A connection between a sender and a receiver is not necessarily one-to-one.
 * A keypress might trigger a middleware and a reducer and a reducer might be listening
 * to multiple actions.
 *
 * The simplest way to hold information in JavaScript is to use a plain object
 * and that is exactly what an action is:
 *  - `const action = { type: 'ACTION_NAME' };`
 *
 * The type is a unique required key describing the action and it is used by the receiving end
 * to distinguish between actions.
 *
 *
 * FSA (Flux Standard Actions) by open-source community
 *
 * Actions should have up to four fields:
 *  - ```
 *      const action = {
 *        type, // regular Redux action identifier
 *        error, // Boolean flag whether the action is in error state
 *        payload, // object holding all information needed by reducers
 *        meta // additional metadata not needed by reducers but could be consumed by middleware
 *      }
 *    ```
 */
