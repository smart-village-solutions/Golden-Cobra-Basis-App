import { StackNavigator } from 'react-navigation';

import More from '../scenes/More';
import Location from '../scenes/Location';
import Styles from '../config/styles';

const MoreStack = StackNavigator({
  More: {
    screen: More,
    navigationOptions: {
      headerTitle: 'Mehr',
      headerStyle: { paddingRight: 10, paddingLeft: 10 },
      headerTitleStyle: Styles.texts.text
    }
  },
  Location: {
    screen: Location,
    navigationOptions: {
      headerTitle: 'Standort',
      headerStyle: { paddingRight: 10, paddingLeft: 10 },
      headerTitleStyle: Styles.texts.text
    }
  }
});

export default MoreStack;
