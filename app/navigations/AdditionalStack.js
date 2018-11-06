import { createStackNavigator } from 'react-navigation';

import { Location, Additional } from '../screens';
import { styles, texts } from '../config';

const AdditionalStack = createStackNavigator({
  Additional: {
    screen: Additional,
    navigationOptions: {
      headerTitle: texts.de.others.additionalStack.headerTitles.additional,
      headerTitleStyle: styles.texts.text
    }
  },
  Location: {
    screen: Location,
    navigationOptions: {
      headerTitle: texts.de.others.additionalStack.headerTitles.location,
      headerTitleStyle: styles.texts.text
    }
  }
});

export default AdditionalStack;
