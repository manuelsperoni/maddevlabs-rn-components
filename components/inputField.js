import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
export function InputField(props) {
  const style = {
    container: { marginBottom: 20 },
    label: {
      color: props.theme.color.secondary100,
      fontSize: props.theme.font.md,
      marginBottom: 10,
    },
    input: {
      color: props.theme.color.white,
      fontSize: props.theme.font.sm,
      backgroundColor: props.theme.color.secondary200,
      borderRadius: 300,
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderWidth: 1,
      borderColor: props.theme.color.secondary100,
      fontSize: props.theme.font.md,
    },
  };

  console.log('valore:', props.value);
  return (
    <View style={style.container}>
      <Text style={style.label}>{props.field.toUpperCase()}</Text>
      <TextInput
        placeholder={props.field.toUpperCase()}
        style={style.input}
        value={props.value}
        onChangeText={props.setField}
      />
    </View>
  );
}
