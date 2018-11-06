import PropTypes from 'prop-types';
import React from 'react';

import { AdditionalTeaser } from '../components';
import { ArticleList, IndexItemSeparator } from '../components';

import { texts } from '../config';

class Additional extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static defaultProps = {
    navigation: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      additionalData: []
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.setState({ additionalData: this.additionalData() });
  }

  keyExtractor = (item) => `key-${item.id}`;

  additionalData = () => {
    const testIcons = [
      'navigate',
      'map',
      'pie',
      'pint',
      'pizza',
      'airplane',
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
      iconName: 'ios-pin',
      title: `${texts.de.others.functionsList.location}`
    };

    for (let i = 1; i < 20; i++) {
      dataList[i] = {
        id: i,
        iconName: `ios-${testIcons[i]}`,
        title: `${texts.de.others.functionsList.alertMessage}${i}`
      };
    }

    return dataList;
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <AdditionalTeaser
        item={item}
        onPress={() => {
          if (item.id === 0) {
            return navigation.navigate('Location');
          }

          return alert(item.title);
        }}
      />
    );
  };

  render() {
    const { additionalData } = this.state;

    return (
      <ArticleList
        data={additionalData}
        renderItem={this.renderItem}
        ItemSeparatorComponent={IndexItemSeparator}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default Additional;
