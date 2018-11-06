import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { Article, Home } from '../screens';
import { colors, styles } from '../config';
import { ElementPadding } from '../components';

// dynamic navigationsOptions giving the refresh action down to every component
const navigationOptions = (navigation, refreshAction) => {
  const defaultNavigationOptions = {
    gesturesEnabled: true
  };

  return {
    ...defaultNavigationOptions,
    headerTitleStyle: styles.texts.text,
    headerLeft: (
      <TouchableOpacity onPress={() => refreshAction()}>
        <ElementPadding horizontal={8}>
          <IOSIcon name="ios-home" size={24} color={colors.black} />
        </ElementPadding>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ElementPadding horizontal={8}>
          <IOSIcon name="ios-menu" size={28} color={colors.black} />
        </ElementPadding>
      </TouchableOpacity>
    )
  };
};

const initStack = (refreshAction) => {
  const RouteConfigs = {
          Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
              ...navigationOptions(navigation, refreshAction)
            })
          },
          Article: {
            screen: Article,
            navigationOptions: ({ navigation }) => ({
              ...navigationOptions(navigation, refreshAction)
            })
          }
        },
        StackNavigatorConfig = {};

  StackNavigatorConfig.initialRouteName = 'Home';

  return createStackNavigator(RouteConfigs, StackNavigatorConfig);
};

export default initStack;
