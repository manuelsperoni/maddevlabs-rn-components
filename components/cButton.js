import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function CButton(props) {
  let styleSize = { padding: 0 };

  if (props.s) {
    styleSize.padding = 6;
    styleSize.borderRadius = props.squared ? 5 : 100;
    styleSize.fontSize = props.theme.font.xs;
  }
  if (props.m) {
    styleSize.padding = 10;
    styleSize.borderRadius = props.squared ? 7.5 : 100;
    styleSize.fontSize = props.theme.font.sm;
  }
  if (props.l) {
    styleSize.padding = 15;
    styleSize.borderRadius = props.squared ? 10 : 100;
    styleSize.fontSize = props.theme.font.md;
  }

  let styleType = {};

  if (props.filled) {
    styleType.backgroundColor = props.theme.color.primary100;
    styleType.color = props.theme.w;
  }
  if (props.outlined) {
    styleType.borderWidth = 1;
    styleType.borderColor = props.theme.color.primary100;
    styleType.color = props.theme.color.primary100;
  }
  if (props.ghost) {
    styleType.color = props.theme.color.white;
  }
  let styleCommon = {
    flex: 0,
    margin: props.margin,
    opacity: props.disabled ? 0.3 : 1,
  };

  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <Text style={[styleSize, styleType, styleCommon]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export function CButtonIcon(props) {
  let styleSize = {};
  let imageSize = {};

  if (props.s) {
    styleSize.padding = 6;
    styleSize.borderRadius = props.squared ? 5 : 100;
    imageSize = { width: 15, height: 15 };
  }
  if (props.m) {
    styleSize.padding = 10;
    styleSize.borderRadius = props.squared ? 7.5 : 100;
    imageSize = { width: 25, height: 25 };
  }
  if (props.l) {
    styleSize.padding = 15;
    styleSize.borderRadius = props.squared ? 10 : 100;
    imageSize = { width: 40, height: 40 };
  }

  let styleType = {};

  if (props.filled) {
    styleType.backgroundColor = props.theme.color.primary100;
  }
  if (props.outlined) {
    styleType.borderWidth = 1;
    styleType.borderColor = props.theme.color.primary100;
  }

  let styleCommon = {
    flex: 0,
    margin: props.margin,
    opacity: props.disabled ? 0.3 : 1,
  };
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View style={[styleSize, styleType, styleCommon]}>
        <Image source={props.icon} style={imageSize} />
      </View>
    </TouchableOpacity>
  );
}
