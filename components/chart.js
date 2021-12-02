import React from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import Svg from 'react-native-svg';
import { Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { runOnJS } from 'react-native-reanimated';

export default function Chart(props) {
  const height = 300;
  let y = [
    10, 100, 150, 288, 10, 45, 66, 55, 66, 77, 104, 150, 80, 288, 34, 4, 166,
    55, 66, 77,
  ];
  let initialXscale = Dimensions.get('window').width / (y.length - 1);
  const animatedXscale = useSharedValue(initialXscale);
  // invert y axis
  let maxValue = Math.max(...y);
  console.log('MAX', maxValue);
  y.forEach((elem, index) => {
    y[index] = (y[index] / maxValue) * height;
    console.log(y[index]);
  });

  const animatedYscale = useSharedValue(0);

  useEffect(() => {
    animatedYscale.value = withSpring(1);
  }, []);

  const animatedProps = useAnimatedProps(() => {
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

      console.log('Y:', y[index] * animatedYscale.value);
    });
    path = path + `L ${x[x.length - 1]},${y0end} Z`;

    return {
      d: path,
    };
  });

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  return (
    <>
      <Button
        onPress={() => (animatedYscale.value = withSpring(0))}
        title={'small'}
      />
      <Button
        onPress={() => (animatedYscale.value = withSpring(1))}
        title={'large'}
      />
      <Svg
        height={height}
        width={Dimensions.get('window').width}
        style={{
          backgroundColor: 'green',
          positiion: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <AnimatedPath
          animatedProps={animatedProps}
          fill="#6C617B"
          stroke="#D8B6E3"
          vWidth={10}
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
    </>
  );
}
