import { StackNavigator } from 'react-navigation';

import Notifications from '../scenes/Notifications';
import Styles from '../config/styles';

const NotificationsStack = StackNavigator({
  Notifications1: {
    screen: Notifications,
    navigationOptions: {
      headerTitle: 'Benachrichtigungen',
      headerStyle: { paddingRight: 10, paddingLeft: 10 },
      headerTitleStyle: Styles.texts.text
    }
  }
});

export default NotificationsStack;
