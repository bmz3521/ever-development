import { View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { hasFlag } from 'country-flag-icons';
import * as Flags from 'country-flag-icons/string/3x2';

const ConutryFlag = ({ code }) => {
  return hasFlag(code) ? (
    <SvgXml xml={Flags[code]} width={40} height={30} />
  ) : (
    <View style={{ width: 40, height: 30 }}></View>
  );
};

export default ConutryFlag;
