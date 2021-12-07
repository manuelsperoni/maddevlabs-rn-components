import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);
export function PinchableImage(props) {
  const scale = useSharedValue(1);
  const focalY = useSharedValue(0);
  const focalX = useSharedValue(0);

  const pinchToZoomHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: (event) => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: +props.height / 2 - focalY.value },
        { translateX: +props.width / 2 - focalX.value },
        { scale: scale.value },
        { translateY: +focalY.value - props.height / 2 },
        { translateX: +focalX.value - props.width / 2 },
      ],
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PinchGestureHandler onGestureEvent={pinchToZoomHandler}>
        <AnimatedImage
          source={props.image}
          style={[
            {
              width: props.width,
              height: props.height,
            },
            animatedStyle,
          ]}
        />
      </PinchGestureHandler>
    </View>
  );
}
