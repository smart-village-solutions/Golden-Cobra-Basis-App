import { createStackNavigator } from 'react-navigation';

import { Notifications } from '../screens';
import { styles, texts } from '../config';

const NotificationsStack = createStackNavigator({
  Notifications1: {
    screen: Notifications,
    navigationOptions: {
      headerTitle: texts.de.others.notificationStack.headerTitle,
      headerTitleStyle: styles.texts.text
    }
  }
});

export default NotificationsStack;
