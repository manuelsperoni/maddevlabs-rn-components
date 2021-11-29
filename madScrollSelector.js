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
import { useState } from 'react';

function roundUp(numToRound, multiple) {
  let roundDown = Math.round(numToRound);
  return roundDown;
}

export default function MadScrollSelector(props) {
  const bigSegmentHeight = props.bigSegmentHeight;
  const mainTipHeight = props.mainTipHeight;
  const smallSegmentHeight = props.smallSegmentHeight;
  const segmentColor = props.segmentColor;
  const mainTipColor = props.mainTipColor;
  const udm = props.udm;
  const lowerBound = props.lowerBound;
  const upperBound = props.upperBound + 1;
  const spacing = props.spacing;
  const segmentThikness = props.segmentThikness;
  const computedSegmentDistance = segmentThikness + spacing;
  const multipleBigSegment = props.multipleBigSegment;
  const mainTipWidth = props.mainTipWidth;

  const style = {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    smallSegment: {
      width: segmentThikness,
      height: smallSegmentHeight,
      backgroundColor: segmentColor,
      borderRadius: 3,
      marginRight: spacing,
    },
    bigSegment: {
      width: segmentThikness,
      height: bigSegmentHeight,
      backgroundColor: segmentColor,
      borderRadius: 3,
      marginRight: spacing,
    },
    measureValue: {
      fontSize: 30,
      margin: 30,
      color: 'white',
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
      borderColor: mainTipColor,
      borderWidth: 2,
      borderRadius: 10,
      // backgroundColor: mainTipColor,
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

  const nSegment = upperBound - lowerBound;
  const smallSegment = <View style={style.smallSegment}></View>;
  const bigSegment = <View style={style.bigSegment}></View>;
  const segmentArray = new Array();
  for (let index = 0; index < nSegment; index++) {
    segmentArray.push({});
  }
  const [measure, setMeasure] = useState(lowerBound);
  const animatedRef = useAnimatedRef();
  const translationY = useSharedValue(0);

  const updateMeasure = () => {
    setMeasure(
      parseInt(translationY.value / computedSegmentDistance) + lowerBound
    );
  };

  const scrollToNearestItem = (value) => {
    'worklet';
    let trasX =
      Math.round(value / computedSegmentDistance) * computedSegmentDistance;
    scrollTo(animatedRef, trasX, 0, false);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.x;
      runOnJS(updateMeasure)();
    },
    onMomentumEnd: (event) => {
      scrollToNearestItem(event.contentOffset.x);
    },
    onBeginDrag: (event) => {
      scrollToNearestItem(event.contentOffset.x);
      console.log('ENDDRAG');
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.measureValue}>
        {measure} {udm}
      </Text>
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
                  return (
                    <>
                      <View key={index}>{bigSegment}</View>
                    </>
                  );
                else return <>{smallSegment}</>;
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
