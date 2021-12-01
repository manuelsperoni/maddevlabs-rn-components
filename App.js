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

  const Comparison_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <ImageComparison
        before={before}
        after={after}
        color={'#D8B6E3'}
        width={300}
        height={400}
      />
    </View>
  );

  const Scroller_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <ScrollNumberPicker
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        scale={1}
        startValue={60}
        bigSegmentHeight={50}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={2}
        spacing={26}
        mainTipWidth={20}
        mainTipHeight={80}
        mainTipColor={'#D8B6E3'}
        outlined
      />
    </View>
  );

  const Home_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <Home />
    </View>
  );
  const Carousel_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <Carousel />
    </View>
  );

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#171923' }}>
        <Tab.Navigator
          swipeEnabled={false}
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#1A202C',
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,
            },
            // tabBarLabelStyle: {
            //   color: 'white',
            // },
            tabBarActiveTintColor: '#D8B6E3',
            tabBarInactiveTintColor: '#4A5568',
            tabBarIndicatorStyle: { backgroundColor: '#D8B6E3' },
          }}
          style={{
            marginTop: 50,

            borderRadius: 30,
          }}
        >
          {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
          <Tab.Screen name="Home" component={Home_page} />
          <Tab.Screen name="Carousel" component={Carousel_page} />
          <Tab.Screen name="Comparison" component={Comparison_page} />
          <Tab.Screen name="Scroller" component={Scroller_page} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
