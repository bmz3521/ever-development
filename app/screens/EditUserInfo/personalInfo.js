import React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { ModalUI, DateWheelPicker } from '@components';
import ErrorMessage from './ErrorMessage';
import { TextInputMask } from 'react-native-masked-text';
import { checkCIdVerify } from '@utils/alertVerifyUser';
import styles, {
  Container,
  TextBox,
  BoxSet,
  BoxLabel,
  TextPress,
  TextBoxValue,
} from './styles';
import { useHooks } from './hook';
import i18next from 'i18next';

const PersonalInfo = ({ navigation }) => {
  const {
    data,
    validationSchemaUserInfo,
    failModal,
    successModal,
    theme,
    dateValidate,
    formRef,
    Formik,
    updateInfo,
    setSuccessModal,
    setFailModal,
    convertCidFormat,
    convertBirthDate,
    handleSubmitForm,
    convertPhoneNumberFormat,
    Gender,
    ChevronRight,
    selectGender,
    dateWheelRef,
  } = useHooks({ navigation });
  const { user, auth } = data;
  const userInfo = user?.data;
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Formik
            initialValues={{
              firstName: userInfo?.firstname,
              lastName: userInfo?.lastname,
              cId: convertCidFormat(userInfo?.cId),
              birthDate: userInfo?.birthDate,
              genderValue: userInfo?.gender,
              mobileNumber: convertPhoneNumberFormat(userInfo?.mobileNumber),
            }}
            onSubmit={updateInfo}
            validationSchema={validationSchemaUserInfo}
            innerRef={formRef}
          >
            {({
              values,
              handleChange,
              errors,
              handleBlur,
              touched,
              setFieldValue,
              setFieldTouched,
            }) => (
              <>
                <BoxSet theme={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('SETTINGINFO_FIRSTNAME')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_ENTER_FIRSTNAME')}
                    onBlur={handleBlur('firstName')}
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                    width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.firstName}
                    visible={touched.firstName}
                  />
                }
                <BoxSet theme={{ backgroundColor: 'white' }}>
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('SETTINGINFO_LASTNAME')}
                  </BoxLabel>
                  <TextBox
                    customStyle={true}
                    theme={{ theme: theme.fontFamilyDefault }}
                    keyboardType="default"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_ENTER_LASTNAME')}
                    onBlur={handleBlur('lastName')}
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.lastName}
                    visible={touched.lastName}
                  />
                }
                {auth.isThirdPartyAuth?.isAuth &&
                  checkCIdVerify(user.data.cId) && (
                    <BoxSet theme={{ backgroundColor: 'white' }}>
                      <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                        {i18next.t('SETTINGINFO_IDCARD')}
                      </BoxLabel>
                      <TextInputMask
                        style={styles(theme).textInputMask}
                        keyboardType="numeric"
                        placeholderTextColor="#cfcfcf"
                        placeholder="0-0000-00000-00-0"
                        onBlur={handleBlur('cId')}
                        onChangeText={handleChange('cId')}
                        value={values.cId}
                        width="100%"
                        type={'custom'}
                        options={{
                          mask: '9-9999-99999-99-9',
                        }}
                      />
                    </BoxSet>
                  )}
                {<ErrorMessage error={errors.cId} visible={touched.cId} />}
                <TouchableOpacity onPress={() => dateWheelRef?.current?.show()}>
                  <BoxSet theme={{ backgroundColor: 'white' }}>
                    <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                      {i18next.t('SETTINGINFO_BIRTHDATE')}
                    </BoxLabel>
                    <DateWheelPicker
                      title={i18next.t('USERREG_WHEELDATE')}
                      onSubmit={date => setFieldValue('birthDate', date)}
                      initialDate={
                        values.birthDate
                          ? new Date(values.birthDate)
                          : new Date()
                      }
                      ref={dateWheelRef}
                    />
                    <View
                      style={[styles(theme).textInputMask, { marginTop: 20 }]}
                    >
                      <Text
                        style={{
                          fontFamily: theme.fontFamilyDefault,
                          fontSize: 20,
                          color: '#545454',
                        }}
                      >
                        {convertBirthDate(values.birthDate)}
                      </Text>
                    </View>
                    {/* <TextInputMask
                    style={styles(theme).textInputMask}
                    keyboardType="numeric"
                    placeholderTextColor="#cfcfcf"
                    placeholder={i18next.t('PROFILE_EDIT_ENTER_BIRTHDATE')}
                    onBlur={handleBlur('birthDate')}
                    onChangeText={handleChange('birthDate')}
                    value={values.birthDate}
                    width="100%"
                    type={'custom'}
                    options={{
                      mask: '99 / 99 / 9999',
                    }}
                  /> */}
                  </BoxSet>
                </TouchableOpacity>
                {
                  <ErrorMessage
                    error={dateValidate ? dateValidate : null}
                    visible={dateValidate}
                  />
                }
                <TextPress
                  style={{ backgroundColor: 'transparent' }}
                  onPress={selectGender}
                >
                  <ChevronRight height={25} />
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('SETTINGINFO_SEX')}
                  </BoxLabel>
                  <TextBoxValue
                    style={{ height: 55 }}
                    theme={{ theme: theme.fontFamilyDefault }}
                  >
                    {Gender[values.genderValue] ??
                      i18next.t('LISTDATA_EMPTY_HEADER')}
                  </TextBoxValue>
                </TextPress>
                {
                  <ErrorMessage
                    error={errors.gender}
                    visible={touched.gender}
                  />
                }
                <BoxSet
                  theme={{
                    backgroundColor: 'white',
                  }}
                >
                  <BoxLabel theme={{ theme: theme.fontFamilyDefault }}>
                    {i18next.t('SETTINGINFO_PHONE_NUMBER')}
                  </BoxLabel>
                  <TextInputMask
                    style={styles(theme).textInputMask}
                    keyboardType="numeric"
                    placeholderTextColor="#cfcfcf"
                    placeholder="000-000-0000"
                    onBlur={handleBlur('mobileNumber')}
                    onChangeText={handleChange('mobileNumber')}
                    value={values.mobileNumber}
                    width="100%"
                    type={'custom'}
                    options={{
                      mask: '999-999-9999',
                    }}
                    // theme={{
                    //   theme: theme.fontFamilyDefault,
                    //   paddingTop: Platform.OS === 'android' ? '10px' : '0px',
                    //   marginTop: '0px',
                    //   height: '60',
                    // }}
                    // maxLength={10}
                    // paddingTop="0"
                    // keyboardType="numeric"
                    // placeholder="หมายเลขโทรศัพท์"
                    // placeholderTextColor="#cfcfcf"
                    // onBlur={handleBlur('mobileNumber')}
                    // onChangeText={handleChange('mobileNumber')}
                    // value={values.mobileNumber}
                    // width="100%"
                  />
                </BoxSet>
                {
                  <ErrorMessage
                    error={errors.mobileNumber}
                    visible={touched.mobileNumber}
                  />
                }
                {
                  <ErrorMessage
                    error={errors.postalCode}
                    visible={touched.postalCode}
                  />
                }
              </>
            )}
          </Formik>
        </Container>

        <ModalUI
          title={i18next.t('PROFILE_EDIT_INFO_SAVECOMP')}
          message={``}
          buttonText={i18next.t('CONFIRM_BUTTON')}
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={successModal}
          setIsVisibleModal={modal => setSuccessModal(modal)}
          onCustomUI={false}
          successModal={true}
          animated="fade"
        />
        <ModalUI
          title={i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
          message={i18next.t('PROFILE_EDIT_INFO_SAVEERR_SUB')}
          buttonText={i18next.t('CONFIRM_BUTTON')}
          navigation={navigation}
          hideLogoModal={false}
          onOpenModal={failModal}
          setIsVisibleModal={modal => setFailModal(modal)}
          onCustomUI={false}
          successModal={false}
          onPress={() => navigation.goBack()}
          animated="fade"
        />
      </ScrollView>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            borderRadius: 15,
            backgroundColor: '#00bae5',
            padding: 15,
          }}
          onPress={handleSubmitForm}
        >
          <Text
            style={{
              fontFamily: theme.fontFamilyDefault,
              fontSize: theme.fontSizeDefault,
              color: theme.colors.white,
              alignSelf: 'center',
            }}
          >
            {i18next.t('PROFILE_EDIT_INFO_SAVE')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PersonalInfo;
