import React from 'react';
import { RefreshControl } from 'react-native';

import { styles, texts } from '../config';
import { ArticleList, ArticleView, IndexItemSeparator, StyledText } from '../components';

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
    setTimeout(() => this.setState({ refreshing: false }), 1200);
  }

  keyExtractor = (item) => `key-${item.id}`;

  renderItem = ({ item }) => null;

  render() {
    const { notificationData } = this.state;

    if (notificationData.length === 0) {
      return (
        <ArticleView
          contentContainerStyle={[styles.containers.flex, styles.containers.centered]}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <StyledText>
            {this.state.refreshing
              ? texts.de.infos.notifications.refreshing
              : texts.de.infos.notifications.emptyText}
          </StyledText>
        </ArticleView>
      );
    }

    return (
      <ArticleList
        data={notificationData()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={IndexItemSeparator}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default Notifications;
