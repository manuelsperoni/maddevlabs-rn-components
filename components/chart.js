import React from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import Svg from 'react-native-svg';
import { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Dash from 'react-native-dash';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
  withTiming,
  color,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function Chart(props) {
  // Config
  let height = props.height;
  const width = props.width;
  const maxDisplayedData = props.maxDisplayedData;
  const rawData = props.data;
  const fill = props.fill;
  const stroke = props.stroke;
  const strokeWidth = props.strokeWidth;
  const gridSpacing = props.gridSpacing;
  const gridColor = props.gridColor;
  const gridVisible = props.gridVisible;
  const position = props.position;
  const focusData = props.focusData;
  const maxValue = props.maxValue;
  const peackSmothness = 2;

  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  /* MAIN CHART PROCESSING*/
  //naive data downsampling , if data less than max take every data otherwise sample every nth elem
  const y = [];
  const nth =
    rawData.length >= maxDisplayedData
      ? Math.floor(rawData.length / maxDisplayedData)
      : 1; // every nth take a value
  rawData.forEach((elem, index) => {
    if (index % nth === 0) y.push(elem);
  });

  // invert y axis and scale to view heigth
  // let maxValue = Math.max(...y);
  y.forEach((elem, index) => {
    y[index] = (y[index] / maxValue) * height;
  });

  let initialXscale = width / (y.length - 1);

  /* FOCUS POINT PROCESSING*/
  const focusPointLine = [...focusData].map((elem, index) => {
    let scaledValue = (elem.value / maxValue) * height;
    return (
      <View
        key={index}
        style={{
          position: 'absolute',
          top: height - scaledValue,
          width: width,
          zIndex: 100,
        }}
      >
        <Dash
          style={{ width: width, height: 1 }}
          dashColor={elem.color}
          dashThickness={1}
          dashGap={3}
        />
        <Text
          style={[
            {
              position: 'absolute',
              top: 7,
              color: 'white',
              padding: 3,
              backgroundColor: elem.color,
              borderRadius: 2,
              fontSize: 10,
              opacity: 0.7,
            },
            elem.align == 'left' ? { left: 7 } : { right: 7 },
          ]}
        >
          {elem.label}
        </Text>
      </View>
    );
  });

  // animated shared value
  const animatedXscale = useSharedValue(initialXscale);
  const animatedYscale = useSharedValue(!props.scaleIn);
  const opacity = useSharedValue(!props.opacityIn);

  const animatedFillChart = useAnimatedProps(() => {
    // compute coefficent for bezier control point
    let curvefactor = animatedXscale.value / peackSmothness;
    let x = [];
    //create x axis data
    y.forEach((el, index) => {
      x.push(index * animatedXscale.value);
    });

    let y0end = height;
    let Cx1 = x[0] + curvefactor;
    let Cx2 = x[1] - curvefactor;
    let Cy1 = height - y[0] * animatedYscale.value;
    let Cy2 = height - y[1] * animatedYscale.value;
    let path = ` M 0 ${y0end} ${x[0]},${
      height - y[0] * animatedYscale.value
    } C${Cx1},${Cy1} ${Cx2},${Cy2} ${x[1]},${
      height - y[1] * animatedYscale.value
    } `;

    y.forEach((el, index) => {
      if (index > 1) {
        Cx1 = x[index] - curvefactor;
        Cx2 = height - y[index] * animatedYscale.value;
        path =
          path +
          ` S${Cx1},${Cx2} ${x[index]},${
            height - y[index] * animatedYscale.value
          }`;
      }
      // add close path
    });
    path = path + `L ${x[x.length - 1]},${y0end} Z`;

    return {
      d: path,
      opacity: opacity.value,
    };
  });

  const animatedStrokeChart = useAnimatedProps(() => {
    // compute coefficent for bezier control point
    let curvefactor = animatedXscale.value / peackSmothness;
    let x = [];
    //create x axis data
    y.forEach((el, index) => {
      x.push(index * animatedXscale.value);
    });

    let y0end = height;
    let Cx1 = x[0] + curvefactor;
    let Cx2 = x[1] - curvefactor;
    let Cy1 = height - y[0] * animatedYscale.value;
    let Cy2 = height - y[1] * animatedYscale.value;
    let path = ` M ${x[0]},${
      height - y[0] * animatedYscale.value
    } C${Cx1},${Cy1} ${Cx2},${Cy2} ${x[1]},${
      height - y[1] * animatedYscale.value
    } `;

    y.forEach((el, index) => {
      if (index > 1) {
        Cx1 = x[index] - curvefactor;
        Cx2 = height - y[index] * animatedYscale.value;
        path =
          path +
          ` S${Cx1},${Cx2} ${x[index]},${
            height - y[index] * animatedYscale.value
          }`;
      }
    });

    return {
      d: path,
      opacity: opacity.value,
    };
  });

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const horizontalLineView = [
    ...Array(Math.round(viewHeight / gridSpacing)),
  ].map((elem, index) => (
    <View
      key={index}
      style={{
        position: 'absolute',
        top: index * gridSpacing,
        borderColor: gridColor,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 0.5,
        width: width,
        opacity: 0.3,
      }}
    ></View>
  ));

  const verticalLineView = [...Array(Math.round(viewWidth / gridSpacing))].map(
    (elem, index) => (
      <View
        key={index}
        style={{
          position: 'absolute',
          left: index * gridSpacing,
          borderColor: gridColor,
          borderLeftWidth: 1,
          borderStyle: 'dashed',
          borderRadius: 0.5,
          height: '100%',
          opacity: 0.3,
        }}
      ></View>
    )
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: position,

        alignItems: 'center',
        // overflow: 'hidden',
      }}
      onLayout={(event) => {
        let { x, y, height, width } = event.nativeEvent.layout;
        setViewWidth(width);
        setViewHeight(height);
        // instead of load in useEffect do it here -> it works but why?
        animatedYscale.value = withTiming(1, { duration: 500 });
        opacity.value = withTiming(1, { duration: 500 });
      }}
    >
      {gridVisible && verticalLineView}
      {gridVisible && horizontalLineView}

      {/* <Button
        title="+"
        onPress={() => (animatedXscale.value = withSpring(initialXscale * 2))}
      />
      <Button
        title="-"
        onPress={() => (animatedXscale.value = withSpring(initialXscale))}
      /> */}

      <View style={{ height: height }}>
        {focusPointLine}
        <Svg
          height={height}
          width={width}
          style={{
            //   backgroundColor: 'green',
            positiion: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={fill} stopOpacity="1" />
              <Stop offset="1" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <AnimatedPath
            animatedProps={animatedFillChart}
            fill="url(#grad)"
            //   stroke="#D8B6E3"
            vWidth={10}
          />
          <AnimatedPath
            animatedProps={animatedStrokeChart}
            stroke={stroke}
            vWidth={10}
            strokeWidth={strokeWidth}
          />
          {/* {y.map((el, index) => (
        <AnimatedCircle
          key={index}
          cx={index * scale}
          cy={y[index]}
          r="5"
          fill={'#D8B6E3'}
        />
      ))} */}
        </Svg>
      </View>
    </View>
  );
}
