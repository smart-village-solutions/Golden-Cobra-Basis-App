import PropTypes from 'prop-types';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const ArticleImage = (props) => (
  <View style={styles.scroll}>
    <ActivityIndicator
      animating
      size={props.size}
      {...props}
    />
  </View>
);

ArticleImage.propTypes = {
  size: PropTypes.string
};

ArticleImage.defaultProps = {
  size: 'large'
};

export default ArticleImage;
