import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';

import MoreTeaser from '../components/MoreTeaser';
import Styles from '../config/styles';

/* eslint-disable one-var */

class More extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static defaultProps = {
    navigation: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      moreData: []
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.setState({ moreData: this.moreData() });
  }

  keyExtractor = (item) => `key-${item.id}`;

  indexItemSeparator = () => (
    <View style={Styles.separators.indexItemSeparator} />
  );

  moreData = () => {
    const testIcons = [
      'navigate',
      'map',
      'pie',
      'pint',
      'pizza',
      'plane',
      'paper-plane',
      'person',
      'options',
      'musical-note',
      'musical-notes',
      'notifications',
      'mail',
      'log-in',
      'list',
      'folder-open',
      'create',
      'arrow-dropdown-circle',
      'add',
      'alarm'
    ];

    const dataList = [];
    dataList[0] = {
      id: 0,
      iconName: 'ios-pin-outline',
      title: 'Standort'
    };

    for (let i = 1; i < 20; i++) {
      dataList[i] = {
        id: i,
        iconName: `ios-${testIcons[i]}-outline`,
        title: `Mehr ${i}`
      };
    }

    return dataList;
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <MoreTeaser
        item={item}
        onPress={() => {
          if (item.id === 0) {
            return navigation.navigate('Location');
          }

          return alert(item.title);
        }}
      />
    );
  }

  render() {
    const { moreData } = this.state;

    return (
      <FlatList
        data={moreData}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.indexItemSeparator}
        keyExtractor={this.keyExtractor}
        style={Styles.containers.list}
      />
    );
  }
}

export default More;
