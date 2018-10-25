import { DrawerNavigator } from 'react-navigation';

import initStack from './ArticleStack';
import colors from '../config/colors';

/* eslint-disable one-var */

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

const initDrawer = (navigationEntries, articles, refreshAction) => {
  const RouteConfigs = {};

  if (navigationEntries) {
    navigationEntries.forEach((item) => {
      // TODO:
      // cannot make the drawer navigate the same routes as the inner stack.
      // so currently every drawer navigation item has the same whole stack.
      // HACK: pass every stack the current artice_id to make it the initialRoute
      const Stack = initStack(item.article_id, articles, refreshAction);

      RouteConfigs[`Navigation${item.id}`] = {
        screen: Stack,
        navigationOptions: {
          ...navigationOptions,
          drawerLabel: item.title
        }
      };
    });

    if (navigationEntries[0]) {
      DrawerNavigatorConfig.initialRouteName = `Navigation${navigationEntries[0].id}`;
      DrawerNavigatorConfig.drawerPosition = 'right';
    }
  }

  return DrawerNavigator(RouteConfigs, DrawerNavigatorConfig);
};

export default initDrawer;
