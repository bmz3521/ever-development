import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, Header, TextInput, Text } from '@components';
import ProgressCircle from '../../components/ProgressCircle';
import useBaseStyles from '../../styles';
import { useHooks } from './hooks';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '@actions';
import i18next from 'i18next';
const AddressForm = ({ navigation }) => {
  const register = useSelector(state => state.register);
  const { actions, formik } = useHooks({
    navigation,
    initailValues: register ?? {},
  });
  const dispatch = useDispatch();
  const baseStyles = useBaseStyles();
  const renderErrorText = msg => {
    return <Text style={baseStyles.errorText}>{msg}</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
      <StatusBar animated={true} barStyle={'default'} />
      <Header
        text={i18next.t('USERREG_REGISTER')}
        onPressLeft={() => {
          dispatch(AuthActions.setInfoForm(formik.values));
          navigation.navigate('AuthStack', { screen: 'InformationForm' });
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={baseStyles.contain}>
              <View style={baseStyles.formTitleContainer}>
                <View style={{ flex: 2, padding: 10 }}>
                  <Text type="body2">
                    {i18next.t('USERREG_CURRENT_ADDRESS')}
                  </Text>
                </View>
                <ProgressCircle percent={50} label={'2/4'} />
              </View>
              <View style={{ marginBottom: 25 }} />
              <View style={baseStyles.textInputContainer}>
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_BUILDING')}
                  labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                  onChangeText={formik.handleChange('addressInfo.no')}
                  onBlur={formik.handleBlur('addressInfo.no')}
                  value={formik.values.addressInfo?.no}
                  placeholder={i18next.t('USERREG_BUILDING')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                {formik.touched.addressInfo?.no &&
                  formik.errors.addressInfo?.no &&
                  renderErrorText(formik.errors.addressInfo.no)}
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_STREET')}
                  onChangeText={formik.handleChange('addressInfo.village')}
                  value={formik.values.addressInfo?.village}
                  placeholder={i18next.t('USERREG_STREET')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_ROAD')}
                  onChangeText={formik.handleChange('addressInfo.road')}
                  value={formik.values.addressInfo?.road}
                  placeholder={i18next.t('USERREG_ROAD')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                <TextInput
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_SOI')}
                  onChangeText={formik.handleChange('addressInfo.soi')}
                  value={formik.values.addressInfo?.soi}
                  placeholder={i18next.t('USERREG_SOI')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
              </View>
              <View style={{ ...baseStyles.textInputContainer, marginTop: 20 }}>
                <View style={baseStyles.textPress}>
                  <Text type="body4" style={baseStyles.legend}>
                    {` ${i18next.t('USERREG_PROVINCE')} `}
                    <Text style={baseStyles.errorColor}>*</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={actions.selectAddress}
                    style={baseStyles.addressBtn}
                  >
                    {formik.values.addressInfo?.province ? (
                      <View
                        style={{ ...baseStyles.ctnRow, alignItems: 'center' }}
                      >
                        <Text type="body2" style={baseStyles.textBoxShow}>
                          {`${formik.values.addressInfo?.province},  ${formik.values.addressInfo?.district},  ${formik.values.addressInfo?.subDistrict} `}
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
                          {i18next.t('USERREG_PROVINCE')}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[baseStyles.textInputContainer, { marginTop: 18 }]}>
                <TextInput
                  keyboardType="number-pad"
                  containerStyles={{ margin: 10 }}
                  label={i18next.t('USERREG_POSTAL')}
                  maxLength={5}
                  labelExtra={<Text style={baseStyles.errorColor}>*</Text>}
                  defaultValue={formik.values.addressInfo?.postalCode}
                  value={formik.values.addressInfo?.postalCode}
                  onChangeText={formik.handleChange('addressInfo.postalCode')}
                  onBlur={formik.handleBlur('addressInfo.postalCode')}
                  placeholder={i18next.t('USERREG_POSTAL')}
                  placeholderTextColor={baseStyles.placeholderColor}
                  style={[baseStyles.textInput, baseStyles.textInputMain]}
                />
                {formik.touched.addressInfo?.postalCode &&
                  formik.errors.addressInfo?.postalCode &&
                  renderErrorText(formik.errors.addressInfo?.postalCode)}
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    width: '100%',
                    paddingHorizontal: 0,
                    paddingVertical: 15,
                    backgroundColor:
                      formik.errors.postalCode ||
                      formik.errors.no ||
                      !formik.values.addressInfo?.no ||
                      !formik.values.addressInfo?.district ||
                      !formik.values.addressInfo?.postalCode
                        ? baseStyles.placeholderColor
                        : baseStyles.primaryColor,
                  }}
                  disabled={
                    formik.errors.postalCode ||
                    formik.errors.no ||
                    !formik.values.addressInfo?.no ||
                    !formik.values.addressInfo?.district ||
                    !formik.values.addressInfo?.postalCode
                  }
                  onPress={formik.handleSubmit}
                >
                  <Text style={baseStyles.actionBtn}>
                    {i18next.t('NEXT_BUTTON')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddressForm;
