import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';
import Home from './components/home';
import Carousel from './components/carousel';
import ScrollNumberPicker from './components/scrollNumberPicker';
import ImageComparison from './components/imageComparison';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const before = require('./assets/before.png');
  const after = require('./assets/after.png');

  const Comparison = () => (
    <ImageComparison
      before={before}
      after={after}
      color={'#D8B6E3'}
      width={300}
      height={400}
    />
  );

  const Scroller = () => (
    <ScrollNumberPicker
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
    />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator swipeEnabled={false} style={{ marginTop: 50 }}>
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Carousel" component={Carousel} />
        <Tab.Screen name="Comparison" component={Comparison} />
        <Tab.Screen name="Scroller" component={Scroller} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
