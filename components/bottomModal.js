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
import { unmountComponentAtNode } from 'react-dom';
import { Actionsheet } from 'native-base';

const CLOSE_ICON = require('../assets/close.png');
export default function BottomoModal(props) {
  const headerHeight = props.headerHeight;
  const radius = props.radius;
  const headerColor = props.headerColor;
  const bodyColor = props.bodyColor;
  const bodyHeight = props.bodyHeight;
  const state = props.state;
  const translateYBody = useSharedValue(0);
  const translateYHeader = useSharedValue(0);
  const backOpacity = useSharedValue(0);

  //   let header;
  //   let body;
  //   props.children.forEach((element) => {
  //     console.log(element.type.displayName);
  //   });

  if (state == 'open') {
    open();
    console.log('opening...');
  } else {
    close();
    console.log('closing...');
  }

  useEffect(() => {
    console.log('########## MOUTED COMPONENT');

    return () => {
      console.log('########## UNMOUNTING COMPONENT');
    };
  }, []);

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
    translateYBody.value = withDelay(
      100,
      withSpring(-(headerHeight + bodyHeight)),
      {
        duration: 200,
      }
    );
    translateYHeader.value = withDelay(
      0,
      withSpring(-(headerHeight + bodyHeight), {
        duration: 200,
      })
    );

    backOpacity.value = withTiming(0.5, {
      duration: 100,
    });
  }

  function close() {
    translateYBody.value = withDelay(0, withSpring(0), {
      duration: 300,
    });
    translateYHeader.value = withDelay(50, withSpring(0), {
      duration: 300,
    });
    backOpacity.value = withTiming(0, {
      duration: 100,
    });
  }

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const header = (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: headerHeight,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      ></View>
      <TouchableOpacity onPress={() => close()}>
        <View
          style={{
            padding: 5,
            // backgroundColor: bodyColor,
            marginRight: 10,
            borderRadius: 100,
          }}
        >
          <Image
            source={CLOSE_ICON}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </TouchableOpacity>
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
        height: 300,
        borderRadius: 40,

        backgroundColor: 'red',
      }}
    >
      {/* Back */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 10,
          },
          backStyle,
        ]}
      >
        {/* <AnimatedTouchable
          onPress={() => close()}
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: 'red',
              zIndex: 10,
            },
          ]}
        ></AnimatedTouchable> */}
      </Animated.View>
      {/* <View style={{ position: 'absolute', zIndex: 10000 }}>
        <Button
          color="#D8B6E3"
          title="Open"
          onPress={() => {
            open();
          }}
        />
        <Button
          color="#D8B6E3"
          title="Open"
          onPress={() => {
            close();
          }}
        />
      </View> */}

      {/* HEADER */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 20,
            backgroundColor: headerColor,
            height: bodyHeight + headerHeight,
            bottom: -(headerHeight + bodyHeight),
            left: 0,
            right: 0,
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
          },
          headerAnimatedStyle,
        ]}
      >
        {header}
      </Animated.View>
      {/* BODY */}
      <Animated.View
        onLayout={(event) => {
          //   let { x, y, height, width } = event.nativeEvent.layout;
          //   setBodyHeigth(height);
        }}
        style={[
          {
            position: 'absolute',
            zIndex: 30,
            backgroundColor: bodyColor,
            height: bodyHeight,
            bottom: -(headerHeight + bodyHeight),
            left: 0,
            right: 0,
            borderRadius: radius,
            padding: 20,
            // backgroundColor: 'red',
          },
          bodyAnimatedStyle,
        ]}
      >
        {props.children}
      </Animated.View>
    </View>
  );
}
