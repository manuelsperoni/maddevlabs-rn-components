import { View } from 'react-native';
import React from 'react';

export function Main(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.theme.color.secondary200,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 30,
        paddingHorizontal: 30,
      }}
    >
      {props.children}
    </View>
  );
}
