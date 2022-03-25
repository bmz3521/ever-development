import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Text } from '@components';
import React from 'react';
import i18next from 'i18next';

const InformationForm = ({ theme, formikInformation }) => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
  } = formikInformation;
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 25 }}
    >
      <View>
        <Text type="body2" style={{ color: '#1E1F20' }}>
          {i18next.t('SETTINGINFO_FIRSTNAME')}{' '}
          <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>
        <TextInput
          key="name"
          value={values.name}
          containerStyles={{ height: 50 }}
          placeholder={i18next.t('OTP_FIRSTNAME')}
          style={styles(theme).textInput}
          onBlur={handleBlur('name')}
          onChangeText={handleChange('name')}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text type="body2" style={{ color: '#1E1F20' }}>
          {i18next.t('SETTINGINFO_LASTNAME')}{' '}
          <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>
        <TextInput
          key="lastName"
          value={values.lastName}
          containerStyles={{ height: 50 }}
          placeholder={i18next.t('OTP_LASTNAME')}
          style={styles(theme).textInput}
          onBlur={handleBlur('lastName')}
          onChangeText={handleChange('lastName')}
        />
        {touched.name && touched.lastName && (
          <Text style={styles(theme).errorText} type="body3">
            {errors.lastName ?? ''}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default InformationForm;

const styles = theme =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
    textInput: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: 16,
      width: '100%',
      height: 50,
      borderRadius: 10,
    },
    containerInput: {
      height: 50,
    },
  });
