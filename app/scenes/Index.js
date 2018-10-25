import PropTypes from 'prop-types';
import React from 'react';
import { Image, FlatList, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import Styles from '../config/styles';
import MoreTeaser from '../components/MoreTeaser';

class Index extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    article: PropTypes.object,
    indexArticles: PropTypes.array
  };

  static defaultProps = {
    navigation: undefined,
    article: {},
    indexArticles: []
  };

  constructor(props) {
    super(props);
    this.openArticle = this.openArticle.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  openArticle(item) {
    const { navigation } = this.props;

    navigation.navigate(`Article${item.id}`);
  }

  keyExtractor = (item) => `key-${item.id}`;

  indexItemSeparator = () => (
    <View style={Styles.separators.indexItemSeparator} />
  )

  renderHeader() {
    const { article } = this.props;

    return (
      <View>
        {article.image_standard_big && article.image_standard_big.length > 0 ? (<Image
          style={{ height: 250 }}
          source={{ uri: `https://demo.goldencobra.de${article.image_standard_big}` }}
        />) : null}
        <View style={Styles.containers.padding}>
          <HTMLView
            value={article.content}
            stylesheet={Styles.html}
            paragraphBreak={null}
          />
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <MoreTeaser
      item={item}
      onPress={() => this.openArticle(item)}
    />
  );

  render() {
    const { indexArticles } = this.props;

    return (
      <FlatList
        data={indexArticles}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.indexItemSeparator}
        keyExtractor={this.keyExtractor}
        style={Styles.containers.list}
      />
    );
  }
}

export default Index;
