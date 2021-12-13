import React from 'react';
import { Dimensions, View, Button, Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

export function Actionsheet(props) {
  const translateYBody = useSharedValue(0);
  const translateYHeader = useSharedValue(0);
  const backOpacity = useSharedValue(0);
  const [bodyHeight, setBodyHeigth] = useState(0);

  if (props.state === 'close') {
    close();
  } else open();

  const bodyAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYBody.value }],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYHeader.value }],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      opacity: backOpacity.value,
    };
  });

  function open() {
    translateYBody.value = withTiming(-(props.headerHeight + bodyHeight));
    translateYHeader.value = withTiming(-(props.headerHeight + bodyHeight));
    backOpacity.value = withTiming(0.5, {
      duration: 100,
    });
  }

  function close() {
    translateYBody.value = withTiming(0);
    translateYHeader.value = withTiming(0);
    backOpacity.value = withTiming(0);
  }

  const eventHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      if (event.translationY != undefined && event.translationY > 0) {
        translateYBody.value =
          -(props.headerHeight + bodyHeight) + event.translationY;
        translateYHeader.value =
          -(props.headerHeight + bodyHeight) + event.translationY;
      }
    },
    onEnd: (event) => {
      console.log('trasy', event.translationY);
      if (event.translationY > 100) {
        runOnJS(props.onClose)('close');
      } else runOnJS(open)();
    },
  });

  const header = (
    <View
      style={{
        flexDirection: 'column',
        height: props.headerHeight,
        padding: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 10,
          marginTop: 10,
          borderTopLeftRadius: props.radius,
          borderTopRightRadius: props.radius,
        }}
      >
        <View
          style={{
            width: 50,
            height: 5,
            borderRadius: 20,
            backgroundColor: props.theme.color.secondary100,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          marginLeft: 20,
          marginTop: -10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.children[0] /* all the buttons */}
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {/* Back */}
      <Animated.View
        onPress={() => props.onClose('close')}
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: props.theme.color.black,
            zIndex: 10,
          },
          backStyle,
        ]}
      ></Animated.View>

      <PanGestureHandler onGestureEvent={eventHandler}>
        {/* HEADER */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 20,
              backgroundColor: props.theme.color.secondary300,
              height: bodyHeight + props.headerHeight,
              bottom: -(props.headerHeight + bodyHeight),
              left: 0,
              right: 0,
              borderTopLeftRadius: props.radius,
              borderTopRightRadius: props.radius,
            },
            headerAnimatedStyle,
          ]}
        >
          {header}
        </Animated.View>
      </PanGestureHandler>
      {/* BODY */}
      <Animated.View
        onLayout={(event) => {
          let { x, y, height, width } = event.nativeEvent.layout;
          setBodyHeigth(height);
        }}
        style={[
          {
            position: 'absolute',
            zIndex: 30,
            backgroundColor: props.theme.secondary200,
            bottom: -(props.headerHeight + bodyHeight),
            left: 0,
            right: 0,
            borderTopLeftRadius: props.radius,
            borderTopRightRadius: props.radius,
            padding: 20,
          },
          bodyAnimatedStyle,
        ]}
      >
        {props.children[1]}
      </Animated.View>
    </View>
  );
}

export function ActionsheetButtonsList(props) {
  return props.children;
}

export function ActionsheetBody(props) {
  return props.children;
}

export function ActionsheetButton(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View
        style={{
          padding: 5,
          marginLeft: 10,
          borderRadius: 100,
        }}
      >
        <Image
          source={props.icon}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
