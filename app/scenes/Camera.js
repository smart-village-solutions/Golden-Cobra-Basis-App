import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IOSIcon from 'react-native-vector-icons/Ionicons';

import Styles from '../config/styles';
import colors from '../config/colors';

class CameraScene extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        autoFocus: RNCamera.Constants.AutoFocus.off
        // showGallery: false
      }
    };
  }

  // toggleView = () => {
  //   console.log(2);
  //   this.setState({
  //     camera: {
  //       ...this.state.camera,
  //       showGallery: !this.state.camera.showGallery
  //     }
  //   });
  // };

  takePicture = async () => {
    try {
      if (this.camera) {
        const data = await this.camera.takePictureAsync();
        console.log(data);
        console.log(`Path to image: ${data.uri}`);
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
  }

  get typeIcon() {
    let icon;
    const { back, front } = RNCamera.Constants.Type;

    if (this.state.camera.type === back) {
      icon = <IOSIcon name="ios-reverse-camera-outline" size={26} color={colors.white} />;
    } else if (this.state.camera.type === front) {
      icon = <IOSIcon name="ios-reverse-camera-outline" size={26} color={colors.white} />;
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
      icon = <IOSIcon name="ios-flash-outline" size={26} color={colors.red} />;
    } else if (this.state.camera.flashMode === on) {
      icon = <IOSIcon name="ios-flash" size={26} color={colors.white} />;
    } else if (this.state.camera.flashMode === off) {
      icon = <IOSIcon name="ios-flash-outline" size={26} color={colors.white} />;
    }

    return icon;
  }

  render() {
    return (
      <View style={[Styles.containers.flex, { backgroundColor: 'transparent' }]}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          autoFocus={this.state.camera.autoFocus}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
            {this.typeIcon}
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
            {this.flashIcon}
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
            <IOSIcon name="ios-disc" size={36} color={colors.white} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.captureButton} onPress={this.toggleView}>
            <IOSIcon name="ios-disc" size={36} color={colors.white} />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
  },
  typeButton: {
    padding: 5
  },
  flashButton: {
    padding: 5
  },
  buttonsSpace: {
    width: 10
  }
});

export default CameraScene;
