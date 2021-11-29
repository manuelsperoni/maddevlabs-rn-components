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
  let bigTickHeigth = props.bigTickHeigth;
  let tipIndicatorHeight = props.tipIndicatorHeight;
  let smallTickHeigth = props.smallTickHeigth;
  let tickColor = props.tickColor;
  let tipIndicatorColor = props.tipIndicatorColor;
  let udm = props.udm;
  let lowerBound = props.lowerBound;
  let upperBound = props.upperBound + 1;

  const style = {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    smallSegment: {
      width: 4,
      height: smallTickHeigth,
      backgroundColor: tickColor,
      borderRadius: 3,
      marginRight: 16,
    },
    bigSegment: {
      width: 4,
      height: bigTickHeigth,
      backgroundColor: tickColor,
      borderRadius: 3,
      marginRight: 16,
    },
    measureValue: {
      fontSize: 30,
      margin: 30,
      color: 'white',
    },
    fixStartEnd: {
      width: Dimensions.get('window').width / 2 - 2,
      height: bigTickHeigth,
    },
    mainTip: {
      position: 'absolute',
      top: 0,
      left: Dimensions.get('window').width / 2 - 10,
      width: 20,
      height: tipIndicatorHeight,
      borderColor: tipIndicatorColor,
      borderWidth: 4,
      borderRadius: 10,
    },
    scrollWrap: {
      height: bigTickHeigth,
      width: Dimensions.get('window').width,
      padding: 0,
      margin: 0,
    },
    scrollSelector: {
      justifyContents: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      heigth: bigTickHeigth,
      width: Dimensions.get('window').width,
    },
    externalWrap: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: tipIndicatorHeight,
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
    setMeasure(parseInt(translationY.value / 20) + lowerBound);
  };

  const scrollToNearestItem = (value) => {
    'worklet';
    let trasX = Math.round(value / 20) * 20;
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
              <View style={style.fixStartEnd}></View>
              {segmentArray.map((element, index) => {
                if (index % 10 == 0)
                  return (
                    <>
                      <View key={index}>{bigSegment}</View>
                    </>
                  );
                else return <>{smallSegment}</>;
              })}
              <View style={style.fixStartEnd}></View>
            </Animated.ScrollView>
          </View>
          <View style={style.mainTip}></View>
        </View>
      </View>
    </View>
  );
}
