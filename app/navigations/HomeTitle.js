import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class HomeTitle extends React.PureComponent {
  static propTypes = {
    articles: PropTypes.object.isRequired
  };

  render() {
    const { articles } = this.props;
    const article = articles.articles[0];

    return <Text>{article.title}</Text>;
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTitle);
