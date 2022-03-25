import React from 'react';
import { Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { useTheme } from 'react-native-elements';

const ProgressCircles = ({ percent, label }) => {
  const { theme } = useTheme();
  return (
    <ProgressCircle
      percent={percent}
      radius={30}
      borderWidth={7}
      color={theme.colors.secondary}
      shadowColor={theme.colors.grey5}
      bgColor={theme.colors.white}
    >
      <Text style={{ fontSize: 15, fontFamily: theme.fontFamilyDefault }}>
        {label}
      </Text>
    </ProgressCircle>
  );
};

export default React.memo(ProgressCircles);
