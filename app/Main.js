import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Platform, StatusBar } from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { fetchArticles } from './actions/articles';

import initTab from './navigations/Tab';
import { colors, texts, urls } from './config';
import { Container, ElementPadding, StyledText } from './components';

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
        url: `${urls.server}${urls.fetchNavigation}`,
        name: 'navigationEntries'
      }
    ];

    Promise.all(endpoints.map((endpoint) => this.fetchData(endpoint.url, endpoint.name))).then(
      () => {
        this.setState({ refreshing: false });
      }
    );
  };

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
  };

  loadNavigation = () => {
    this.setState({ refreshing: true });
    this.props.fetchArticles();
    this.fetchNavigation();
  };

  render() {
    const { refreshing, error, navigationEntries } = this.state;
    let Tab = null;

    if (refreshing) {
      return (
        <Container centered>
          <ElementPadding horizontal={5} vertical={5}>
            <ActivityIndicator />
          </ElementPadding>
          <StyledText>{texts.de.infos.general.refreshing}</StyledText>
        </Container>
      );
    }

    if (error) {
      return (
        <Container centered>
          <ElementPadding horizontal={3} vertical={3}>
            <IOSIcon name="ios-warning" size={22} color={colors.red} />
          </ElementPadding>
          <StyledText>{texts.de.infos.errors.general.simpleError}</StyledText>
        </Container>
      );
    }

    if (navigationEntries.length) {
      Tab = initTab(navigationEntries, this.loadNavigation);
      return <Tab />;
    }

    return (
      <Container centered>
        <ElementPadding horizontal={3} vertical={3}>
          <IOSIcon name="ios-warning" size={22} color={colors.red} />
        </ElementPadding>
        <StyledText>{texts.de.infos.main.noArticle}</StyledText>
      </Container>
    );
  }
}

Main.propTypes = {
  fetchArticles: PropTypes.func.isRequired
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
