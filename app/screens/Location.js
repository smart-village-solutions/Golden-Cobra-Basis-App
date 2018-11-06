import React from 'react';
import { Text } from 'react-native';

import { texts } from '../config';
import { Container, StyledText } from '../components';

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
      <Container centered>
        <StyledText>
          {texts.de.others.location.latitude}
          {this.state.latitude}
        </StyledText>
        <StyledText>
          {texts.de.others.location.longitude}
          {this.state.longitude}
        </StyledText>
        {this.state.error ? (
          <Text>
            {texts.de.errors.general.detailedError}
            {this.state.error}
          </Text>
        ) : null}
      </Container>
    );
  }
}

export default Location;
