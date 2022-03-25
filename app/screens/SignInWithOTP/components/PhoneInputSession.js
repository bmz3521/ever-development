import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput, Text } from '@components';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useCallback } from 'react';
import i18next from 'i18next';

const PhoneInputSession = ({
  theme,
  stateData,
  onChangeValueHandler,
  formikPhoneCid,
}) => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    submitForm,
  } = formikPhoneCid;

  const renderItem = useCallback(
    ({ item, onPress }) => {
      return (
        <TouchableOpacity
          key={item.value}
          onPress={() => onPress(item)}
          activeOpacity={0.7}
          style={styles(theme).listItemContainer}
        >
          <View style={{ marginRight: 3 }}>{item.icon()}</View>
          <Text
            numberOfLines={1}
            lineBreakMode="middle"
            ellipsizeMode="middle"
            style={{ color: '#666', flexShrink: 1, marginLeft: 5 }}
            type="body2"
          >
            {`${item.countryName} (${item.code})`}
          </Text>
        </TouchableOpacity>
      );
    },
    [stateData.value],
  );

  return (
    <View style={{ minHeight: 200 }}>
      <View style={{ padding: 15, marginHorizontal: 10 }}>
        <Text>
          {i18next.t('OTP_ENTER_PHONE_NO')}{' '}
          <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 50,
            left: 15,
            minHeight: 300,
            width: '100%',
            zIndex: 6,
          }}
        >
          <DropDownPicker
            zIndex={5}
            style={{ borderColor: '#d3d3d3' }}
            dropDownContainerStyle={styles(theme).dropDownContainer}
            containerStyle={{ width: 100, height: 50 }}
            renderListItem={renderItem}
            flatListProps={{
              keyExtractor: item => item.value,
              initialNumToRender: 10,
            }}
            open={stateData.open}
            value={stateData.value}
            items={stateData.items}
            setOpen={open => onChangeValueHandler('open', open)}
            onSelectItem={item => {
              onChangeValueHandler('value', item.value);
              onChangeValueHandler('countryCode', item.code);
            }}
          />
          <View style={{ flexGrow: 1, marginLeft: 20 }}>
            <TextInput
              value={values.phoneNumber}
              containerStyles={{ height: 50 }}
              placeholder={'099 999 9999'}
              style={styles(theme).phoneInput}
              onBlur={handleBlur('phoneNumber')}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={handleChange('phoneNumber')}
            />
            {touched.phoneNumber && (
              <Text style={styles(theme).errorText} type="body3">
                {errors.phoneNumber ?? ''}
              </Text>
            )}
          </View>
        </View>
        <View style={[{ marginTop: 80 }, { zIndex: stateData.open ? -1 : 7 }]}>
          <Text type="body2" style={{ color: '#1E1F20' }}>
            {i18next.t('SETTINGINFO_IDCARD')}
          </Text>
          <TextInput
            key="idCard"
            value={values.idCard}
            containerStyles={{ height: 50 }}
            placeholder={i18next.t('OTP_ID_NO')}
            style={styles(theme).textInput}
            onBlur={handleBlur('idCard')}
            keyboardType="number-pad"
            maxLength={13}
            onChangeText={handleChange('idCard')}
          />
          {touched.idCard && (
            <Text style={styles(theme).errorText} type="body3">
              {errors.idCard ?? ''}
            </Text>
          )}
        </View>
      </View>
      <View style={[{ zIndex: stateData.open ? -1 : 7 }]}>
        <Button
          onPress={submitForm}
          titleStyle={{ fontFamily: theme.fontFamilyDefault }}
          buttonStyle={styles(theme).submitButton}
          title={i18next.t('OTP_REQUEST_OTP')}
        />
      </View>
    </View>
  );
};

export default PhoneInputSession;

const styles = theme =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
    phoneInput: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 16,
      paddingLeft: 15,
      width: '100%',
      height: 50,
      alignSelf: 'center',
      borderRadius: 10,
    },
    textInput: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 16,
      width: '100%',
      height: 50,
      borderRadius: 10,
    },
    dropDownContainer: {
      borderColor: '#d3d3d3',
      backgroundColor: 'white',
      width: 280,
    },
    submitButton: {
      borderRadius: 10,
      paddingVertical: 10,
      marginHorizontal: 20,
      marginTop: 5,
    },
    listItemContainer: {
      flexDirection: 'row',
      marginVertical: 4,
      marginLeft: 5,
      alignItems: 'center',
    },
  });
