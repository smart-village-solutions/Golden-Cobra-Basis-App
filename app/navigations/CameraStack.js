import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { Camera, Images } from '../screens';
import { colors, styles, texts } from '../config';
import { ElementPadding } from '../components';

const navigationOptions = {
  gesturesEnabled: true,
  headerTitleStyle: styles.texts.text
};

const CameraStack = createStackNavigator({
  Camera1: {
    screen: Camera,
    navigationOptions: ({ navigation }) => ({
      ...navigationOptions,
      headerTitle: texts.de.infos.cameraStack.cameraTitle,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Camera2')}>
          <ElementPadding horizontal={8}>
            <IOSIcon name="ios-images" size={26} color={colors.black} />
          </ElementPadding>
        </TouchableOpacity>
      )
    })
  },
  Camera2: {
    screen: Images,
    navigationOptions: {
      ...navigationOptions,
      headerTitle: texts.de.infos.cameraStack.imagesTitle
    }
  }
});

export default CameraStack;
