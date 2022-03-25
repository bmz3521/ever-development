import React from 'react';
import { View, Text, StatusBar as RnStatusBar } from 'react-native';

const StatusBar = ({ backgroundColor, barStyle }) => {
  return (
    <RnStatusBar
      animated={true}
      backgroundColor={backgroundColor ? backgroundColor : '#ffffff'}
      barStyle={barStyle ? barStyle : 'dark-content'}
    />
  );
};

export default StatusBar;
