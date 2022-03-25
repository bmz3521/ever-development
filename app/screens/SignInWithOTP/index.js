import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme, Divider, Button, Badge, Icon } from 'react-native-elements';
import { Text, Loading, ModalUI } from '@components';
import HeaderSection from './components/HeaderSection';
import PhoneInputSession from './components/PhoneInputSession';
import OTPInput from './components/OTPInput';
import InformationForm from './components/InformationForm';

import * as Constants from './constants';
import { useHooks } from './hooks';
import i18next from 'i18next';
import { error } from 'react-native-gifted-chat/lib/utils';

const SignInWithOTP = props => {
  const { navigation } = props;
  const { theme } = useTheme();
  const {
    timer,
    stateData,
    formikInformation,
    formikPhoneCid,
    onFooterButtonClick,
    onChangeValueHandler,
    onResendOTPHandler,
    loading,
    modalEvents,
  } = useHooks({ navigation });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loading isVisible={loading} />
      <HeaderSection
        isSignIn={stateData.isSignIn}
        activeNodeOne={
          stateData.step === Constants.STEP_ONE ||
          stateData.step === Constants.STEP_TWO
        }
        navigation={navigation}
        theme={theme}
      />
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              { flex: 1, backgroundColor: '#E5E5E5' },
              stateData.step === Constants.STEP_THREE && {
                justifyContent: 'space-between',
              },
            ]}
          >
            <View style={styles(theme).container}>
              <TitleSection
                theme={theme}
                title={i18next.t(
                  Constants.TITLE[
                    `${stateData.step}${
                      stateData.isSignIn ? '_SIGNIN' : '_SIGNUP'
                    }`
                  ],
                )}
              />
              {stateData.step === Constants.STEP_ONE ? (
                <PhoneInputSession
                  theme={theme}
                  stateData={stateData}
                  formikPhoneCid={formikPhoneCid}
                  onChangeValueHandler={onChangeValueHandler}
                />
              ) : stateData.step === Constants.STEP_TWO ? (
                <OTPInput
                  theme={theme}
                  stateData={stateData}
                  timer={timer}
                  onResendOTPHandler={onResendOTPHandler}
                  onChangeValueHandler={onChangeValueHandler}
                />
              ) : (
                <InformationForm
                  theme={theme}
                  stateData={stateData}
                  formikInformation={formikInformation}
                  onChangeValueHandler={onChangeValueHandler}
                />
              )}
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={onFooterButtonClick}>
              <Text
                type="body1"
                style={{
                  ...styles(theme).footerLabel,
                  ...{ zIndex: stateData.open ? -1 : 7 },
                }}
              >
                {i18next.t(Constants.FOOTER[stateData.step])}
              </Text>
            </TouchableOpacity>
            {stateData.step === Constants.STEP_THREE ? (
              <Button
                loading={loading}
                onPress={formikInformation.submitForm}
                titleStyle={{ fontFamily: theme.fontFamilyDefault }}
                buttonStyle={styles(theme).submitButton}
                title="ยืนยัน"
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal transparent visible={modalEvents.openModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.56)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 35,
              paddingHorizontal: 20,
              width: '75%',
              minWidth: 250,
              maxWidth: 300,
              borderRadius: 20,
            }}
          >
            <Button
              onPress={() => {
                onChangeValueHandler('isSignIn', true);
                modalEvents.setOpenModal(false);
              }}
              titleStyle={{
                fontFamily: theme.fontFamilyDefault,
                lineHeight: 26,
              }}
              buttonStyle={[
                styles(theme).buttonChoice,
                { backgroundColor: theme.colors.primary },
              ]}
              title={i18next.language === 'th' ? 'ลงชื่อเข้าใช้' : 'Login'}
            />
            <Divider style={{ marginVertical: 18 }} />
            <View>
              <Badge
                status="error"
                value="New here?"
                containerStyle={{
                  position: 'absolute',
                  zIndex: 1,
                  right: 7,
                  top: -7,
                }}
              />
              <Button
                onPress={() => {
                  onChangeValueHandler('isSignIn', false);
                  modalEvents.setOpenModal(false);
                }}
                titleStyle={{
                  fontFamily: theme.fontFamilyDefault,
                  lineHeight: 26,
                }}
                buttonStyle={styles(theme).buttonChoice}
                title={i18next.language === 'th' ? 'สมัครสมาชิก' : 'Sign up'}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ModalUI onCustomUI onOpenModal={stateData.errorModal}>
        <>
          <Icon
            type="font-awesome-5"
            name="times-circle"
            size={80}
            color={theme.colors.error}
          />
          <Text style={styles(theme).titleThirdPartyErrorModal}>
            {i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
          </Text>
          <Text style={styles(theme).messageThirdPartyErrorModal}>
            {stateData.error}
          </Text>
          <Button
            onPress={() => onChangeValueHandler('errorModal', false)}
            title={i18next.t('CONFIRM_BUTTON')}
            titleStyle={{
              fontFamily: theme.fontFamilyDefault,
            }}
            buttonStyle={styles(theme).buttonThirdPartyErrorModal}
            containerStyle={styles(theme).containThirdPartyErrorModal}
          />
        </>
      </ModalUI>
    </SafeAreaView>
  );
};

const TitleSection = ({ title, theme }) => {
  return (
    <View>
      <View style={styles(theme).titleRow}>
        <Image source={require('./icons/icon_tile.png')} />
        <Text type="h6" style={{ marginLeft: 15 }}>
          {title}
        </Text>
      </View>
      <Divider color="#f5f5f5" width={2} style={{ paddingVertical: 10 }} />
    </View>
  );
};

export default SignInWithOTP;

const styles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      margin: 15,
      backgroundColor: 'white',
      borderRadius: 16,
    },
    messageThirdPartyErrorModal: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 4,
      paddingHorizontal: 20,
    },
    titleThirdPartyErrorModal: {
      marginTop: 10,
      color: theme.colors.error,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: theme.fontFamilyBold,
    },
    buttonThirdPartyErrorModal: {
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      paddingVertical: 10,
      marginTop: 10,
    },
    containThirdPartyErrorModal: {
      width: '100%',
      marginVertical: 10,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    footerLabel: {
      textAlign: 'center',
      marginTop: 10,
      color: '#2BA275',
    },
    submitButton: {
      borderRadius: 10,
      paddingVertical: 10,
      marginHorizontal: 20,
      marginBottom: 40,
    },
    buttonChoice: {
      borderRadius: 10,
      paddingVertical: 10,
      marginHorizontal: 20,
    },
  });
