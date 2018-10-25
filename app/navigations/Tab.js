import React from 'react';
import { TabNavigator } from 'react-navigation';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import initDrawer from './ArticleDrawer';
import CameraStack from './CameraStack';
import NotificationsStack from './NotificationsStack';
import MoreStack from './MoreStack';
import colors from '../config/colors';

/* eslint-disable one-var */

const navigationOptions = {};

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: colors.green
  }
};

const initTab = (navigationEntries, articles, refreshAction) => {
  let RouteConfigs = {};
  const Drawer = initDrawer(navigationEntries, articles, refreshAction);

  RouteConfigs = {
    Tab1: {
      screen: Drawer,
      navigationOptions: {
        ...navigationOptions,
        tabBarLabel: 'Artikel',
        tabBarIcon: ({ tintColor }) => (
          <IOSIcon style={{ width: 20 }} name="ios-paper-outline" size={22} color={tintColor} />
        )
      }
    },
    Tab2: {
      screen: CameraStack,
      navigationOptions: {
        ...navigationOptions,
        tabBarLabel: 'Kamera',
        tabBarIcon: ({ tintColor }) => (
          <IOSIcon style={{ width: 23 }} name="ios-camera-outline" size={30} color={tintColor} />
        )
      }
    },
    Tab3: {
      screen: NotificationsStack,
      navigationOptions: {
        ...navigationOptions,
        tabBarLabel: 'Benachrichtig...',
        tabBarIcon: ({ tintColor }) => (
          <IOSIcon style={{ width: 20 }} name="ios-flag-outline" size={26} color={tintColor} />
        )
      }
    },
    Tab4: {
      screen: MoreStack,
      navigationOptions: {
        ...navigationOptions,
        tabBarLabel: 'Mehr',
        tabBarIcon: ({ tintColor }) => (
          <IOSIcon style={{ width: 20 }} name="ios-more-outline" size={30} color={tintColor} />
        )
      }
    }
  };

  TabNavigatorConfig.initialRouteName = 'Tab1';

  return TabNavigator(RouteConfigs, TabNavigatorConfig);
};

export default initTab;
