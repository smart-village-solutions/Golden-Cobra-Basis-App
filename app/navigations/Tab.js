import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, texts } from '../config';
import initDrawer from './ArticleDrawer';
import CameraStack from './CameraStack';
import NotificationsStack from './NotificationsStack';
import AdditionalStack from './AdditionalStack';
import TabBarIcon from './TabBarIcon';

const navigationOptions = ({ navigation }) => ({
  /* eslint-disable react/display-name, react/prop-types */
  tabBarIcon: ({ focused }) => {
    const { routeName } = navigation.state;
    return <TabBarIcon routeName={routeName} focused={focused} />;
  }
});

const TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: colors.green,
    inactiveTintColor: colors.green,
    style: {
      // backgroundColor: colors.lighterGray,
      height: 70
    },
    labelStyle: {
      fontSize: 12,
      marginTop: -5,
      marginBottom: 10
    }
  }
};

const initTab = (navigationEntries, refreshAction) => {
  let RouteConfigs = {};
  const Drawer = initDrawer(navigationEntries, refreshAction);

  RouteConfigs = {
    Tab1: {
      screen: Drawer,
      navigationOptions: {
        title: texts.de.others.tab.tab1
      }
    },
    Tab2: {
      screen: CameraStack,
      navigationOptions: {
        title: texts.de.others.tab.tab2
      }
    },
    Tab3: {
      screen: NotificationsStack,
      navigationOptions: {
        title: texts.de.others.tab.tab3
      }
    },
    Tab4: {
      screen: AdditionalStack,
      navigationOptions: {
        title: texts.de.others.tab.tab4
      }
    }
  };

  TabNavigatorConfig.initialRouteName = 'Tab1';
  TabNavigatorConfig.navigationOptions = navigationOptions;
  TabNavigatorConfig.tabBarOptions = {
    activeTintColor: colors.green,
    inactiveTintColor: colors.black,
    style: {
      backgroundColor: colors.white,
      height: 70
    },
    labelStyle: {
      fontSize: 12,
      marginTop: -5,
      marginBottom: 10
    }
  };

  return createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
};

export default initTab;
