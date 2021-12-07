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
import {
  BottomoModal,
  BottomModalButtonsList,
  BottomModalButton,
  BottomModalBody,
} from './components/bottomModal';
import { Actionsheet } from 'native-base';
import { useDisclose } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { Dialog } from './components/dialog';
import { Alert } from './components/alert';
import { Card } from './components/card';
import { Header, HeaderButton, HeaderButtonsList } from './components/header';
import { CButton, CButtonIcon } from './components/cButton';
import { PinchableImage } from './components/pinchableImage';
const Tab = createMaterialTopTabNavigator();
const BIN_ICON = require('./assets/bin.png');
const IMAGE_TEST = require('./assets/test.png');
const BEFORE_IMAGE = require('./assets/before.png');
const AFTER_IMAGE = require('./assets/after.png');
const BODY = require('./assets/body.png');

export default function App() {
  /* Some dummy data for the componments demo*/

  const before = require('./assets/before.png');
  const after = require('./assets/after.png');
  let y = [];
  for (let index = 0; index < 10; index++) {
    y.push(Math.floor(Math.random() * 200));
  }
  const [randomData, setRandomData] = useState(y);
  const [modalState, setModalState] = useState('close');
  const [dialogState, setDialogState] = useState('close');

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
        pickerColor={'#D8B6E3'}
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
        scale={0.1}
        startValue={60}
        bigSegmentHeight={30}
        smallSegmentHeight={15}
        segmentColor={'#4A5568'}
        segmentThikness={1}
        spacing={10}
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
  const { isOpen, onOpen, onClose } = useDisclose();
  const BottomoModal_page = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <Button
        color="#D8B6E3"
        title="Open"
        onPress={() => {
          setModalState(Math.random());
        }}
      />

      <View style={{ flex: 1 }}>
        <BottomoModal
          radius={20}
          headerBgColor={'#171923'}
          bodyBgColor={'#1A202C'}
          headerHeight={60}
          bodyHeight={200}
          state={modalState}
          onClose={setModalState}
        >
          <BottomModalButtonsList headerHeight={60}>
            <BottomModalButton
              icon={BIN_ICON}
              onPress={() => console.log('pressed')}
            />
            <BottomModalButton
              icon={BIN_ICON}
              onPress={() => console.log('pressed')}
            />
            <BottomModalButton
              icon={BIN_ICON}
              onPress={() => console.log('pressed')}
            />
          </BottomModalButtonsList>
          <BottomModalBody>
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
          </BottomModalBody>
        </BottomoModal>
      </View>
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
  const Chart_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171923',
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

      <Grid position="center" spacing={100} gridColor={'#4A5568'}>
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
      {/* <Grid position="center" spacing={50} color={'#4A5568'}>
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
      </Grid> */}
      {/* <Grid position="center" spacing={10} color={'#4A5568'}>
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
      </Grid> */}
    </View>
  );
  const Dialog_page = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <Button
        color="#D8B6E3"
        title="Open"
        onPress={() => {
          setDialogState(true);
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Dialog
          bg={'#1A202C'}
          message="Are you sure to confirm something ?"
          state={dialogState}
          onClose={setDialogState}
          onConfirm={() => {}}
          onDeny={() => {}}
          confirmLabel={'Yes'}
          denyLabel={'No'}
          font={{ family: 'Arial', size: 20, color: 'white' }}
        />
      </View>
    </View>
  );

  const Alert_page = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <Button
        color="#D8B6E3"
        title="Open"
        onPress={() => {
          setDialogState(true);
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Alert
          bg={'#EA7D7D'}
          title="Ops, something went wrong! "
          message="#Generic errror code 101 "
          state={dialogState}
          onClose={setDialogState}
          font={{ family: 'Arial', size: 20, color: 'white' }}
        />
      </View>
    </View>
  );

  const Card_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A202C',
      }}
    >
      <ScrollView>
        <Card
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          color={{ p100: '#D8B6E3', p200: '#6C617B', s100: '#4A5568' }}
          font={{ family: 'Arial', size: 20, color: 'white' }}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <Card
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          color={{ p100: '#D8B6E3', p200: '#6C617B', s100: '#4A5568' }}
          font={{ family: 'Arial', size: 20, color: 'white' }}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <Card
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={100}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          color={{ p100: '#D8B6E3', p200: '#6C617B', s100: '#4A5568' }}
          font={{ family: 'Arial', size: 20, color: 'white' }}
          onPress={() => {}}
          dayLeft={0}
          cDate={'12/12/2021'}
        />
      </ScrollView>
    </View>
  );

  const Header_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A202C',
      }}
    >
      <Header title={'Header title '} height={80} font={{ color: 'white' }}>
        <HeaderButtonsList>
          <HeaderButton
            icon={BIN_ICON}
            onPress={() => console.log('pressed')}
          />
          <HeaderButton
            icon={BIN_ICON}
            onPress={() => console.log('pressed')}
          />
        </HeaderButtonsList>
      </Header>
    </View>
  );

  const Pinchable_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A202C',
      }}
    >
      <PinchableImage
        image={AFTER_IMAGE}
        width={Dimensions.get('window').width}
        height={(Dimensions.get('window').width * 4) / 3}
      />
    </View>
  );

  const Buttons_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A202C',
      }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton title={'Clickme'} outlined color={'#D8B6E3'} s margin={5} />
        <CButton title={'Clickme'} outlined color={'#D8B6E3'} m margin={5} />
        <CButton title={'Clickme'} outlined color={'#D8B6E3'} l margin={5} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton title={'Clickme'} filled color={'#D8B6E3'} s margin={5} />
        <CButton title={'Clickme'} filled color={'#D8B6E3'} m margin={5} />
        <CButton title={'Clickme'} filled color={'#D8B6E3'} l margin={5} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton title={'Clickme'} ghost color={'#D8B6E3'} s margin={5} />
        <CButton title={'Clickme'} ghost color={'#D8B6E3'} m margin={5} />
        <CButton title={'Clickme'} ghost color={'#D8B6E3'} l margin={5} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          outlined
          color={'#D8B6E3'}
          s
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          outlined
          color={'#D8B6E3'}
          m
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          outlined
          color={'#D8B6E3'}
          l
          margin={5}
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          filled
          color={'#D8B6E3'}
          s
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          filled
          color={'#D8B6E3'}
          m
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          filled
          color={'#D8B6E3'}
          l
          margin={5}
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          ghost
          color={'#D8B6E3'}
          s
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          ghost
          color={'#D8B6E3'}
          m
          margin={5}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={BIN_ICON}
          ghost
          color={'#D8B6E3'}
          l
          margin={5}
        />
      </View>
    </View>
  );
  const [showChart, setShowChart] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);
  return (
    <NativeBaseProvider>
      {/* <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: '#171923' }}>
          <Tab.Navigator
            presentation={'modal'}
            screenOptions={{
              // unmountOnBlur: true,
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
      </NavigationContainer> */}
      <View
        style={{
          paddingVertical: 40,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#171923',
        }}
      >
        <Button
          title="Chart"
          onPress={() =>
            setShowChart([
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Modal"
          onPress={() =>
            setShowChart([
              false,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Home"
          onPress={() =>
            setShowChart([
              false,
              false,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Comparison"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Carousel"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Scroller"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Dialog"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              false,
              false,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Alert"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              false,
              false,
              false,
            ])
          }
        />
        <Button
          title="Card"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              false,
              false,
            ])
          }
        />
        <Button
          title="Header"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              false,
              false,
            ])
          }
        />
        <Button
          title="Buttons"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              true,
              false,
            ])
          }
        />
        <Button
          title="Pinchable"
          onPress={() =>
            setShowChart([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              true,
            ])
          }
        />
      </View>
      {showChart[0] && Chart_page()}
      {showChart[1] && BottomoModal_page()}
      {showChart[2] && Home_page()}
      {showChart[3] && Comparison_page()}
      {showChart[4] && Carousel_page()}
      {showChart[5] && Scroller_page()}
      {showChart[6] && Dialog_page()}
      {showChart[7] && Alert_page()}
      {showChart[8] && Card_page()}
      {showChart[9] && Header_page()}
      {showChart[10] && Buttons_page()}
      {showChart[11] && Pinchable_page()}
    </NativeBaseProvider>
  );
}
