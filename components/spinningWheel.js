import React from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export function SpinningWheel(props) {
  const spinningWheel = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  if (props.state === 'hidden') {
    close();
  } else open();

  const spinningWheelAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: spinningWheel.value,
    };
  });
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  function open() {
    spinningWheel.value = 1;
    overlayOpacity.value = 0.5;
  }

  function close() {
    spinningWheel.value = 0;
    overlayOpacity.value = 0;
  }

  const style = {
    wrap: {
      position: 'absolute',
      flex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'black',
      zIndex: 10,
    },
    spinningWheel: {
      width: 50,
      height: 50,
      zIndex: 100,
    },
  };
  return (
    <View style={style.wrap}>
      <Animated.View
        style={[style.overlay, overlayAnimatedStyle]}
      ></Animated.View>
      <Animated.Image
        source={props.theme.icon.spinningWheel}
        style={[spinningWheelAnimatedStyle, style.spinningWheel]}
      />
    </View>
  );
}
