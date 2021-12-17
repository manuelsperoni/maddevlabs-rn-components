import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
export function Menu(props) {
  // Style definition
  const style = {
    container: {},
    navigator: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItem: 'center',
    },
    item: { padding: 20 },
    selectedItem: { color: props.theme.color.primary100 },
    nonSelectedItem: { color: props.theme.color.secondary100 },
  };

  // State definition
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <View style={style.container}>
      <View style={style.navigator}>
        {props.tab.map((el, index) => (
          <TouchableOpacity onPress={() => setSelectedTabIndex(index)}>
            <Text
              style={[
                index == selectedTabIndex
                  ? style.selectedItem
                  : style.nonSelectedItem,
                style.item,
              ]}
            >
              {el}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {props.children[selectedTabIndex]}
    </View>
  );
}
