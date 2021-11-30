import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
  scrollTo,
} from 'react-native-reanimated';

const imageWidth = Dimensions.get('window').width - 100;
const spacing = 10;
const imageDistance = imageWidth + spacing;
const screenWidth = Dimensions.get('window').width;
const imageTest = require('./assets/test.png');
console.log(imageWidth, imageDistance);

export default function Carousel() {
  const translationX = useSharedValue(0);
  const animatedRef = useAnimatedRef();

  const scrollToNearestItem = (value) => {
    'worklet';
    let trasX = Math.round(value / imageDistance) * imageDistance;
    scrollTo(animatedRef, trasX, 0, true);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      scrollToNearestItem(event.contentOffset.x);
    },
  });

  // Dummy data for test purpose
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Image style
  const card = (
    <View style={style.card}>
      <Image source={imageTest} style={style.image}></Image>
      <Text style={{ padding: 20, color: 'white', fontSize: 30 }}> 55Kg</Text>
    </View>
  );

  return (
    <View style={style.wrap}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={animatedRef}
      >
        <View style={style.fixStart}></View>
        {dummyData.map((el, index) => {
          let a = useAnimatedStyle(() => {
            const actualPosX =
              index * imageDistance - translationX.value + screenWidth / 2;
            const isInView =
              (actualPosX + imageWidth / 2 > 0 &&
                actualPosX + imageWidth / 2 < screenWidth) ||
              (actualPosX - imageWidth / 2 < screenWidth &&
                actualPosX - imageWidth / 2 > 0);
            console.log(
              index,
              ' ',
              actualPosX + imageWidth / 2 + ' isInView',
              isInView
            );
            const leftIndex = Math.floor(translationX.value / imageDistance);
            const distRemainLeft = Math.abs(actualPosX - screenWidth / 2);

            return {
              transform: [
                {
                  scale: isInView
                    ? interpolate(
                        distRemainLeft,
                        [0, imageDistance * 2.5],
                        [1, 0.8]
                      )
                    : 1,
                },
              ],
              //   transform: [
              //     {
              //       translateY: isInView
              //         ? interpolate(
              //             distRemainLeft,
              //             [0, imageDistance * 2.5],
              //             [0, 0]
              //           )
              //         : 1,
              //     },
              //   ],

              opacity: isInView
                ? interpolate(distRemainLeft, [0, imageDistance * 1.2], [1, 0])
                : 1,
            };
          });
          return (
            <Animated.View style={a} key={index}>
              {card}
            </Animated.View>
          );
        })}
        <View style={style.fixEnd}></View>
      </Animated.ScrollView>
    </View>
  );
}

const style = {
  wrap: {
    // backgroundColor: 'red',
    width: Dimensions.get('window').width,
  },

  image: {
    height: 150,
    width: imageWidth,
    margin: 0,
    // backgroundColor: 'yellow',
    borderBottomWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    marginRight: spacing,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  fixStart: {
    width: (screenWidth - imageWidth) / 2,
    // backgroundColor: 'red',
  },
  fixEnd: {
    width: (screenWidth - (imageWidth - spacing)) / 2,
    // backgroundColor: 'blue',
  },
};
