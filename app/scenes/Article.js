import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

import Styles from '../config/styles';

class Article extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    article: PropTypes.object
  };

  static defaultProps = {
    navigation: undefined,
    article: {}
  };

  constructor(props) {
    super(props);
    this.openArticle = this.openArticle.bind(this);
  }

  openArticle(articleId) {
    const { navigation } = this.props;

    navigation.navigate(`Article${articleId}`);
  }

  render() {
    const { article } = this.props;

    return (
      <ScrollView style={Styles.containers.flex}>
        {article.image_standard_big && article.image_standard_big.length > 0 ? (<Image
          style={{ flex: 1, height: 200 }}
          source={{ uri: `https://demo.goldencobra.de${article.image_standard_big}` }}
        />) : null}
        <View style={Styles.containers.padding}>
          <HTMLView
            value={article.content}
            stylesheet={Styles.html}
            paragraphBreak={null}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Article;
