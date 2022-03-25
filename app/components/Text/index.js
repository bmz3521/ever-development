import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
import i18next from 'i18next';

const CustomText = ({ type, children, style, numberOfLines,onTextLayout }) => {
  const lng = i18next.language;

  return (
    <Text
      style={[
        styles[`${['th', 'en'].includes(lng) ? lng : 'th'}`][
          `${type ? type : 'body2'}`
        ],
        { ...style },
      ]}
      numberOfLines={numberOfLines}
      onTextLayout={onTextLayout}
    >
      {children}
    </Text>
  );
};

export default CustomText;
