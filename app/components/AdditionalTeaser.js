import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { colors } from '../config';
import { IconWrapper, IndexElementWrapper, StyledText } from '.';

const AdditionalTeaser = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <IndexElementWrapper key={item.id}>
      {item.iconName && (
        <IconWrapper left>
          <IOSIcon name={item.iconName} size={18} color={colors.black} />
        </IconWrapper>
      )}
      <View>
        <StyledText>{item.title}</StyledText>
      </View>
      <IconWrapper right>
        <IOSIcon name="ios-arrow-forward" size={18} color={colors.darkerGray} />
      </IconWrapper>
    </IndexElementWrapper>
  </TouchableHighlight>
);

AdditionalTeaser.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AdditionalTeaser;
