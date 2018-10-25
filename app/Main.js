import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Platform, StatusBar, Text, View } from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { fetchArticles } from './actions/articles';

import initTab from './navigations/Tab';
import Styles from './config/styles';
import colors from './config/colors';

class Main extends React.Component {
  state = {
    refreshing: true,
    error: undefined,
    navigationEntries: []
  };

  componentDidMount() {
    this.loadNavigation();
    StatusBar.setHidden(Platform.OS === 'android');
  }

  fetchNavigation = () => {
    const endpoints = [
      {
        url:
          'https://demo.goldencobra.de/api/v2/navigation_menus.json?name=mobileapp&methods=article_id',
        name: 'navigationEntries'
      }
    ];

    Promise.all(endpoints.map((endpoint) => this.fetchData(endpoint.url, endpoint.name))).then(
      () => {
        this.setState({ refreshing: false });
      }
    );
  }

  fetchData = (url, name) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const stateObject = {};
        stateObject[name] = data;
        this.setState(stateObject);
      })
      .catch((error) => {
        this.setState({ error, refreshing: false });
      });
  }

  loadNavigation = () => {
    this.setState({ refreshing: true });
    this.props.fetchArticles();
    this.fetchNavigation();
  }

  render() {
    const { refreshing, error, navigationEntries } = this.state;
    const { articles } = this.props;
    let Tab = null;

    if (refreshing) {
      return (
        <View style={[Styles.containers.flex, Styles.containers.centered]}>
          <View style={{ padding: 5 }}>
            <ActivityIndicator />
          </View>
          <Text style={Styles.texts.text}>Wird geladen...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={[Styles.containers.flex, Styles.containers.centered]}>
          <View style={{ padding: 3 }}>
            <IOSIcon name="ios-warning-outline" size={22} color={colors.red} />
          </View>
          <Text style={Styles.texts.text}>Fehler</Text>
        </View>
      );
    }

    if (navigationEntries.length && articles.articles.length) {
      Tab = initTab(navigationEntries, articles.articles, this.loadNavigation);
      return <Tab />;
    }

    return (
      <View style={[Styles.containers.flex, Styles.containers.centered]}>
        <View style={{ padding: 3 }}>
          <IOSIcon name="ios-warning-outline" size={22} color={colors.red} />
        </View>
        <Text style={Styles.texts.text}>Keine Artikel vorhanden</Text>
      </View>
    );
  }
}

Main.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired
};

/**
 * We use the `connect()` method to hook React components with Redux state.
 * It accepts two arguments:
 *  - mapStateToProps:
 *      Maps the Redux state to our React props.
 *      We can access them under `this.props...`
 *  - mapDispatchToProps:
 *      Can be an object of actions to dispatch.
 *      We can access them under `this.props...`
 *
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 * https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4
 */

const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = {
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
