import { height } from 'dom-helpers';
import { Center } from 'native-base';
import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import imageComparison from './imageComparison';
import Chart from './chart';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Card(props) {
  const startImage = props.startImage;
  const endImage = props.endImage;
  const title = props.title;
  const data = props.data;
  const progress = props.progress; // % progress
  const margin = props.margin;
  const font = props.font;
  const color = props.color;
  const onPress = props.onPress;
  const dayLeft = props.dayLeft;
  const cDate = props.cDate;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: Dimensions.get('window').width - 2 * margin,
        margin: margin,
      }}
    >
      {/* header  */}
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: font.color,
            fontSize: 24,
            margin: 0,
            padding: 0,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: font.color,
            margin: 0,
            padding: 5,
            backgroundColor: color.s100,
            borderRadius: 20,
            marginLeft: 10,
            fontSize: 10,
          }}
        >
          {cDate}{' '}
        </Text>
      </View>
      {/* Main */}
      <View style={{ borderRadius: 20, backgroundColor: color.p200 }}>
        {/* Image content */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={startImage}
            style={{
              width: (Dimensions.get('window').width - 2 * margin) / 2,
              height: Dimensions.get('window').width - 2 * margin,
              borderTopLeftRadius: 20,
              //   borderRadius: 20,
              opacity: 0.6,
            }}
          />
          <Image
            source={endImage}
            style={{
              width: (Dimensions.get('window').width - 2 * margin) / 2,
              height: Dimensions.get('window').width - 2 * margin,
              //   borderTopRightRadius: 20,
              borderTopRightRadius: 20,
              opacity: 0.6,
            }}
          />
        </View>
        {/* Info content */}
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width - 2 * margin,
            bottom: 70,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Chart
              maxValue={200}
              height={50}
              width={Dimensions.get('window').width - 2 * margin - 50}
              data={data.y}
              maxDisplayedData={30}
              fill={'#D8B6E3'}
              stroke={'#D8B6E3'}
              strokeWidth={2}
              opacityIn
              scaleIn
              focusData={[]}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: font.color, fontWeight: 'bold' }}>
                START
              </Text>
              <Text style={{ color: font.color }}>{data.startW} kg</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: font.color, fontWeight: 'bold' }}>
                ACTUAL
              </Text>
              <Text style={{ color: font.color }}>{data.actualW} kg</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: font.color, fontWeight: 'bold' }}>
                DIFF
              </Text>
              <Text style={{ color: font.color }}>{data.diffW} kg</Text>
            </View>
          </View>
        </View>
        {/* Progress bar */}
        <View
          style={{
            height: 40,
            backgroundColor: color.p200,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
          }}
        >
          {/* Actual progress */}
          <View
            style={{
              height: 40,
              width:
                (progress / 100) *
                (Dimensions.get('window').width - 2 * margin),
              backgroundColor: color.p100,
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
              borderTopEndRadius: 20,
            }}
          ></View>
          {/* Text indicator wrap */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: Dimensions.get('window').width - 2 * margin,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: font.color,
                fontSize: 20,
              }}
            >
              {dayLeft > 0 ? `${dayLeft} days left` : 'Completed'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
