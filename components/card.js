import { height } from 'dom-helpers';
import { Center } from 'native-base';
import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import imageComparison from './imageComparison';
import Chart from './chart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { interpolate } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { withSpring, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

// const CAMERA_ICON = require('../assets/camera.png');
const DEMO_ICON = require('../assets/demoIcon.png');

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity)

export function Card(props) {
  const startImage = props.startImage;
  const endImage = props.endImage;
  const title = props.title;
  const data = props.data;
  const progress = props.progress; // % progress
  const margin = props.margin;
  const font = props.font;
  const onPress = props.onPress;
  const dayLeft = props.dayLeft;
  const cDate = props.cDate;

  const x = useSharedValue(0);
  const eventHandler = useAnimatedGestureHandler({

    onActive: (event, ctx) => {
      if (event.translationX != undefined && event.translationX < 0 && event.translationX > -100) {
        console.log("actualvalue", event.translationX)
        x.value = event.translationX;
      }
      if (event.translationX < -100) {
        console.log("vai a camera")
      }

    },
    onEnd: () => {
      x.value = withTiming(0)
    },
  });

  const swipableStyle = useAnimatedStyle(() => {
    // console.log("traslate of:", x.value)
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const deleteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
      width: -x.value,
      opacity: interpolate(x.value, [0, -100], [0, 1])
    };
  });

  const cameraIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(x.value, [0, -100], [0, 1]) }],
    };
  });
  return (

    <View style={{
      width: Dimensions.get('window').width - 2 * margin,
      margin: margin,
      zIndex: 100,
      flexDirection: 'row',
      alignItems: 'stretch'
    }}>

      <PanGestureHandler onGestureEvent={eventHandler} failOffsetY={[-5, 5]} activeOffsetX={[-5, 5]}>
        <TouchableAnimated
          onPress={onPress}
          style={[{
            width: Dimensions.get('window').width - 2 * margin,
          }, swipableStyle]
          }
        >

          {/* header  */}
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: props.theme.w,
                fontSize: 24,
                margin: 0,
                padding: 0,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: props.theme.w,
                margin: 0,
                padding: 5,
                backgroundColor: props.theme.s.c100,
                borderRadius: 20,
                marginLeft: 10,
                fontSize: 10,
              }}
            >
              {cDate}{' '}
            </Text>
          </View>
          {/* Main */}
          <View style={{ borderRadius: 20, backgroundColor: props.theme.p.c200 }}>
            {/* Image content */}
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={startImage}
                style={{
                  width: (Dimensions.get('window').width - 2 * margin) / 2,
                  height: Dimensions.get('window').width - 2 * margin,
                  borderTopLeftRadius: 20,
                  //   borderRadius: 20,
                  opacity: 0.6,
                }}
              />
              <Image
                source={endImage}
                style={{
                  width: (Dimensions.get('window').width - 2 * margin) / 2,
                  height: Dimensions.get('window').width - 2 * margin,
                  //   borderTopRightRadius: 20,
                  borderTopRightRadius: 20,
                  opacity: 0.6,
                }}
              />
            </View>
            {/* Info content */}
            <View
              style={{
                position: 'absolute',
                width: Dimensions.get('window').width - 2 * margin,
                bottom: 70,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Chart
                  maxValue={200}
                  height={50}
                  width={Dimensions.get('window').width - 2 * margin - 50}
                  data={data.y}
                  maxDisplayedData={30}
                  theme={props.theme}
                  strokeWidth={2}
                  opacityIn
                  scaleIn
                  focusData={[]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: props.theme.w, fontWeight: 'bold' }}>
                    START
                  </Text>
                  <Text style={{ color: props.theme.w }}>{data.startW} kg</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: props.theme.w, fontWeight: 'bold' }}>
                    ACTUAL
                  </Text>
                  <Text style={{ color: props.theme.w }}>{data.actualW} kg</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: props.theme.w, fontWeight: 'bold' }}>
                    DIFF
                  </Text>
                  <Text style={{ color: props.theme.w }}>{data.diffW} kg</Text>
                </View>
              </View>
            </View>
            {/* Progress bar */}
            <View
              style={{
                height: 40,
                backgroundColor: props.theme.p.c200,
                borderBottomStartRadius: 20,
                borderBottomEndRadius: 20,
              }}
            >
              {/* Actual progress */}
              <View
                style={{
                  height: 40,
                  width:
                    (progress / 100) *
                    (Dimensions.get('window').width - 2 * margin),
                  backgroundColor: props.theme.p.c100,
                  borderBottomStartRadius: 20,
                  borderBottomEndRadius: 20,
                  borderTopEndRadius: 20,
                }}
              ></View>
              {/* Text indicator wrap */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: Dimensions.get('window').width - 2 * margin,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: props.theme.w,
                    fontSize: 20,
                  }}
                >
                  {dayLeft > 0 ? `${dayLeft} days left` : 'Completed'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableAnimated>
      </PanGestureHandler>
      <Animated.View style={[{ overflow: "hidden", width: 0, justifyContent: 'center', alignItems: 'center' }, deleteStyle]} >
        <Animated.Image style={[{ width: 50, height: 50, margin: 10 }, cameraIconStyle]} source={DEMO_ICON} />
      </Animated.View>
    </View >

  ); r
}
