import { View } from "native-base";
import React from "react";

export function Main(props) {
    return <View
        style={{
            flex: 1,
            backgroundColor: props.theme.s.c200,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingTop: 10
        }}>
        {props.children}
    </View>
}