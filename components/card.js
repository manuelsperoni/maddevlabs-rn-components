import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Chart from './chart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

const DEMO_ICON = require('../assets/camera.png');

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Card(props) {
  const startImage = props.startImage;
  const endImage = props.endImage;
  const title = props.title;
  const data = props.data;
  const progress = props.progress;
  const margin = props.margin;
  const onPress = props.onPress;
  const dayLeft = props.dayLeft;
  const cDate = props.cDate;

  const style = {
    header: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    headerTitle: {
      color: props.theme.w,
      fontSize: 24,
      margin: 0,
      padding: 0,
    },
    headerDate: {
      color: props.theme.w,
      margin: 0,
      padding: 5,
      backgroundColor: props.theme.s.c100,
      borderRadius: 20,
      marginLeft: 10,
      fontSize: 10,
    },
    container: {
      width: Dimensions.get('window').width - 2 * margin,
      margin: margin,
      zIndex: 100,
    },
    main: { position: 'absolute', zIndex: 2, top: 0, left: 0 },
    touchWrap: {
      width: Dimensions.get('window').width - 2 * margin,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
    },
    infoItem: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoItemTitle: { color: props.theme.color.white, fontWeight: 'bold' },
    infoItemValue: { color: props.theme.color.white },
    progressBar: {
      height: 40,
      backgroundColor: props.theme.p.c200,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
    },
    progressBarValue: {
      height: 40,
      width: (progress / 100) * (Dimensions.get('window').width - 2 * margin),
      backgroundColor: props.theme.p.c100,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      borderTopEndRadius: 20,
    },
    progressBarTextWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: Dimensions.get('window').width - 2 * margin,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressBarText: {
      color: props.theme.w,
      fontSize: 20,
    },
    backgroundSwipe: {
      borderTopEndRadius: 25,
      borderBottomEndRadius: 25,
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: props.theme.color.primary100,
      width: Dimensions.get('window').width - 2 * margin,
      height: Dimensions.get('window').width - 2 * margin + 40,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      zIndex: 1,
    },
    swipeIcon: { width: 50, height: 50, margin: 25 },
  };

  const x = useSharedValue(0);
  const eventHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      if (
        event.translationX != undefined &&
        event.translationX < 0 &&
        event.translationX > -100
      ) {
        console.log('actualvalue', event.translationX);
        x.value = event.translationX;
      }
      if (event.translationX < -100) {
        runOnJS(props.onSwipe)();
      }
    },
    onEnd: () => {
      x.value = withTiming(0);
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
      // transform: [{ translateX: x.value }],
      // width: -x.value,
      opacity: interpolate(x.value, [0, -100], [0, 1]),
    };
  });

  const cameraIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(x.value, [0, -100], [0, 1]) }],
    };
  });
  return (
    <View style={style.container}>
      {/* header  */}
      <View style={style.header}>
        <Text style={style.headerTitle}>{title}</Text>
        <Text style={style.headerDate}>{cDate} </Text>
      </View>
      {/* Main */}
      <View style={{ height: 400 }}>
        {/* Main content */}
        <View style={style.main}>
          <PanGestureHandler
            onGestureEvent={eventHandler}
            failOffsetY={[-5, 5]}
            activeOffsetX={[-5, 5]}
          >
            <TouchableAnimated
              onPress={onPress}
              style={[style.touchWrap, swipableStyle]}
            >
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: props.theme.p.c200,
                }}
              >
                {/* Image content */}
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={startImage}
                    style={{
                      width: (Dimensions.get('window').width - 2 * margin) / 2,
                      height: Dimensions.get('window').width - 2 * margin,
                      borderTopLeftRadius: 20,
                      opacity: 1,
                    }}
                  />
                  <Image
                    source={endImage}
                    style={{
                      width: (Dimensions.get('window').width - 2 * margin) / 2,
                      height: Dimensions.get('window').width - 2 * margin,
                      //   borderTopRightRadius: 20,
                      borderTopRightRadius: 20,
                      opacity: 1,
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
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                  >
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
                  <View style={style.info}>
                    <View style={style.infoItem}>
                      <Text style={style.infoItemTitle}>START</Text>
                      <Text style={style.infoItemValue}>{data.startW} kg</Text>
                    </View>
                    <View style={style.infoItem}>
                      <Text style={style.infoItemTitle}>ACTUAL</Text>
                      <Text style={style.infoItemValue}>{data.actualW} kg</Text>
                    </View>
                    <View style={style.infoItem}>
                      <Text style={style.infoItemTitle}>DIFF</Text>
                      <Text style={style.infoItemValue}>{data.diffW} kg</Text>
                    </View>
                  </View>
                </View>
                {/* Progress bar */}
                <View style={style.progressBar}>
                  {/* Actual progress */}
                  <View style={style.progressBarValue}></View>
                  {/* Text indicator wrap */}
                  <View style={style.progressBarTextWrap}>
                    <Text style={style.progressBarText}>
                      {dayLeft > 0 ? `${dayLeft} days left` : 'Completed'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableAnimated>
          </PanGestureHandler>
        </View>
        {/* Delete backgrond */}
        <Animated.View style={[style.backgroundSwipe, deleteStyle]}>
          <Animated.Image
            style={[style.swipeIcon, cameraIconStyle]}
            source={DEMO_ICON}
          />
        </Animated.View>
      </View>
    </View>
  );
}
