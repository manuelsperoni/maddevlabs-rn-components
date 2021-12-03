import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';
import Home from './components/home';
import Carousel from './components/carousel';
import ScrollNumberPicker from './components/scrollNumberPicker';
import ImageComparison from './components/imageComparison';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Chart from './components/chart';
import { useState } from 'react';
import { Button } from 'react-native';
import Grid from './components/grid';
import BottomoModal from './components/bottomModal';
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const before = require('./assets/before.png');
  const after = require('./assets/after.png');
  let y = [];
  for (let index = 0; index < 10; index++) {
    y.push(Math.floor(Math.random() * 200));
  }

  const [randomData, setRandomData] = useState(y);

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
        multipleBigSegment={20}
        udm={''}
        scale={1}
        startValue={60}
        bigSegmentHeight={30}
        smallSegmentHeight={15}
        segmentColor={'#4A5568'}
        segmentThikness={1}
        spacing={26}
        mainTipWidth={20}
        mainTipHeight={80}
        mainTipColor={'#D8B6E3'}
        filled
      />
      <ScrollNumberPicker
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={''}
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
      <ScrollNumberPicker
        lowerBound={40}
        upperBound={100}
        multipleBigSegment={10}
        udm={''}
        scale={1}
        startValue={60}
        bigSegmentHeight={50}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={2}
        spacing={10}
        mainTipWidth={5}
        mainTipHeight={50}
        mainTipColor={'#D8B6E3'}
        outlined
      />
    </View>
  );
  const BottomoModal_page = () => (
    <BottomoModal
      radius={20}
      headerColor={'#171923'}
      bodyColor={'#1A202C'}
      headerHeight={60}
      bodyHeight={200}
    >
      <Text style={{ color: 'white' }}>Hello i'am a custom Modal</Text>
    </BottomoModal>
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
  const Chart_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <View style={{ margin: 10 }}>
        <Button
          color="#D8B6E3"
          margin={30}
          title="Generate random data"
          onPress={() => {
            let y = [];
            for (let index = 0; index < 10; index++) {
              y.push(Math.floor(Math.random() * 200));
            }
            setRandomData(y);
          }}
        />
      </View>

      <Grid position="center" spacing={100} color={'#4A5568'}>
        <Chart
          maxValue={200}
          height={Dimensions.get('window').height / 7}
          width={Dimensions.get('window').width}
          data={y}
          maxDisplayedData={30}
          fill={'#6C617B'}
          stroke={'#D8B6E3'}
          strokeWidth={2}
          opacityIn
          scaleIn
          focusData={[
            {
              value: Math.random() * 200,
              label: 'Start',
              align: 'left',
              color: '#4A5568',
            },
            {
              value: Math.random() * 200,
              label: 'Actual',
              align: 'left',
              color: '#D8B6E3',
            },
            {
              value: Math.random() * 200,
              label: 'End',
              align: 'right',
              color: '#4A5568',
            },
          ]}
        />
      </Grid>
      <Grid position="center" spacing={50} color={'#4A5568'}>
        <Chart
          maxValue={200}
          height={Dimensions.get('window').height / 7}
          width={Dimensions.get('window').width}
          data={y}
          maxDisplayedData={30}
          fill={'#6C617B'}
          stroke={'#D8B6E3'}
          strokeWidth={2}
          opacityIn
          scaleIn
          focusData={[
            {
              value: Math.random() * 200,
              label: 'Start',
              align: 'left',
              color: '#4A5568',
            },
            {
              value: Math.random() * 200,
              label: 'Actual',
              align: 'left',
              color: '#D8B6E3',
            },
            {
              value: Math.random() * 200,
              label: 'End',
              align: 'right',
              color: '#4A5568',
            },
          ]}
        />
      </Grid>
      <Grid position="center" spacing={10} color={'#4A5568'}>
        <Chart
          maxValue={200}
          height={Dimensions.get('window').height / 7}
          width={Dimensions.get('window').width}
          data={y}
          maxDisplayedData={30}
          fill={'#6C617B'}
          stroke={'#D8B6E3'}
          strokeWidth={2}
          opacityIn
          scaleIn
          focusData={[
            {
              value: Math.random() * 200,
              label: 'Start',
              align: 'left',
              color: '#4A5568',
            },
            {
              value: Math.random() * 200,
              label: 'Actual',
              align: 'left',
              color: '#D8B6E3',
            },
            {
              value: Math.random() * 200,
              label: 'End',
              align: 'right',
              color: '#4A5568',
            },
          ]}
        />
      </Grid>
    </View>
  );

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#171923' }}>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: true,
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
          <Tab.Screen name="Modal" component={BottomoModal_page} />
          <Tab.Screen name="Chart" component={Chart_page} />
          <Tab.Screen name="Home" component={Home_page} />
          <Tab.Screen name="Carousel" component={Carousel_page} />
          <Tab.Screen name="Comparison" component={Comparison_page} />
          <Tab.Screen name="Scroller" component={Scroller_page} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
