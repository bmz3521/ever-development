import React, { useState } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from '@components';
import { BaseStyle } from '@config';
import LottieView from 'lottie-react-native';
import LoadingLottie from '@assets/lottie-animation/Loading.json';

const Loading = ({ isVisible }) => {
  return (
    <Modal transparent visible={isVisible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
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
    </Modal>
  );
};
export default Loading;
