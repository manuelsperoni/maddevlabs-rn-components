import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedRef,
  scrollTo,
  runOnUI,
} from 'react-native-reanimated';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import React from 'react';
import { useState, useEffect } from 'react';

function roundUp(numToRound, multiple) {
  let roundDown = Math.round(numToRound);
  return roundDown;
}

export default function ScrollNumberPicker(props) {
  const bigSegmentHeight = props.bigSegmentHeight;
  const mainTipHeight = props.mainTipHeight;
  const smallSegmentHeight = props.smallSegmentHeight;
  const udm = props.udm;
  const lowerBound = props.lowerBound;
  const upperBound = props.upperBound;
  const spacing = props.spacing;
  const segmentThikness = props.segmentThikness;
  const computedSegmentDistance = segmentThikness + spacing;
  const multipleBigSegment = props.multipleBigSegment;
  const mainTipWidth = props.mainTipWidth;
  const scale = props.scale;
  const startValue = props.startValue;

  const style = {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    smallSegment: {
      width: segmentThikness,
      height: smallSegmentHeight,
      backgroundColor: props.theme.color.secondary100,
      borderRadius: 3,
      marginRight: spacing,
    },
    bigSegment: {
      width: segmentThikness,
      height: bigSegmentHeight,
      backgroundColor: props.theme.color.secondary100,
      borderRadius: 3,
      marginRight: spacing,
    },
    measureValue: {
      fontSize: 30,
      margin: 30,
      color: props.theme.color.white,
    },
    fixStart: {
      width: Dimensions.get('window').width / 2 - segmentThikness / 2,
      height: bigSegmentHeight,
    },
    fixEnd: {
      width: Dimensions.get('window').width / 2 - segmentThikness / 2 - spacing,
      height: bigSegmentHeight,
    },
    mainTip: {
      position: 'absolute',
      top: 0,
      left: Dimensions.get('window').width / 2 - mainTipWidth / 2,
      width: mainTipWidth,
      height: mainTipHeight,
      borderColor: props.theme.color.primary100,
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: props.theme.color.primary200,
      zIndex: 10,
    },
    scrollWrap: {
      height: bigSegmentHeight,
      width: Dimensions.get('window').width,
      padding: 0,
      margin: 0,
      zIndex: 100,
    },
    scrollSelector: {
      justifyContents: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      heigth: bigSegmentHeight,
      width: Dimensions.get('window').width,
    },
    externalWrap: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: mainTipHeight,
    },
  };

  const nSegment = (upperBound - lowerBound) / scale;
  const smallSegment = <View style={style.smallSegment}></View>;
  const bigSegment = <View style={style.bigSegment}></View>;
  const segmentArray = new Array();
  for (let index = 0; index < nSegment + 1; index++) {
    segmentArray.push({});
  }
  const [measure, setMeasure] = useState(lowerBound);
  const animatedRef = useAnimatedRef();
  useEffect(() => {
    animatedRef.current.scrollTo({
      x: ((startValue - lowerBound) / scale) * computedSegmentDistance,
      y: 0,
    });
  }, []);

  const translationY = useSharedValue(0);
  const move = useSharedValue(10);

  let moveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: move.value }],
    };
  });

  const updateMeasure = () => {
    setMeasure(
      (
        Math.round(translationY.value / computedSegmentDistance) * scale +
        lowerBound
      ).toFixed(1)
    );
  };

  const scrollToNearestItem = (value) => {
    'worklet';
    let trasX =
      Math.round(value / computedSegmentDistance) * computedSegmentDistance;
    scrollTo(animatedRef, trasX, 0, true);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.x;
      runOnJS(updateMeasure)();
      // if (event.contentOffset.x > 30) move.value = -move.value;
    },
    onMomentumEnd: (event) => {
      scrollToNearestItem(event.contentOffset.x);
    },
  });

  return (
    <View style={style.container}>
      <Animated.Text style={[moveStyle, style.measureValue]}>
        {measure} {udm}
      </Animated.Text>
      <View style={style.scrollSelector}>
        <View style={style.externalWrap}>
          <View style={style.scrollWrap}>
            <Animated.ScrollView
              showsHorizontalScrollIndicator={false}
              ref={animatedRef}
              horizontal={true}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
            >
              <View style={style.fixStart}></View>
              {segmentArray.map((element, index) => {
                if (index % multipleBigSegment == 0)
                  return <View key={index}>{bigSegment}</View>;
                else return <View key={index}>{smallSegment}</View>;
              })}
              <View style={style.fixEnd}></View>
            </Animated.ScrollView>
          </View>
          <View style={style.mainTip}></View>
        </View>
      </View>
    </View>
  );
}
