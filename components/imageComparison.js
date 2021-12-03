import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useState } from 'react';
import { withSpring } from 'react-native-reanimated';

export default function imageComparison(props) {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const [barXPos, setBarXPos] = useState(props.width / 2);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      console.log(event.absoluteX);
      x.value = ctx.startX + event.translationX;
      runOnJS(setBarXPos)(x.value + props.width / 2); // x value between 0 and imageWidth
    },

    onEnd: () => {
      if (x.value > props.width / 2) x.value = withSpring(props.width / 2);
      if (x.value < -props.width / 2) x.value = withSpring(-props.width / 2);
    },
  });

  const posBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        borderRadius: 20,
        // overflow: 'hidden',
      }}
    >
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: -50,
              left: props.width / 2 - 50 / 2,
              width: 50,
              backgroundColor: props.color,
              borderRadius: 20,
              height: 100,
              zIndex: 20,
            },
            posBarStyle,
          ]}
        ></Animated.View>
      </PanGestureHandler>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: props.width,
          height: props.height,
          zIndex: 10,
          borderRadius: 20,
        }}
        source={props.before}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: barXPos,
          width: props.width * 2,
          height: props.height,
          overflow: 'hidden',
          zIndex: 15,
        }}
      >
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: -barXPos,
            width: props.width,
            height: props.height,
            borderRadius: 20,
          }}
          source={props.after}
        />
      </View>
    </View>
  );
}
