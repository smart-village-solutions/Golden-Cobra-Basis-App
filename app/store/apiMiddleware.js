import { FETCH_ARTICLES } from '../actions/constants/actionTypes';
import { setArticles } from '../actions/articles';

// TODO: add errorCallback
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then(callback)
    .catch((err) => console.log(`Error fetching articles: ${err}`));
}

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === FETCH_ARTICLES) {
    // TODO: dispatch fetch start with showing spinner
    fetchData('https://demo.goldencobra.de/api/v3/articles.json?tags=mobileapp', (data) => {
      store.dispatch(setArticles(data.articles));
      // TODO: dispatch hiding spinner
    });
  }

  /**
   * Calling `next()` with an action will cause it to propagate down the middleware chain.
   * Failing to call it inside a middleware will prevent the action from reaching the other
   * middleware, the reducers and the store.
   */
  next(action);
};

export default apiMiddleware;
