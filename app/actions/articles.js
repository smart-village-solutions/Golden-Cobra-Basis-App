import { FETCH_ARTICLES, SET_ARTICLES } from './constants/actionTypes';

export const fetchArticles = () => ({
  type: FETCH_ARTICLES
});

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles
});
