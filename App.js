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
        /*limits*/
        lowerBound={0}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        /*Appeareance*/
        bigSegmentHeight={70}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={4}
        spacing={15}
        mainTipWidth={20}
        mainTipHeight={100}
        mainTipColor={'#F6973F'}
      />
      <MadScrollSelector
        /*limits*/
        lowerBound={0}
        upperBound={100}
        multipleBigSegment={10}
        udm={'kg'}
        /*Appeareance*/
        bigSegmentHeight={70}
        smallSegmentHeight={35}
        segmentColor={'#4A5568'}
        segmentThikness={2}
        spacing={26}
        mainTipWidth={40}
        mainTipHeight={100}
        mainTipColor={'#D8B6E3'}
      />
    </SafeAreaView>
  );
}
