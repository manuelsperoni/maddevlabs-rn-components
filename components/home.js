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

export default function Home(props) {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.y;
      console.log('translationY:', translationY.value);
    },
  });

  // Header component
  const header = (
    <View style={style.header}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../assets/logo.png')}
      />
    </View>
  );
  // Card style
  const card = <View style={style.card}></View>;
  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value
        },
      ],
      transform: [
        {
          scale: interpolate(translationY.value, [0, 50], [1, 0])

        },
      ], opacity: interpolate(translationY.value, [0, 20], [1, 0])

    };
  });

  return (
    <View style={style.wrap}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >

        <Animated.View style={headerStyle}>
          {header}
        </Animated.View>
        {props.children}


      </Animated.ScrollView>
    </View>
  );
}

const style = {
  wrap: {
    flex: 1,
    backgroundColor: '#171923',
    width: Dimensions.get('window').width,
  },
  header: {
    height: 130,
    width: Dimensions.get('window').width,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  card: {
    backgroundColor: '#1A202C',
    height: 150,
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderColor: '#171923',
  },
};
