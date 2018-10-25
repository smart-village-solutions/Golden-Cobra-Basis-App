import { StyleSheet } from 'react-native';

import colors from '../colors';

export default StyleSheet.create({
  flex: {
    backgroundColor: colors.lighterGray,
    flex: 1
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  padding: {
    padding: 15
  },
  list: {
    backgroundColor: colors.lighterGray
  }
});
