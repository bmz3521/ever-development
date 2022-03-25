import React, { useState } from 'react';
import {
  TextInput,
  Text,
  Animated,
  ViewPropTypes,
  TextPropTypes,
} from 'react-native';
import useStyles from './styles';
import PropTypes from 'prop-types';

const TextInputCustom = props => {
  const animVal = useState(new Animated.Value(0))[0];
  const baseStyles = useStyles();
  const propStyle = [
    !props.customStyle ? { height: 40, padding: 10 } : {},
    props.style,
  ];
  const animTrans = () => {
    Animated.timing(animVal, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const animOnBlur = () => {
    Animated.timing(animVal, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Animated.View
      style={[
        props.containerStyles,
        !props.customStyle && baseStyles.fieldSet,
        {
          borderColor: animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [baseStyles.grayColor, baseStyles.primaryColor],
          }),
        },
      ]}
    >
      {props.label && (
        <Animated.Text
          style={{
            ...baseStyles.legend,
            color: animVal.interpolate({
              inputRange: [0, 1],
              outputRange: [baseStyles.blackColor, baseStyles.primaryColor],
            }),
          }}
        >
          {' '}
          {props.label} {props.labelExtra}
        </Animated.Text>
      )}
      <TextInput
        {...props}
        style={propStyle}
        onBlur={e => {
          props.onBlur && props.onBlur(e);
          animOnBlur();
        }}
        onFocus={e => {
          props.onFocus && props.onFocus(e);
          animTrans();
        }}
      />
      {props.icon}
    </Animated.View>
  );
};

TextInputCustom.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element /** NOTE single child component */,
  labelExtra: PropTypes.element /** NOTE single child component */,
  customStyle: PropTypes.bool /** CUSTOM STYLE DEFAULT TRUE OR FALSE  */,
  containerStyles:
    ViewPropTypes.style /** NOTE styles of TextInput container */,
};

export default TextInputCustom;
