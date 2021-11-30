import MadScrollSelector from './madScrollSelector';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import Home from './home';
import Carousel from './carousel';
export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#171923',
      }}
    >
      {/* <MadScrollSelector
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        scale={0.1}
        startValue={40}
        bigSegmentHeight={70}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={4}
        spacing={15}
        mainTipWidth={20}
        mainTipHeight={100}
        mainTipColor={'#F6973F'}
        filled
      /> */}
      <MadScrollSelector
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        scale={1}
        startValue={100}
        bigSegmentHeight={70}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={2}
        spacing={26}
        mainTipWidth={40}
        mainTipHeight={100}
        mainTipColor={'#D8B6E3'}
        outlined
      />

      {/* <Home /> */}
      {/* <Carousel /> */}
    </SafeAreaView>
  );
}
