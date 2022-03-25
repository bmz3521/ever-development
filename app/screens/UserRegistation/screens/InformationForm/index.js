import React, { useState, useRef } from 'react';
import {
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import i18next from 'i18next';
import moment from 'moment';
import {
  SafeAreaView,
  Header,
  TextInput,
  DateWheelPicker,
  Text,
} from '@components';
import ProgressCircle from '../../components/ProgressCircle';
import useBaseStyles from '../../styles';
import { useTheme, Icon } from 'react-native-elements';
import { useHooks } from './hooks';

const InformationForm = ({ navigation, route }) => {
  moment.locale(i18next.language);
  const genderText = {
    MALE: i18next.t('USERREG_MALE'),
    FEMALE: i18next.t('USERREG_FEMALE'),
  };

  const { formik, actions, listOrganizations, isThirdParty } = useHooks({
    navigation,
    route,
  });

  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  const datePickerRef = useRef();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const handleStyleButton = (condition, error) => {
    if (
      !condition.email ||
      !condition.gender ||
      !condition.firstname ||
      !condition.lastname ||
      (isThirdParty
        ? false
        : !condition.password || !condition.confirmpassword) ||
      !condition.birthDate ||
      !condition.organizationId ||
      error.email ||
      error.firstname ||
      error.lastname ||
      (isThirdParty ? false : error.password || error.confirmpassword) ||
      error.number
    ) {
      return baseStyles.placeholderColor;
    } else {
      return theme.colors.primary;
    }
  };

  const renderErrorText = msg => {
    return <Text style={baseStyles.errorText}>{msg}</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
      <DateWheelPicker
        title={i18next.t('USERREG_WHEELDATE')}
        onSubmit={date => formik.setFieldValue('birthDate', date)}
        ref={datePickerRef}
        initialDate={
          formik.values.birthDate
            ? new Date(formik.values.birthDate)
            : new Date()
        }
      />
      <Header
        text={i18next.t('USERREG_REGISTER')}
        onPressLeft={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={baseStyles.contain}>
            <>
              <View style={baseStyles.formTitleContainer}>
                <View
                  style={{
                    flex: 2,
                    padding: 10,
                  }}
                >
                  <Text type="body2">{i18next.t('USERREG_FILL_INFO')}</Text>
                </View>
                <ProgressCircle percent={25} label={'1/4'} />
              </View>
              <View style={baseStyles.formContainer}>
                <View>
                  {/* <TextInput
                    containerStyles={{ margin: 10 }}
                    label="Referral code"
                    autoCapitalize={'characters'}
                    autoCorrect={false}
                    autoCompleteType="off"
                    value={formik.values.referral}
                    onChangeText={formik.handleChange('referral')}
                    onBlur={formik.handleBlur('referral')}
                    placeholder={i18next.t('USERREG_FILL_CODE')}
                    placeholderTextColor={baseStyles.placeholderColor}
                    style={[baseStyles.textInput, baseStyles.textInputMain]}
                  /> */}
                  {formik.errors.referral &&
                    renderErrorText(formik.errors.referral)}
                  <View style={baseStyles.textPress}>
                    <Text type="body4" style={baseStyles.legend}>
                      {i18next.t('USERREG_SELECT_SIGNIN')}{' '}
                      <Text style={baseStyles.errorColor}>*</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        actions.selectOrganization(
                          i18next.t('USERREG_SELECT_SIGNIN'),
                        )
                      }
                      style={baseStyles.addressBtn}
                    >
                      {/** NOTE  organizationId = 4 is default Ever org */}
                      {formik.values.organizationId &&
                      formik.values.organizationId !== 4 ? (
                        <View
                          style={{ ...baseStyles.ctnRow, alignItems: 'center' }}
                        >
                          <Text type="body2" style={baseStyles.textBoxShow}>
                            {listOrganizations && listOrganizations.length > 0
                              ? listOrganizations.find(
                                  e => e.value === formik.values.organizationId,
                                )?.label
                              : ''}
                          </Text>
                          <Icon
                            name="chevron-right"
                            color={baseStyles.placeholderColor}
                            size={28}
                          />
                        </View>
                      ) : (
                        <View style={baseStyles.addressPlaceholder}>
                          <Text
                            type="body2"
                            style={{
                              ...baseStyles.addressPlaceHolderText,
                              color: baseStyles.placeholderColor,
                            }}
                          >
                            {i18next.t('USERREG_SELECT_SIGNIN')}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={baseStyles.formContainer}>
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_IDNUM')}
                  labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                  maxLength={13}
                  keyboardType="number-pad"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  autoCorrect={false}
                  placeholder={i18next.t('USERREG_FILL_IDNUM')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                {formik.touched.email &&
                  formik.errors.email &&
                  renderErrorText(formik.errors.email)}
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_FIRSTNAME')}
                  labelExtra={
                    <>
                      <Text style={baseStyles.errorColor}>*</Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: baseStyles.placeholderColor,
                        }}
                      >
                        {` (${i18next.t('USERREG_NAMEIDCARD')})`}
                      </Text>
                    </>
                  }
                  maxLength={60}
                  value={formik.values.firstname}
                  onChangeText={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                  placeholder={i18next.t('USERREG_FIRSTNAME_THAI')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />

                <View style={{ marginBottom: 20 }}>
                  <TextInput
                    containerStyles={{ margin: 10 }}
                    label={i18next.t('USERREG_LASTNAME')}
                    selectionColor={'red'}
                    labelExtra={
                      <>
                        <Text style={baseStyles.errorColor}>*</Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: baseStyles.placeholderColor,
                          }}
                        >
                          {` (${i18next.t('USERREG_NAMEIDCARD')})`}
                        </Text>
                      </>
                    }
                    maxLength={60}
                    value={formik.values.lastname}
                    onChangeText={formik.handleChange('lastname')}
                    onBlur={formik.handleBlur('lastname')}
                    placeholder={i18next.t('USERREG_LASTNAME_THAI')}
                    placeholderTextColor={baseStyles.placeholderColor}
                    style={[baseStyles.textInput, baseStyles.textInputMain]}
                  />
                  {formik.touched.firstname &&
                    formik.errors.firstname &&
                    renderErrorText(formik.errors.firstname)}
                </View>
                <View style={[baseStyles.fieldSet, { marginBottom: 30 }]}>
                  <Text type="body4" style={baseStyles.legend}>
                    {' '}
                    {i18next.t('USERREG_SEX')}{' '}
                    <Text style={baseStyles.errorColor}>*</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      actions.selectGender(
                        formik.handleChange('gender'),
                        i18next.t('USERREG_SELECT'),
                      )
                    }
                    style={baseStyles.addressBtn}
                  >
                    {formik.values.gender ? (
                      <View
                        style={{
                          ...baseStyles.ctnRow,
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          type="body2"
                          style={{
                            ...baseStyles.textBoxShow,
                            textAlign: 'center',
                          }}
                        >
                          {genderText[formik.values.gender]}
                        </Text>
                        <Icon
                          name="chevron-right"
                          color={baseStyles.placeholderColor}
                          size={28}
                        />
                      </View>
                    ) : (
                      <View style={baseStyles.addressPlaceholder}>
                        <Text
                          type="body2"
                          style={{
                            ...baseStyles.addressPlaceHolderText,
                            color: baseStyles.placeholderColor,
                          }}
                        >
                          {i18next.t('USERREG_SELECT')}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={baseStyles.fieldSet}>
                    <Text type="body4" style={baseStyles.legend}>
                      {i18next.t('USERREG_BIRTHDATE')}
                      <Text style={baseStyles.errorColor}>*</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => datePickerRef?.current?.show()}
                      style={baseStyles.addressBtn}
                    >
                      {formik.values.birthDate ? (
                        <View
                          style={{
                            ...baseStyles.ctnRow,
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            type="body2"
                            style={{
                              ...baseStyles.textBoxShow,
                              textAlign: 'center',
                            }}
                          >
                            {moment(formik.values.birthDate)
                              .add(i18next.language === 'th' ? 543 : 0, 'years')
                              .format('Do MMMM YYYY')}
                          </Text>
                          <Icon
                            name="chevron-right"
                            color={baseStyles.placeholderColor}
                            size={28}
                          />
                        </View>
                      ) : (
                        <View style={baseStyles.addressPlaceholder}>
                          <Text
                            type="body2"
                            style={{
                              ...baseStyles.addressPlaceHolderText,
                              color: baseStyles.placeholderColor,
                            }}
                          >
                            {i18next.t('USERREG_SELECT')}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={[baseStyles.textInputContainer, { marginTop: 10 }]}>
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_CONTACT_NUM')}
                  labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={formik.values.number}
                  onChangeText={formik.handleChange('number')}
                  onBlur={formik.handleBlur('number')}
                  placeholder={i18next.t('USERREG_MOBILE_NUM')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                {formik.touched.number &&
                  formik.errors.number &&
                  renderErrorText(formik.errors.number)}
              </View>
              <View style={{ marginBottom: 20 }} />
              {!isThirdParty && (
                <>
                  <View style={baseStyles.textInputContainer}>
                    <TextInput
                      containerStyles={{ margin: 10 }}
                      icon={
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: 15,
                          }}
                        >
                          <Icon
                            type="font-awesome-5"
                            name={securePassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color={baseStyles.placeholderColor}
                            onPress={() => setSecurePassword(!securePassword)}
                          />
                        </TouchableOpacity>
                      }
                      label={i18next.t('USERREG_PASSWORD')}
                      labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                      value={formik.values.password}
                      onChangeText={formik.handleChange('password')}
                      placeholder={i18next.t('USERREG_LABELPASSWORD')}
                      placeholderTextColor={baseStyles.placeholderColor}
                      onBlur={formik.handleBlur('password')}
                      secureTextEntry={securePassword}
                      style={[baseStyles.textInput, baseStyles.textInputMain]}
                    />

                    <TextInput
                      containerStyles={{ margin: 10 }}
                      icon={
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: 15,
                          }}
                        >
                          <Icon
                            type="font-awesome-5"
                            name={secureConfirmPassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color={baseStyles.placeholderColor}
                            onPress={() =>
                              setSecureConfirmPassword(!secureConfirmPassword)
                            }
                          />
                        </TouchableOpacity>
                      }
                      value={formik.values.confirmpassword}
                      onChangeText={formik.handleChange('confirmpassword')}
                      placeholder={i18next.t('USERREG_CONFIRM_PASSWORD')}
                      placeholderTextColor={baseStyles.placeholderColor}
                      onBlur={formik.handleBlur('confirmpassword')}
                      secureTextEntry={secureConfirmPassword}
                      style={[
                        baseStyles.textInput,
                        baseStyles.textInputMain,
                        { top: -5 },
                      ]}
                    />
                    {formik.touched.password &&
                      formik.errors.password &&
                      renderErrorText(formik.errors.password)}
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword &&
                      renderErrorText(formik.errors.confirmpassword)}
                  </View>
                  <View style={{ marginBottom: 30 }} />
                </>
              )}
              <View
                style={{
                  marginHorizontal: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  disabled={
                    formik.errors.email ||
                    formik.errors.firstname ||
                    formik.errors.lastname ||
                    formik.errors.number ||
                    (isThirdParty
                      ? false
                      : formik.errors.password ||
                        formik.errors.confirmpassword) ||
                    !formik.values.email ||
                    !formik.values.firstname ||
                    !formik.values.lastname ||
                    !formik.values.organizationId ||
                    !formik.values.gender ||
                    !formik.values.number ||
                    (isThirdParty
                      ? false
                      : !formik.values.password ||
                        !formik.values.confirmpassword) ||
                    !formik.values.birthDate
                  }
                  style={{
                    borderRadius: 15,
                    backgroundColor: handleStyleButton(
                      formik.values,
                      formik.errors,
                    ),
                    width: '100%',
                    paddingHorizontal: 0,
                    paddingVertical: 15,
                  }}
                  onPress={formik.handleSubmit}
                >
                  <Text style={baseStyles.actionBtn}>
                    {i18next.t('NEXT_BUTTON')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InformationForm;
