import React from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';

import Styles from '../config/styles';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationData: [],
      refreshing: false
    };
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.setState({ refreshing: true });
    // fetchData().then(() => (
    setTimeout(() => (
        this.setState({ refreshing: false }
      )), 1200);
    // ));
  }

  keyExtractor = (item) => `key-${item.id}`;

  indexItemSeparator = () => (
    <View style={Styles.separators.indexItemSeparator} />
  );

  refreshControl = () => {
  }

  renderItem = ({ item }) => (
    null
  );

  render() {
    const { notificationData } = this.state;

    if (notificationData.length === 0) {
      return (
        <ScrollView
          style={Styles.containers.flex}
          contentContainerStyle={[Styles.containers.flex, Styles.containers.centered]}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
        >
          <Text style={Styles.texts.text}>
            {this.state.refreshing ? 'Wird geladen...' : 'Keine Benachrichtigungen'}
          </Text>
        </ScrollView>
      );
    }

    return (
      <FlatList
        data={notificationData()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.indexItemSeparator}
        keyExtractor={this.keyExtractor}
        style={Styles.containers.list}
      />
    );
  }
}

export default Notifications;
