import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import Index from '../scenes/Index';
import Article from '../scenes/Article';
import Styles from '../config/styles';
import colors from '../config/colors';

/* eslint-disable one-var */

// dynamic navigationsOptions giving the refresh action down to every component
const navigationOptions = (navigation, refreshAction) => {
  const defaultNavigationOptions = {
    gesturesEnabled: true
  };

  return {
    ...defaultNavigationOptions,
    headerStyle: { paddingRight: 10, paddingLeft: 10 },
    headerTitleStyle: Styles.texts.text,
    headerLeft: (
      <TouchableOpacity onPress={() => refreshAction()}>
        <IOSIcon name="ios-home-outline" size={24} color={colors.black} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <IOSIcon name="ios-menu" size={28} color={colors.black} />
      </TouchableOpacity>
    )
  };
};

// flatten a parent article with its children or index_articles, given per key
//
// @param articles [Array]
// @param key [String] 'children' or 'index_articles'
const flatten = (articles, key) =>
  articles.reduce((acc, article) => {
    article = Object.assign({}, article);
    acc = acc.concat(article);
    if (article[key]) {
      acc = acc.concat(flatten(article[key]));
      article[key] = article[key].map((child) => child.id);
    }
    return acc;
  }, []);

// @return Index - index of articles
//         Article - simple article
const getScreen = (article, props) => {
  let screen = null;

  if (article.index_articles && article.index_articles.length) {
    screen = (
      <Index
        article={article}
        indexArticles={flatten(article.index_articles, 'index_articles')}
        {...props}
      />
    );
  } else {
    screen = <Article article={article} {...props} />;
  }

  return screen;
};

const initStack = (articleId, stackArticles, refreshAction) => {
  const RouteConfigs = {},
        StackNavigatorConfig = {};

  if (stackArticles) {
    stackArticles.forEach((article) => {
      let screen = (props) => getScreen(article, props);

      RouteConfigs[`Article${article.id}`] = {
        screen,
        navigationOptions: ({ navigation }) => ({
          ...navigationOptions(navigation, refreshAction),
          headerTitle: article.title
        })
      };

      flatten(article.index_articles, 'index_articles').forEach((indexArticle) => {
        screen = (props) => getScreen(indexArticle, props);

        RouteConfigs[`Article${indexArticle.id}`] = {
          screen,
          navigationOptions: ({ navigation }) => ({
            ...navigationOptions(navigation, refreshAction),
            headerTitle: indexArticle.title
          })
        };
      });
    });
  }

  if (stackArticles.length) {
    StackNavigatorConfig.initialRouteName = `Article${articleId}`;
  }

  return StackNavigator(RouteConfigs, StackNavigatorConfig);
};

export default initStack;
