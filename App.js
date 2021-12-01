import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import Home from './components/home';
import Carousel from './components/carousel';
import MadScrollSelector from './components/madScrollSelector';
import ImageComparison from './components/imageComparison';

export default function App() {
  const before = require('./assets/before.png');
  const after = require('./assets/after.png');
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
      {/* <MadScrollSelector
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        scale={0.1}
        startValue={60}
        bigSegmentHeight={30}
        smallSegmentHeight={15}
        segmentColor={'#4A5568'}
        segmentThikness={2}
        spacing={26}
        mainTipWidth={20}
        mainTipHeight={50}
        mainTipColor={'#D8B6E3'}
        outlined
      /> */}

      {/* <Home /> */}
      {/* <Carousel /> */}
      <ImageComparison
        before={before}
        after={after}
        color={'#D8B6E3'}
        width={300}
        height={400}
      />
    </SafeAreaView>
  );
}
