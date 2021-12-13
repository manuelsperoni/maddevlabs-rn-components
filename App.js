import React from 'react';
import { Dimensions, SafeAreaView, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  Actionsheet,
  ActionsheetButtonsList,
  ActionsheetButton,
  ActionsheetBody,
} from './components/actionsheet';
import { NativeBaseProvider } from 'native-base';
import { Dialog } from './components/dialog';
import { Alert } from './components/alert';
import { SwipableCard } from './components/swipableCard';
import { Header, HeaderButton, HeaderButtonsList } from './components/header';
import { CButton, CButtonIcon } from './components/cButton';
import { PinchableImage } from './components/pinchableImage';
import { Main } from './components/main';
import { SettingItem } from './components/settingsItem';
import { SpinningWheel } from './components/spinningWheel';
const DEMO_ICON = require('./assets/demoIcon.png');
const BEFORE_IMAGE = require('./assets/before.png');
const AFTER_IMAGE = require('./assets/after.png');
const BODY = require('./assets/body.png');
const LANG = require('./assets/iconLang.png');

const APP_THEME = {
  color: {
    primary100: '#D8B6E3',
    primary200: '#6C617B',
    primary300: 'yellow',
    secondary100: '#4A5568',
    secondary200: '#1A202C',
    secondary300: '#171923',
    white: 'white',
    black: 'black',
    green: 'green',
    red: 'red',
  },
  font: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    family: 'Roboto',
  },
};

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
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <ImageComparison
        before={before}
        after={after}
        pickerColor={'#D8B6E3'}
        width={300}
        height={400}
        theme={APP_THEME}
      />
    </View>
  );

  const Scroller_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
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
        spacing={12}
        mainTipWidth={20}
        mainTipHeight={80}
        mainTipColor={'#D8B6E3'}
        outlined
        theme={APP_THEME}
      />
    </View>
  );

  const Actionsheet_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <CButton
        title={'Open'}
        outlined
        s
        margin={5}
        theme={APP_THEME}
        onPress={() => {
          setModalState('open');
        }}
      />

      <View style={{ flex: 1 }}>
        <Actionsheet
          radius={20}
          headerBgColor={'#171923'}
          bodyBgColor={'#1A202C'}
          headerHeight={80}
          bodyHeight={200}
          state={modalState}
          onClose={setModalState}
          theme={APP_THEME}
        >
          <ActionsheetButtonsList headerHeight={60}>
            <ActionsheetButton
              icon={DEMO_ICON}
              onPress={() => console.log('pressed')}
            />
            <ActionsheetButton
              icon={DEMO_ICON}
              onPress={() => console.log('pressed')}
            />
            <ActionsheetButton
              icon={DEMO_ICON}
              onPress={() => console.log('pressed')}
            />
          </ActionsheetButtonsList>
          <ActionsheetBody>
            <SettingItem
              icon={LANG}
              theme={APP_THEME}
              title={'Setting title'}
              value={'Value'}
            />
            <SettingItem
              icon={LANG}
              theme={APP_THEME}
              title={'Setting title'}
              value={'Value'}
            />
            <SettingItem
              icon={LANG}
              theme={APP_THEME}
              title={'Setting title'}
              value={'Value'}
            />
            <SettingItem
              icon={LANG}
              theme={APP_THEME}
              title={'Setting title'}
              value={'Value'}
            />
          </ActionsheetBody>
        </Actionsheet>
      </View>
    </View>
  );

  const Home_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <Home theme={APP_THEME}>
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={100}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={0}
          cDate={'12/12/2021'}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={100}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={0}
          cDate={'12/12/2021'}
        />
      </Home>
    </View>
  );
  const Carousel_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <Carousel theme={APP_THEME} />
    </View>
  );
  const Chart_page = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <View>
        <CButton
          title={'Generete random data'}
          outlined
          m
          margin={15}
          theme={APP_THEME}
          disabled={false}
          onPress={() => {
            let y = [];
            for (let index = 0; index < 10; index++) {
              y.push(Math.floor(Math.random() * 200));
            }
            setRandomData(y);
          }}
        />
      </View>

      <Grid
        position="center"
        spacing={100}
        gridColor={'#4A5568'}
        theme={APP_THEME}
      >
        <Chart
          theme={APP_THEME}
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
  const Dialog_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <CButton
        title={'Open'}
        outlined
        s
        margin={5}
        theme={APP_THEME}
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
          theme={APP_THEME}
          bg={'#1A202C'}
          message="Are you sure to confirm something ?"
          state={dialogState}
          onClose={setDialogState}
          onConfirm={() => {}}
          onDeny={() => {}}
          confirmLabel={'Yes'}
          denyLabel={'No'}
        />
      </View>
    </View>
  );

  const Alert_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <CButton
        title={'Open'}
        outlined
        s
        margin={5}
        theme={APP_THEME}
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
          theme={APP_THEME}
          bg={'#EA7D7D'}
          title="Ops, something went wrong! "
          message="#Generic errror code 101 "
          state={dialogState}
          onClose={setDialogState}
        />
      </View>
    </View>
  );

  const Card_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
          onSwipe={() => {
            console.log('changeComponent'); /*setComponent(1)*/
          }}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={10}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={10}
          cDate={'12/12/2021'}
          onSwipe={() => console.log('swipeeee end')}
        />
        <SwipableCard
          theme={APP_THEME}
          startImage={BEFORE_IMAGE}
          endImage={AFTER_IMAGE}
          progress={100}
          title={'Shred summer'}
          data={{ y: randomData, startW: 10, actualW: 30, diffW: 3 }}
          margin={20}
          onPress={() => {}}
          dayLeft={0}
          cDate={'12/12/2021'}
          onSwipe={() => console.log('swipeeee end')}
        />
      </ScrollView>
    </View>
  );

  const Header_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <Header title={'Header title '} height={80} theme={APP_THEME}>
        <HeaderButtonsList>
          <HeaderButton
            icon={DEMO_ICON}
            onPress={() => console.log('pressed')}
          />
          <HeaderButton
            icon={DEMO_ICON}
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
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <PinchableImage
        theme={APP_THEME}
        image={BODY}
        width={Dimensions.get('window').width}
        height={(Dimensions.get('window').width * 4) / 3}
      />
    </View>
  );

  const Buttons_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton
          title={'Clickme'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          disabled={true}
        />
        <CButton
          title={'Clickme'}
          outlined
          m
          margin={5}
          theme={APP_THEME}
          disabled={true}
        />
        <CButton
          title={'Clickme'}
          outlined
          l
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          disabled={true}
          squared
        />
        <CButton
          title={'Clickme'}
          outlined
          m
          margin={5}
          theme={APP_THEME}
          disabled={true}
          squared
        />
        <CButton
          title={'Clickme'}
          outlined
          l
          margin={5}
          theme={APP_THEME}
          disabled={false}
          squared
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton
          title={'Clickme'}
          filled
          s
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          filled
          m
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          filled
          l
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          filled
          s
          margin={5}
          theme={APP_THEME}
          disabled={false}
          squared
        />
        <CButton
          title={'Clickme'}
          filled
          m
          margin={5}
          theme={APP_THEME}
          disabled={false}
          squared
        />
        <CButton
          title={'Clickme'}
          filled
          l
          margin={5}
          theme={APP_THEME}
          disabled={false}
          squared
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButton
          title={'Clickme'}
          ghost
          s
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          ghost
          m
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
        <CButton
          title={'Clickme'}
          ghost
          l
          margin={5}
          theme={APP_THEME}
          disabled={false}
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          s
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          m
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          l
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          s
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          m
          margin={5}
          theme={APP_THEME}
          squared
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          outlined
          l
          margin={5}
          theme={APP_THEME}
          squared
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          s
          margin={5}
          theme={APP_THEME}
          disabled={true}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          m
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          l
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          s
          margin={5}
          theme={APP_THEME}
          disabled={true}
          squared
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          m
          margin={5}
          theme={APP_THEME}
          squared
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          filled
          l
          margin={5}
          theme={APP_THEME}
          squared
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          ghost
          s
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          ghost
          m
          margin={5}
          theme={APP_THEME}
        />
        <CButtonIcon
          title={'Clickme'}
          icon={DEMO_ICON}
          ghost
          l
          margin={5}
          theme={APP_THEME}
        />
      </View>
    </View>
  );

  const Main_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <Main theme={APP_THEME}>
        <SettingItem
          icon={LANG}
          theme={APP_THEME}
          title={'Setting title'}
          value={'Value'}
        />
        <SettingItem
          icon={LANG}
          theme={APP_THEME}
          title={'Setting title'}
          value={'Value'}
        />
        <SettingItem
          icon={LANG}
          theme={APP_THEME}
          title={'Setting title'}
          value={'Value'}
        />
        <SettingItem
          icon={LANG}
          theme={APP_THEME}
          title={'Setting title'}
          value={'Value'}
        />
      </Main>
    </View>
  );

  const SpinningWheel_page = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_THEME.color.secondary300,
      }}
    >
      <SpinningWheel state={'visible'} />
    </View>
  );

  const [component, setComponent] = useState('9');

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
        <CButton
          title={'Chart'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(1)}
        />
        <CButton
          title={'Actionsheet'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(2)}
        />
        <CButton
          title={'Home'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(3)}
        />
        <CButton
          title={'B&A'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(4)}
        />
        <CButton
          title={'Carousel'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(5)}
        />
        <CButton
          title={'Scroller'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(6)}
        />
        <CButton
          title={'Dialog'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(7)}
        />
        <CButton
          title={'Alert'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(8)}
        />
        <CButton
          title={'Card'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(9)}
        />
        <CButton
          title={'Header'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(10)}
        />
        <CButton
          title={'Buttons'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(11)}
        />
        <CButton
          title={'Pinchable'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(12)}
        />
        <CButton
          title={'Main/SettingItem'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(13)}
        />
        <CButton
          title={'SpinWheel'}
          outlined
          s
          margin={5}
          theme={APP_THEME}
          onPress={() => setComponent(14)}
        />
      </View>
      {component == 1 && Chart_page()}
      {component == 2 && Actionsheet_page()}
      {component == 3 && Home_page()}
      {component == 4 && Comparison_page()}
      {component == 5 && Carousel_page()}
      {component == 6 && Scroller_page()}
      {component == 7 && Dialog_page()}
      {component == 8 && Alert_page()}
      {component == 9 && Card_page()}
      {component == 10 && Header_page()}
      {component == 11 && Buttons_page()}
      {component == 12 && Pinchable_page()}
      {component == 13 && Main_page()}
      {component == 14 && SpinningWheel_page()}
    </NativeBaseProvider>
  );
}
