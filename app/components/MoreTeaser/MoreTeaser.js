import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Styles from '../../config/styles';
import colors from '../../config/colors';

const MoreTeaser = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View key={item.id} style={[Styles.containers.flex, styles.listItem]}>
      {item.iconName && <View style={{ width: 30 }}>
        <IOSIcon name={item.iconName} size={18} color={colors.black} />
      </View>}
      <View>
        <Text style={Styles.texts.text}>{item.title}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', flexGrow: 1 }}>
        <IOSIcon name="ios-arrow-forward-outline" size={18} color={colors.darkerGray} />
      </View>
    </View>
  </TouchableHighlight>
);

MoreTeaser.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default MoreTeaser;
