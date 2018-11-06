import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

class ArticleTitle extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { article = [] } = params;

    return <Text>{article.title}</Text>;
  }
}

export default ArticleTitle;
