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
import theme from '../theme/theme';

export function Dialog(props) {
  const dialogOpacity = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  console.log('ciaone');

  if (props.state === 'close') {
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
            backgroundColor: props.bg,
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
                source={props.theme.icon.close}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: props.theme.color.white,
            fontSize: props.theme.font.lg,
            paddingBottom: 20,
            marginRight: 30,
            marginLeft: 20,
          }}
        >
          {props.message}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {props.denyLabel && (
            <TouchableOpacity
              //   style={{ position: 'absolute', right: 10, top: 10 }}
              onPress={() => props.onDeny()}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 30,
                }}
              >
                <Text
                  style={{
                    color: props.theme.color.white,
                    fontSize: props.theme.font.lg,
                  }}
                >
                  {props.denyLabel}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {props.confirmLabel && (
            <TouchableOpacity
              //   style={{ position: 'absolute', right: 10, top: 10 }}
              onPress={() => props.onConfirm()}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 30,
                }}
              >
                <Text
                  style={{
                    color: props.theme.color.secondary100,
                    fontSize: props.theme.font.lg,
                    opacity: 0.5,
                  }}
                >
                  {props.confirmLabel}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
