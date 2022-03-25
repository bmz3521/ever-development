import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { BaseStyle, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Text,
  Image,
  ModalGoogleSignIn,
  ModalUI,
  IntercomButton,
} from '@components';
import Ionics from 'react-native-vector-icons/Ionicons';
import AndroidIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStyles from './styles';
import ProfileSetting from './profileSetting';
import { useHooks } from './hook';
import { useTheme } from 'react-native-elements';
import HealthkitModal from './components/HealthkitModal';
import i18next from 'i18next';
function Profile({ navigation }) {
  const {
    auth,
    healthkitEnabled,
    refModalGoogle,
    isVisibleModal,
    onLogOut,
    enableHealthKit,
    iOSManual,
    setIsVisibleModal,
    checkGoogleFitPackage,
    changeLanguageHandler,
    actions,
    isIntercomVisible,
  } = useHooks({
    navigation,
  });
  const styles = useStyles();
  const { theme } = useTheme();

  const [modal, setModal] = useState(false);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <ModalGoogleSignIn
        ref={refModalGoogle}
        openFitness={() => {
          enableHealthKit();
          refModalGoogle.current.close();
        }}
      />
      <Header text={i18next.t('PROFILE_USER_ACCOUNT')} />

      {auth.isAuthenticated ? (
        <View style={styles.backgroundColor}>
          <ProfileSetting navigation={navigation} />
        </View>
      ) : (
        <Text></Text>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: theme.colors.white }}>
          <View>
            <View style={styles.bottomCard}>
              <View style={styles.category}>
                <Text style={styles.cText}>
                  {i18next.t('PROFILE_SETTINGS')}
                </Text>
              </View>
              <View style={styles.card}>
                {healthkitEnabled ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={iOSManual ? () => setModal(true) : () => {}}
                    style={styles.item}
                  >
                    {Platform.OS === 'android' ? (
                      <AndroidIcon
                        size={25}
                        name="google-fit"
                        color={theme.colors.grey4}
                      />
                    ) : iOSManual ? (
                      <Ionics
                        size={25}
                        name="ios-fitness-outline"
                        color={theme.colors.secondary}
                      />
                    ) : (
                      <Ionics
                        size={25}
                        name="ios-fitness-outline"
                        color={theme.colors.grey4}
                      />
                    )}
                    <Text style={styles.optionGray}>
                      {iOSManual ? (
                        <Text style={styles.option}>
                          {i18next.t('PROFILE_HEALTH_APP_SETTING')}
                        </Text>
                      ) : Platform.OS === 'ios' ? (
                        <Text style={styles.optionGray}>
                          {i18next.t('PROFILE_HEALTH_APP_CONNECTED')}
                        </Text>
                      ) : (
                        i18next.t('PROFILE_GOOGLE_FIT')
                      )}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={
                      Platform.OS === 'ios'
                        ? enableHealthKit
                        : checkGoogleFitPackage
                    }
                    style={styles.item}
                  >
                    {Platform.OS === 'android' ? (
                      <AndroidIcon
                        size={25}
                        name="google-fit"
                        color={theme.colors.secondary}
                      />
                    ) : (
                      <Ionics
                        size={25}
                        name="ios-fitness-outline"
                        color={theme.colors.secondary}
                      />
                    )}
                    <Text style={styles.option}>
                      {Platform.OS === 'ios'
                        ? i18next.t('PROFILE_HEALTH_APP')
                        : i18next.t('PROFILE_GOOGLE_FIT')}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    tintColor={theme.colors.grey4}
                    source={Images.setting06}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_NOTI_SETTING')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={changeLanguageHandler}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    tintColor={theme.colors.secondary}
                    source={Images.setting14}
                  />
                  <Text style={styles.option}>ภาษา / Language</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    tintColor={theme.colors.grey4}
                    source={Images.setting07}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_MANAGE_DATA')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.category}>
                <Text style={styles.cText}>{i18next.t('PROFILE_HELP')}</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    source={Images.setting08}
                    tintColor={theme.colors.grey4}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_SAFETY_CENTER')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isIntercomVisible}
                  activeOpacity={0.9}
                  onPress={() => actions.intercomvisiblehandler()}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    source={Images.setting09}
                    tintColor={
                      isIntercomVisible
                        ? theme.colors.grey4
                        : theme.colors.secondary
                    }
                  />
                  <Text
                    style={{
                      ...styles.optionGray,
                      color: isIntercomVisible
                        ? theme.colors.grey4
                        : theme.colors.black,
                    }}
                  >
                    {i18next.t('PROFILE_HELP')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image
                    style={styles.icon}
                    source={Images.setting10}
                    tintColor={theme.colors.grey4}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_SUBMIT_FEEDBACK')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.category}>
                <Text style={styles.cText}>{i18next.t('PROFILE_LEGAL')}</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image
                    style={styles.icon}
                    source={Images.setting11}
                    tintColor={theme.colors.grey4}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_TERM')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image
                    style={styles.icon}
                    source={Images.setting12}
                    tintColor={theme.colors.grey4}
                  />
                  <Text style={styles.optionGray}>
                    {i18next.t('PROFILE_ADD_ACCOUNT')}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.card, { marginTop: 20, marginBottom: 20 }]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setIsVisibleModal(true)}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting13} />
                  <Text style={styles.option}>
                    {i18next.t('PROFILE_LOGOUT')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.versionCon}>
                <Text style={styles.version}>Version 1.8.0 (7) Dev</Text>
              </View>
            </View>
          </View>
          <ModalUI
            title={i18next.t('MODAL_LOGOUT_TITLE')}
            message={i18next.t('MODAL_LOGOUT_SUBTITLE')}
            buttonText={i18next.t('CONFIRM_BUTTON')}
            navigation={navigation}
            hideLogoModal={true}
            onOpenModal={isVisibleModal}
            setIsVisibleModal={modal => setIsVisibleModal(modal)}
            onCustomUI={false}
            successModal={true}
            animated="fade"
            cancelButton={true}
            onPress={onLogOut}
          />
        </View>
        <HealthkitModal
          theme={theme}
          modal={modal}
          onPress={() => setModal(false)}
        />
      </ScrollView>
      {isIntercomVisible && (
        <IntercomButton setVisible={actions.intercomvisiblehandler} />
      )}
    </SafeAreaView>
  );
}
export default Profile;
