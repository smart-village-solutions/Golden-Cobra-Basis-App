import { SET_ARTICLES } from '../actions/constants/actionTypes';

const initialState = {
  articles: []
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };

    default:
      return state;
  }
};

export default articles;
