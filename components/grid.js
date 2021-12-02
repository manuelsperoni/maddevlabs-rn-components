import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';

export default function Grid(props) {
  const spacing = props.spacing;
  const color = props.color;
  const position = props.position;
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  console.log('################ REFERSH GRID ##############################');

  const horizontalLineView = [...Array(Math.round(viewHeight / spacing))].map(
    (elem, index) => (
      <View
        key={index}
        style={{
          position: 'absolute',
          top: index * spacing,
          borderColor: color,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderRadius: 0.5,
          width: viewWidth,
          opacity: 0.3,
        }}
      ></View>
    )
  );

  const verticalLineView = [...Array(Math.round(viewWidth / spacing))].map(
    (elem, index) => (
      <View
        key={index}
        style={{
          position: 'absolute',
          left: index * spacing,
          borderColor: color,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderRadius: 0.5,
          height: viewHeight,
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
      }}
    >
      {verticalLineView}
      {horizontalLineView}
      {props.children}
    </View>
  );
}
