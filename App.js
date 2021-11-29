import MadScrollSelector from './madScrollSelector';
import React from 'react';
import { SafeAreaView } from 'react-native';
export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A202C',
      }}
    >
      <MadScrollSelector
        lowerBound={0}
        upperBound={100}
        bigTickHeigth={70}
        tipIndicatorHeight={100}
        smallTickHeigth={35}
        tickColor={'#4A5568'}
        tipIndicatorColor={'#D8B6E3'}
        udm={'kg'}
      />
      <MadScrollSelector
        lowerBound={100}
        upperBound={200}
        bigTickHeigth={70}
        tipIndicatorHeight={100}
        smallTickHeigth={35}
        tickColor={'#4A5568'}
        tipIndicatorColor={'#D8B6E3'}
        udm={'kg'}
      />
    </SafeAreaView>
  );
}
