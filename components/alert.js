import React from 'react';
import { Dimensions, View, Button, Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CLOSE_ICON = require('../assets/close.png');
export function Alert(props) {
  const bg = props.bg;
  const message = props.message;
  const title = props.title;
  const state = props.state;
  const color = props.color;
  const confirmLabel = props.confirmLabel;
  const denyLabel = props.denyLabel;
  const onConfirm = props.onConfirm;
  const onDeny = props.onDeny;
  const font = props.font;
  const dialogOpacity = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  console.log('ciaone');

  if (state === 'close') {
    close();
  } else open();

  const dialogAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: dialogOpacity.value,
    };
  });
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  function open() {
    dialogOpacity.value = withTiming(1, {
      duration: 300,
    });
    overlayOpacity.value = withTiming(0.5, {
      duration: 600,
    });
  }

  function close() {
    console.log('opening dialog');
    dialogOpacity.value = withTiming(0, {
      duration: 300,
    });
    overlayOpacity.value = withTiming(0, {
      duration: 600,
    });
  }

  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 10,
          },
          overlayAnimatedStyle,
        ]}
      ></Animated.View>

      <Animated.View
        style={[
          {
            zIndex: 30,
            backgroundColor: bg,
            borderRadius: 20,
            padding: 15,
            zIndex: 100,
            margin: 10,
          },
          dialogAnimatedStyle,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            //   style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => props.onClose('close')}
          >
            <View
              style={{
                borderRadius: 100,
              }}
            >
              <Image
                source={CLOSE_ICON}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <Text
            style={{
              color: font.color,
              fontSize: font.size,
              fontFamily: font.family,
              paddingBottom: 0,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: font.color,
              fontSize: font.size * 0.8,
              fontFamily: font.family,
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
