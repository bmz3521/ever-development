import React, { useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  FloatingLabelInput,
} from '@components';
import useStyles from './styles';
import { useTheme } from 'react-native-elements';
import useHooks from './hooks';

function MedicalQueryForm({ navigation, route }) {
  const baseStyles = useStyles();
  const { theme } = useTheme();

  const { formik, type, actions } = useHooks({ navigation, route });

  const handleStyleButton = (condition, error) => {
    if (
      // !condition.firstName ||
      // !condition.lastName ||
      !condition.email ||
      !condition.message ||
      // !condition.phoneNo ||
      // error.firstName ||
      // error.lastName ||
      error.email ||
      error.massage
      // error.phoneNo
    ) {
      return theme.colors.grey5;
    } else {
      return theme.colors.primary;
    }
  };

  const renderErrorText = msg => {
    return <Text style={baseStyles.errorText}>{msg}</Text>;
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text="Message to the Clinic"
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        {/* Form Section */}
        <ScrollView style={baseStyles.container}>
          <View style={baseStyles.wrapper}>
            <Text type="body3" style={baseStyles.label}>
              First Name
            </Text>
            <TextInput
              placeholder="First Name"
              style={baseStyles.textInput}
              placeholderTextColor={theme.colors.grey4}
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
            />
            {formik.touched.firstName &&
              formik.errors.firstName &&
              renderErrorText(formik.errors.firstName)}
          </View>

          <View style={baseStyles.wrapper}>
            <Text type="body3" style={baseStyles.label}>
              Last Name
            </Text>
            <TextInput
              placeholder="Last Name"
              style={baseStyles.textInput}
              placeholderTextColor={theme.colors.grey4}
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
            {formik.touched.lastName &&
              formik.errors.lastName &&
              renderErrorText(formik.errors.lastName)}
          </View>

          <View style={baseStyles.wrapper}>
            <Text type="body3" style={baseStyles.label}>
              Phone number
            </Text>
            <TextInput
              placeholder="Your Phone number (10 digits)"
              style={baseStyles.textInput}
              value={formik.values.phoneNo}
              placeholderTextColor={theme.colors.grey4}
              onChangeText={formik.handleChange('phoneNo')}
              onBlur={formik.handleBlur('phoneNo')}
              maxLength={10}
              keyboardType="number-pad"
            />
            {formik.touched.phoneNo &&
              formik.errors.phoneNo &&
              renderErrorText(formik.errors.phoneNo)}
          </View>

          <View style={baseStyles.wrapper}>
            <Text type="body3" style={baseStyles.label}>
              Email Adress
            </Text>
            <TextInput
              placeholder="Your Email"
              style={baseStyles.textInput}
              value={formik.values.email}
              placeholderTextColor={theme.colors.grey4}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            {formik.touched.email &&
              formik.errors.email &&
              renderErrorText(formik.errors.email)}
          </View>

          {/* messages box */}
          <View style={baseStyles.messageWrapper}>
            <View style={baseStyles.messageLeft}>
              <View style={{ marginBottom: 5 }}>
                <Text type="body3" style={{ color: theme.colors.grey3 }}>
                  Message to Doctor
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Your messsage"
                  placeholderTextColor={theme.colors.grey4}
                  style={baseStyles.messageInput}
                  multiline={true}
                  value={formik.values.message}
                  onChangeText={formik.handleChange('message')}
                  onBlur={formik.handleBlur('message')}
                />
              </View>
            </View>
            <TouchableOpacity
              style={baseStyles.messageRight}
              onPress={actions.onResetMessage}
            >
              <Icon
                name="times-circle"
                style={{ color: theme.colors.grey4, fontSize: 15 }}
                solid
              />
            </TouchableOpacity>
          </View>
          {formik.touched.message &&
            formik.errors.message &&
            renderErrorText(formik.errors.message)}
        </ScrollView>

        {/* Bottom Section */}
        <View style={[baseStyles.footer]}>
          <TouchableOpacity
            disabled={
              // formik.errors.firstName ||
              // formik.errors.lastName ||
              formik.errors.email ||
              formik.errors.message ||
              // !formik.values.firstName ||
              // !formik.values.lastName ||
              !formik.values.email ||
              !formik.values.message
            }
            style={[
              baseStyles.bottomBtn,
              {
                backgroundColor: handleStyleButton(
                  formik.values,
                  formik.errors,
                ),
              },
            ]}
            onPress={
              () => actions.onConfirmOMA()
              // type == 'clinicPackage'
              //   ? actions.onConfirmPackage
              //   : actions.onConfirm
            }
          >
            <Text
              type="buttonLarge"
              style={
                // formik.errors.firstName ||
                // formik.errors.lastName ||
                formik.errors.email ||
                formik.errors.message ||
                // formik.errors.phoneNo ||
                // !formik.values.firstName ||
                // !formik.values.lastName ||
                !formik.values.email ||
                // !formik.values.phoneNo ||
                !formik.values.message
                  ? baseStyles.bottomBtnTextDis
                  : baseStyles.bottomBtnText
              }
            >
              {'ยืนยัน'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default MedicalQueryForm;
