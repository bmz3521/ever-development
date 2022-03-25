import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useTheme, Divider, Icon, Button } from 'react-native-elements';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  SafeAreaView,
  Header,
  TextInput,
  Loading2,
  ModalUI,
  ThirdPartyLogin,
  Text,
} from '@components';
import ComplianceModal from './ComplianceModal';
import useStyles from './styles';
import { useHooks } from './hooks';
import i18next from 'i18next';
const HeaderComponent = ({ navigation, theme }) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.white}
        barStyle="light-content"
      />
      <Header
        text={i18next.t('SIGNIN_HEADER')}
        onPressLeft={() => navigation.navigate('Home')}
      />
    </View>
  );
};

function SignIn({ navigation }) {
  const styles = useStyles();
  const { theme } = useTheme();
  const [hidden, setHidden] = useState(true);
  const {
    email,
    password,
    events,
    fail,
    auth,
    loading,
    thirdLogin,
    errorThirdParty,
  } = useHooks({ navigation });

  if (loading) {
    return <Loading2 />;
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <HeaderComponent theme={theme} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingVertical: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}
          >
            <Image
              source={Images.everLogo}
              style={{ width: 100, height: 100 }}
            />
          </View>
          {!fail && auth.error && (
            <View style={styles.signInErrorContainer}>
              <Text style={styles.textErrorDefault}>
                {i18next.t('SIGNIN_ERROR_IDNUM')}
              </Text>
            </View>
          )}

          <View style={styles.contain}>
            <TextInput
              containerStyles={{ paddingVertical: 5 }}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={events.handleChangeText('email')}
              autoCorrect={false}
              placeholder={i18next.t('SIGNIN_ENTER_CID')}
              placeholderTextColor="#7c7b7b"
              value={email}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={{ marginTop: 20 }}>
              <TextInput
                containerStyles={{ paddingVertical: 5 }}
                icon={
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 15 }}
                    onPress={() =>
                      hidden ? setHidden(false) : setHidden(true)
                    }
                  >
                    {hidden ? (
                      <Icon
                        type="font-awesome-5"
                        name="eye-slash"
                        size={18}
                        color="black"
                      />
                    ) : (
                      <Icon
                        type="font-awesome-5"
                        name="eye"
                        size={18}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                }
                style={styles.textInput}
                onChangeText={events.handleChangeText('password')}
                placeholder={i18next.t('SIGNIN_ENTER_PASSWORD')}
                placeholderTextColor="#7c7b7b"
                secureTextEntry={hidden}
                value={password}
                selectionColor={BaseColor.primaryColor}
              />

              {auth.error == 'LOGIN_FAILED' ? (
                <Text style={{ color: 'red' }}>
                  {i18next.t('SIGNIN_ERROR_SIGNIN')}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>

            {auth &&
              auth.error &&
              auth.error.err &&
              auth.error.err.statusCode === 500 && (
                <View>
                  <Text
                    style={{
                      marginTop: 10,
                      color: 'red',
                    }}
                  >
                    {i18next.t('SIGNIN_INTERNET_CONNECTION')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('UserRegistation')}
                  >
                    <View></View>
                  </TouchableOpacity>
                </View>
              )}
            <View>
              <TouchableOpacity
                full
                disabled={!email && !password && password.length < 5}
                style={styles.ctnButton}
                onPress={events.handleLoginWithEmail()}
              >
                <Text style={styles.textCtn}>{i18next.t('SIGNIN_CTA')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{ alignItems: 'flex-end' }}
              >
                {/* <Text type='body3'>Continue with phone</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AuthStack', {
                    screen: 'TermsAndCondition',
                  })
                }
              >
                <Text style={styles.eKycTextButton}>
                  {i18next.t('SIGNIN_KYC_REGISTER')}
                </Text>
              </TouchableOpacity>
              <View style={styles.faqContainer}>
                <Text style={styles.faqText}>
                  {i18next.t('SIGNIN_EKYC_FAQ')}
                </Text>
                <Icon
                  type="foundation"
                  name="info"
                  color={theme.colors.grey4}
                />
              </View>
            </View>
            <Divider style={{ marginTop: 20 }} />
            <View>
              <Text style={styles.thirdPartyTitle}>
                {i18next.t('SIGNIN_SOCIAL_ACCOUNT')}
              </Text>
              <ThirdPartyLogin
                type="otp"
                onClickHandler={() => events.handleThirdLogin('otp')}
              />
              {/* <ThirdPartyLogin
                type="facebook"
                onClickHandler={() => events.handleThirdLogin('facebook')}
              /> */}
              <ThirdPartyLogin
                type="google"
                onClickHandler={() => events.handleThirdLogin('google')}
              />
              {/* <ThirdPartyLogin
                  type="line"
                  onClickHandler={() => events.handleThirdLogin('line')}
                /> */}
              {Platform.OS === 'ios' && (
                <ThirdPartyLogin
                  type="apple"
                  onClickHandler={() => events.handleThirdLogin('apple')}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <ComplianceModal
          theme={theme}
          isVisible={!!thirdLogin}
          handleModal={events.handleThirdLogin}
          onsubmit={events[thirdLogin] ?? null}
        />
        <ModalUI onCustomUI onOpenModal={!!errorThirdParty}>
          <>
            <Icon
              type="font-awesome-5"
              name="times-circle"
              size={80}
              color={theme.colors.error}
            />
            <Text style={styles.titleThirdPartyErrorModal}>
              {i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
            </Text>
            <Text style={styles.messageThirdPartyErrorModal}>
              {errorThirdParty}
            </Text>
            <Button
              onPress={() => events.setErrorThirdParty(null)}
              title={i18next.t('CONFIRM_BUTTON')}
              titleStyle={{
                fontFamily: theme.fontFamilyDefault,
              }}
              buttonStyle={styles.buttonThirdPartyErrorModal}
              containerStyle={styles.containThirdPartyErrorModal}
            />
          </>
        </ModalUI>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignIn;
