import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import { StackActions } from 'react-navigation';
import { find } from 'lodash';
import DrawerItems from 'react-navigation-drawer/dist/views/DrawerNavigatorItems';

// flatten a parent article with its children or index_articles, given per key
//
// @param articles [Array]
// @param key [String] 'children' or 'index_articles'
const flattenIndexArticles = (articles, key) =>
  articles.reduce((acc, article) => {
    article = Object.assign({}, article);
    acc = acc.concat(article);
    if (article[key]) {
      acc = acc.concat(flattenIndexArticles(article[key]));
      article[key] = article[key].map((child) => child.id);
    }
    return acc;
  }, []);

const getRoute = (article) => {
  if (article.index_articles && article.index_articles.length) {
    return {
      routeName: 'Article',
      params: {
        article,
        indexArticles: flattenIndexArticles(article.index_articles, 'index_articles')
      }
    };
  }

  return {
    routeName: 'Article',
    params: { article }
  };
};

// get article id from current route name: Drawer${navigationID}-${articleId}
// TODO: save navigation_menus in redux store and get article_id from that object
const getArticleId = (route) => {
  return +route.routeName.split('-')[1];
};

class CustomDrawerItems extends React.PureComponent {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { articles, navigation } = this.props;

    return (
      <ScrollView alwaysBounceVertical={false}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems
            {...this.props}
            onItemPress={({ route, focused }) => {
              if (focused) {
                navigation.closeDrawer();
              } else {
                const article = find(articles.articles, { id: getArticleId(route) });
                const pushAction = StackActions.push(getRoute(article));
                navigation.dispatch(pushAction);
              }
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawerItems);
