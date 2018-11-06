import PropTypes from 'prop-types';
import React from 'react';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { colors } from '../config';

class TabBarIcon extends React.Component {
  render() {
    const { routeName, focused } = this.props;

    switch (routeName) {
      case 'Tab1':
        return focused ? (
          <IOSIcon name="ios-paper" size={22} color={colors.green} />
        ) : (
          <IOSIcon name="ios-paper" size={22} color={colors.black} />
        );
      case 'Tab2':
        return focused ? (
          <IOSIcon name="ios-camera" size={30} color={colors.green} />
        ) : (
          <IOSIcon name="ios-camera" size={30} color={colors.black} />
        );
      case 'Tab3':
        return focused ? (
          <IOSIcon name="ios-flag" size={26} color={colors.green} />
        ) : (
          <IOSIcon name="ios-flag" size={26} color={colors.black} />
        );
      case 'Tab4':
        return focused ? (
          <IOSIcon name="ios-more" size={30} color={colors.green} />
        ) : (
          <IOSIcon name="ios-more" size={30} color={colors.black} />
        );
      default:
        return null;
    }
  }
}

TabBarIcon.propTypes = {
  routeName: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default TabBarIcon;
