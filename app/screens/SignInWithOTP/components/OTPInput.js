import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@components';
import { Icon } from 'react-native-elements';
import React from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import i18next from 'i18next';

const CELL_COUNT = 6;

const OTPInput = ({
  theme,
  stateData,
  timer,
  onResendOTPHandler,
  onChangeValueHandler,
}) => {
  const changeColor = useDerivedValue(() => {
    return timer === 0 ? withTiming(1) : withTiming(0);
  }, [timer]);

  const rStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      changeColor.value,
      [0, 1],
      ['rgba(0,0,0,.54)', theme.colors.primary],
    );
    return {
      color,
    };
  });
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <View style={styles(theme).container}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={text => {
            onChangeValueHandler('otpCode', text);
            setValue(text);
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles(theme).codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index.toString()}
              style={[
                [styles(theme).cell, isFocused && styles(theme).focusCell],
              ]}
            >
              <Text
                type="body1"
                key={index}
                style={{
                  fontSize: 24,
                }}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {!!stateData.error && (
          <Text style={styles(theme).errorText} type="body3">
            {stateData.error}
          </Text>
        )}
      </View>
      <TouchableOpacity
        disabled={timer !== 0}
        onPress={onResendOTPHandler}
        activeOpacity={0.6}
      >
        <View style={styles(theme).footerContainer}>
          <Icon
            color={'rgba(0,0,0,.54)'}
            type="evilicon"
            name="redo"
            size={36}
            style={{ paddingRight: 5 }}
          />
          <Animated.Text style={[styles(theme).resendText, rStyle]}>
            {i18next.t('OTP_RESEND_CODE')}
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginLeft: 30, marginTop: 30, marginBottom: 20 }}>
        <Text style={{ color: 'rgba(0,0,0,.54)' }} type="body3">{`${i18next.t(
          'OTP_INSTRUCTION_FOR_CODE_ONE',
        )} ${stateData.phoneNumber}\n${i18next.t(
          'OTP_INSTRUCTION_FOR_CODE_TWO',
        )} 0:${timer.toString().padStart(2, '0')} ${i18next.t(
          'OTP_INSTRUCTION_FOR_CODE_THREE',
        )}`}</Text>
      </View>
    </>
  );
};

export default OTPInput;

const styles = theme =>
  StyleSheet.create({
    resendText: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 18,
    },
    errorText: {
      color: theme.colors.error,
      alignSelf: 'flex-start',
      marginTop: 5,
      marginLeft: '11%',
    },
    container: {
      alignItems: 'center',
      marginVertical: 20,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    codeFieldRoot: { marginTop: 10 },
    cell: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: 55,
      borderWidth: 1,
      marginHorizontal: 3,
      borderColor: '#aaa',
    },
    focusCell: {
      borderColor: theme.colors.primary,
    },
  });
