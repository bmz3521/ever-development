import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@components';
import useStyles from '../styles';

const ClinicPolicy = ({ clinic }) => {
  const baseStyles = useStyles();
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
  }, []);

  return (
    <View style={[baseStyles.blockView, baseStyles.policyWrapper]}>
      <Text type="buttonLarge">Policies</Text>
      <View style={{ marginTop: 10, marginBottom: 5 }}>
        <Text type="body2">Cancellation</Text>
      </View>

      <Text
        type="body3"
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 3}
        style={baseStyles.lineHeightDefault}
      >
        Flexible policy – Free cancellation Cancelling within 48 hours or of
        short notice will affect the medical center's ability to plan their
        resources, doctors, assessment equipment and more. Please notify the
        center as soon as possible regarding your availability on the appointed
        date.
      </Text>
      {lengthMore ? (
        <TouchableOpacity
          onPress={toggleNumberOfLines}
          style={baseStyles.policyBtn}
        >
          <Text type="body3" style={baseStyles.showBtn}>
            {textShown ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ClinicPolicy;
