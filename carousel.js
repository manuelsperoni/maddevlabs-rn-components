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
} from 'react-native-reanimated';

const imageWidth = Dimensions.get('window').width - 100 + 30;
const screenWidth = Dimensions.get('window').width + 30;
const imageTest = require('./assets/test.png');

export default function Carousel() {
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationX.value = event.contentOffset.x;
      console.log('translationX:', translationX.value);
    },
  });

  // Dummy data for test purpose
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Image style
  const card = (
    <View style={style.card}>
      <Text style={{ padding: 10, color: 'white', fontSize: 12 }}>
        21 Sept 2022
      </Text>
      <Image source={imageTest} style={style.image}></Image>
      <Text style={{ padding: 10, color: 'white', fontSize: 30 }}> 55Kg</Text>
    </View>
  );

  return (
    <View style={style.wrap}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {dummyData.map((el, index) => {
          let a = useAnimatedStyle(() => {
            const leftIndex = Math.floor(translationX.value / imageWidth);
            const rightIndex = leftIndex + 2;
            const distRemainLeft =
              (leftIndex + 1) * imageWidth - translationX.value;

            return {
              transform: [
                {
                  scale:
                    index === leftIndex
                      ? interpolate(distRemainLeft, [0, imageWidth], [0.7, 1])
                      : 1,
                },
              ],

              opacity:
                index === leftIndex
                  ? interpolate(distRemainLeft, [0, imageWidth], [0, 1])
                  : 1,
            };
          });
          return (
            <Animated.View style={a} key={index}>
              {card}
            </Animated.View>
          );
        })}
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
    height: 400,
    width: Dimensions.get('window').width - 100,
    margin: 0,
    // backgroundColor: 'yellow',
    borderBottomWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    margin: 15,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
};
