import { View, Image, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export function SettingItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginHorizontal: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 20,
        flexDirection: 'row',
      }}
    >
      <Image
        style={{
          width: 25,
          height: 25,
          margin: 10,
        }}
        source={props.icon}
      />
      <View style={{ margin: 5 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: props.theme.font.md,
            color: props.theme.color.white,
            padding: 0,
            margin: 0,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            fontSize: props.theme.font.sm,
            color: props.theme.color.secondary100,
            padding: 0,
            margin: 0,
          }}
        >
          {props.value}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
