import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { styles, urls } from '../config';
import ArticleTitle from '../navigations/ArticleTitle';
import {
  ArticleImage,
  ArticleList,
  ArticleView,
  IndexItemSeparator,
  ElementPadding
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
      key: `article-index-${article.id}`,
      params: {
        article,
        indexArticles: flattenIndexArticles(article.index_articles, 'index_articles')
      }
    };
  }

  return {
    routeName: 'Article',
    key: `article-show-${article.id}`,
    params: { article }
  };
};

class Article extends React.Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <ArticleTitle navigation={navigation} />
    };
  };

  openArticle = (articleId) => {
    const { articles, navigation } = this.props;
    const article = find(articles.articles, { id: articleId });

    navigation.navigate(getRoute(article));
  };

  keyExtractor = (item) => `key-${item.id}`;

  renderHeader = () => {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { article = [] } = params;

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
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { indexArticles = [] } = params;

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
)(Article);
