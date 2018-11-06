import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import { colors, styles, texts } from '../config';
import { Container, CameraOverlay, ElementPadding } from '../components';

class CameraScene extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        autoFocus: RNCamera.Constants.AutoFocus.off
      }
    };
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const data = await this.camera.takePictureAsync();
        console.log(data);
        console.log(`${texts.de.logs.camera.pathToImg}${data.uri}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  switchType = () => {
    const { back, front } = RNCamera.Constants.Type;

    this.setState({
      camera: {
        ...this.state.camera,
        type: this.state.camera.type === back ? front : back
      }
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = RNCamera.Constants.Type;

    if (this.state.camera.type === back) {
      icon = <IOSIcon name="ios-reverse-camera" size={26} color={colors.white} />;
    } else if (this.state.camera.type === front) {
      icon = <IOSIcon name="ios-reverse-camera" size={26} color={colors.white} />;
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = RNCamera.Constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode
      }
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = RNCamera.Constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = <IOSIcon name="ios-flash" size={26} color={colors.red} />;
    } else if (this.state.camera.flashMode === on) {
      icon = <IOSIcon name="ios-flash" size={26} color={colors.white} />;
    } else if (this.state.camera.flashMode === off) {
      icon = <IOSIcon name="ios-flash" size={26} color={colors.darkerGray} />;
    }

    return icon;
  }

  render() {
    return (
      <Container backgroundColor="transparent">
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview.camera}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          autoFocus={this.state.camera.autoFocus}
          permissionDialogTitle={texts.de.permissions.dialogs.camera.title}
          permissionDialogMessage={texts.de.permissions.dialogs.camera.message}
        />
        <CameraOverlay top>
          <TouchableOpacity onPress={this.switchType}>
            <ElementPadding horizontal={15} vertical={15}>
              {this.typeIcon}
            </ElementPadding>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.switchFlash}>
            <ElementPadding horizontal={15} vertical={15}>
              {this.flashIcon}
            </ElementPadding>
          </TouchableOpacity>
        </CameraOverlay>
        <CameraOverlay bottom>
          <TouchableOpacity onPress={this.takePicture}>
            <IOSIcon name="ios-disc" size={36} color={colors.white} />
          </TouchableOpacity>
        </CameraOverlay>
      </Container>
    );
  }
}

export default CameraScene;
