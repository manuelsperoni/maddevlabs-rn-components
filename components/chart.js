import React from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import Svg from 'react-native-svg';
import { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

export default function Chart(props) {
  // Config
  const height = props.height;
  const width = props.width;
  const maxDisplayedData = props.maxDisplayedData;
  const rawData = props.data;
  const fill = props.fill;
  const stroke = props.stroke;
  const strokeWidth = props.strokeWidth;
  const nVerticalLine = props.nVerticalLine;
  const verticalSpacing = props.verticalSpacing;
  const nHorizontalLine = props.nHorizontalLine;
  const horizontalSpacing = props.horizontalSpacing;
  const gridColor = props.gridColor;
  const position = props.position;

  const y = []; // empty array for downsampled data
  //naive data downsampling , if data less than max take every data otherwise sample every nth elem
  const nth =
    rawData.length >= maxDisplayedData
      ? Math.floor(rawData.length / maxDisplayedData)
      : 1; // every nth take a value
  rawData.forEach((elem, index) => {
    if (index % nth === 0) y.push(elem);
  });

  // invert y axis
  let maxValue = Math.max(...y) + 10;
  y.forEach((elem, index) => {
    y[index] = (y[index] / maxValue) * height;
  });

  let initialXscale = width / (y.length - 1);

  const animatedXscale = useSharedValue(initialXscale);
  const animatedYscale = useSharedValue(!props.scaleIn);
  const opacity = useSharedValue(!props.opacityIn);

  useEffect(() => {
    animatedYscale.value = withTiming(1, { duration: 500 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedFillChart = useAnimatedProps(() => {
    // compute coefficent for bezier control point
    let curvefactor = animatedXscale.value / 2;
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
    let curvefactor = animatedXscale.value / 2;
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
      // add close path

      console.log('Y:', y[index] * animatedYscale.value);
    });

    return {
      d: path,
      opacity: opacity.value,
    };
  });

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const horizontalLineView = [...Array(nHorizontalLine)].map((elem, index) => (
    <View
      style={{
        position: 'absolute',
        top: index * horizontalSpacing,
        borderColor: gridColor,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 0.5,
        width: width,
        opacity: 0.3,
      }}
    ></View>
  ));

  const verticalLineView = [...Array(nVerticalLine)].map((elem, index) => (
    <View
      style={{
        position: 'absolute',
        left: index * horizontalSpacing,
        borderColor: gridColor,
        borderLeftWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 0.5,
        height: '100%',
        opacity: 0.3,
      }}
    ></View>
  ));

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: position,
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {verticalLineView}
      {horizontalLineView}
      {/* <Button
        title="+"
        onPress={() => (animatedXscale.value = withSpring(initialXscale * 2))}
      />
      <Button
        title="-"
        onPress={() => (animatedXscale.value = withSpring(initialXscale))}
      /> */}
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
  );
}
