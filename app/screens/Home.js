import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { styles, urls } from '../config';
import HomeTitle from '../navigations/HomeTitle';
import {
  ArticleImage,
  ArticleList,
  ArticleView,
  ElementPadding,
  IndexItemSeparator
} from '../components';
import { AdditionalTeaser } from '../components';

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
      key: `home-article-index-${article.id}`,
      params: {
        article,
        indexArticles: flattenIndexArticles(article.index_articles, 'index_articles')
      }
    };
  }

  return {
    routeName: 'Article',
    key: `home-article-show-${article.id}`,
    params: { article }
  };
};

class Home extends React.Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    headerTitle: <HomeTitle />
  };

  openArticle = (articleId) => {
    const { articles, navigation } = this.props;
    const article = find(articles.articles, { id: articleId });

    navigation.navigate(getRoute(article));
  };

  keyExtractor = (item) => `key-${item.id}`;

  renderHeader = () => {
    const { articles } = this.props;
    const article = articles.articles[0];

    if (!article) return null;

    return (
      <View>
        {article.image_standard_big && article.image_standard_big.length > 0 ? (
          <ArticleImage
            height={250}
            source={{ uri: `${urls.server}${article.image_standard_big}` }}
          />
        ) : null}
        <ElementPadding horizontal={15} vertical={15}>
          <HTMLView value={article.content} stylesheet={styles.html} paragraphBreak={null} />
        </ElementPadding>
      </View>
    );
  };

  renderItem = ({ item }) => (
    <AdditionalTeaser item={item} onPress={() => this.openArticle(item.id)} />
  );

  render() {
    const { articles } = this.props;
    const indexArticles = flattenIndexArticles(
      articles.articles[0].index_articles,
      'index_articles'
    );

    if (!indexArticles.length) {
      return <ArticleView>{this.renderHeader()}</ArticleView>;
    }

    return (
      <ArticleList
        data={indexArticles}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={IndexItemSeparator}
        keyExtractor={this.keyExtractor}
      />
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
)(Home);
