import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingLottie from '@assets/lottie-animation/Loading.json';

const Loading2 = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 150,
          height: 100,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LottieView source={LoadingLottie} autoPlay loop />
      </View>
    </View>
  );
};
export default Loading2;
