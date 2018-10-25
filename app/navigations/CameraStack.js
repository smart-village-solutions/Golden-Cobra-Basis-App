import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import Camera from '../scenes/Camera';
import Images from '../scenes/Images';
import Styles from '../config/styles';
import colors from '../config/colors';

/* eslint-disable one-var */

const navigationOptions = {
  gesturesEnabled: true,
  headerStyle: { paddingRight: 10, paddingLeft: 10 },
  headerTitleStyle: Styles.texts.text
};

const CameraStack = StackNavigator({
  Camera1: {
    screen: Camera,
    navigationOptions: ({ navigation }) => ({
      ...navigationOptions,
      headerTitle: 'Kamera',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Camera2')}>
          <IOSIcon name="ios-images-outline" size={26} color={colors.black} />
        </TouchableOpacity>
      )
    })
  },
  Camera2: {
    screen: Images,
    navigationOptions: {
      ...navigationOptions,
      headerTitle: 'Bilder'
    }
  }
});

export default CameraStack;
