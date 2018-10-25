import React from 'react';
import { Text, View } from 'react-native';

import Styles from '../config/styles';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={[Styles.containers.flex, Styles.containers.centered]}>
        <Text style={Styles.texts.text}>Latitude: {this.state.latitude}</Text>
        <Text style={Styles.texts.text}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Fehler: {this.state.error}</Text> : null}
      </View>
    );
  }
}

export default Location;
