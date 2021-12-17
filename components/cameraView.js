import React from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CButtonIcon } from './cButton';
import theme from '../theme/theme';
export function CameraView(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  console.log(flash);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
    })();

    if (hasCameraPermission === null && hasMediaPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false || hasMediaPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }, []);

  const style = {
    container: {
      width: '100%',
      height: '100%',
    },
    controls: {
      position: 'absolute',
      bottom: 50,
      width: '100%',
      zIndex: 100,
      bottom: 50,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  };

  const snap = async () => {
    try {
      let { uri } = await cameraRef.takePictureAsync();
      console.log(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log('saved ' + uri + ' to camera roll');
    } catch (e) {
      console.log('error' + e);
    }
  };

  let cameraRef;

  return (
    <View style={style.container}>
      <Camera
        ratio={'4:3'}
        type={type}
        flashMode={flash}
        style={style.container}
        ref={(ref) => {
          cameraRef = ref;
        }}
      ></Camera>
      <View style={style.controls}>
        <CButtonIcon
          theme={props.theme}
          icon={
            flash == Camera.Constants.FlashMode.on
              ? props.theme.icon.flashOn
              : props.theme.icon.flashOff
          }
          m
          squared
          ghost
          onPress={() =>
            flash == Camera.Constants.FlashMode.off
              ? setFlash(Camera.Constants.FlashMode.on)
              : setFlash(Camera.Constants.FlashMode.off)
          }
        />
        <CButtonIcon
          theme={props.theme}
          icon={props.theme.icon.camera}
          l
          squared
          filled
          onPress={snap}
        />
        <CButtonIcon
          theme={props.theme}
          icon={props.theme.icon.cameraInvert}
          m
          squared
          ghost
          onPress={snap}
          onPress={() =>
            type == Camera.Constants.Type.back
              ? setType(Camera.Constants.Type.front)
              : setType(Camera.Constants.Type.back)
          }
        />
      </View>
    </View>
  );
}
