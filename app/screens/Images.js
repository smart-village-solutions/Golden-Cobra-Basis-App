import React from 'react';
import CameraRollPicker from 'react-native-camera-roll-picker';

import { colors, texts } from '../config';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: []
    };
    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  getSelectedImages(images, current) {
    const num = images.length;

    this.setState({
      num,
      selected: images
    });

    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    return (
      <CameraRollPicker
        imagesPerRow={4}
        imageMargin={1}
        backgroundColor={colors.lighterGray}
        selected={this.state.selected}
        callback={this.getSelectedImages}
        emptyText={texts.de.infos.images.emptyText}
      />
    );
  }
}

export default Images;
