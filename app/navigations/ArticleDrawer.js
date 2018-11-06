import { createDrawerNavigator } from 'react-navigation';

import { colors } from '../config';
import initStack from './ArticleStack';
import CustomDrawerItems from './CustomDrawerItems';

const navigationOptions = {
  drawerLockMode: 'locked-closed'
};

const DrawerNavigatorConfig = {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerBackgroundColor: colors.white,
  contentOptions: {
    activeBackgroundColor: colors.lighterGray,
    activeTintColor: colors.green,
    inactiveBackgroundColor: colors.white,
    inactiveTintColor: colors.black,
    labelStyle: {
      fontWeight: '400',
      margin: 15
    }
  }
};

const initDrawer = (navigationEntries, refreshAction) => {
  const RouteConfigs = {};
  const Stack = initStack(refreshAction);

  if (navigationEntries) {
    navigationEntries.forEach((item) => {
      RouteConfigs[`Drawer${item.id}-${item.article_id}`] = {
        screen: Stack,
        navigationOptions: {
          ...navigationOptions,
          drawerLabel: item.title
        }
      };
    });

    DrawerNavigatorConfig.contentComponent = CustomDrawerItems;
    DrawerNavigatorConfig.drawerPosition = 'right';
  }

  return createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);
};

export default initDrawer;
