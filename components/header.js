import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BACK_ICON = require('../assets/backArrow.png');

export function Header(props, { navigation }) {
  return (
    <View
      style={{
        height: props.height,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Back arrow */}
      <TouchableOpacity onPress={() => navigation.back()}>
        <View
          style={{
            padding: 5,
            margin: 10,
            borderRadius: 100,
          }}
        >
          <Image
            source={BACK_ICON}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          flex: 1,
          color: props.theme.w,
          fontSize: 20,
        }}
      >
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

export function HeaderButtonsList(props) {
  return props.children;
}

export function HeaderButton(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View
        style={{
          padding: 5,
          margin: 10,
          borderRadius: 100,
        }}
      >
        <Image
          source={props.icon}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
