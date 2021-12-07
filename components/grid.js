import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';

export default function Grid(props) {
  const spacing = props.spacing;
  const gridColor = props.gridColor;
  const position = props.position;
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const horizontalLineView = [...Array(Math.round(viewHeight / spacing))].map(
    (elem, index) => (
      <View
        key={index}
        style={{
          position: 'absolute',
          top: index * spacing,
          bordergridColor: gridColor,
          borderWidth: 0.1,
          borderStyle: 'solid',
          borderRadius: 0.5,
          width: viewWidth,
          opacity: 1,
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
          bordergridColor: gridColor,
          borderWidth: 0.1,
          borderStyle: 'solid',
          borderRadius: 0.5,
          height: viewHeight,
          opacity: 1,
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
