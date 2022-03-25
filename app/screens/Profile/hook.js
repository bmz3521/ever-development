import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestFitness, checkIsAuthorized } from '@utils/fitnessFunction';
import i18next from 'i18next';
import { NativeModules } from 'react-native';
import {
  getFcmToken,
  setIntercomBtnVisiblehandler,
  getIntercomBtnVisible,
} from '@utils/asyncStorage';
import { AuthActions, UserActions } from '@actions';
import { useChatContext } from 'app/hooks/useGetStream';

const useHooks = ({ navigation }) => {
  const { StreamChat } = useChatContext();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const { CheckInstalledApplication } = NativeModules;
  const dispatch = useDispatch();

  const isFocus = useIsFocused();
  const refModalGoogle = useRef();
  const [loading, setLoading] = useState(false);
  const [healthkitEnabled, setHealthkitEnabled] = useState(false);
  const [isIntercomVisible, setIsIntercomVisible] = useState(false);
  const [iOSManual, setiOSManual] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    getAllKeys();
    checkIntercom();
    checkAuthorized();
  }, [isFocus]);

  const checkAuthorized = async () => {
    const { isIosManual, isAuthorized } = await checkIsAuthorized();
    setHealthkitEnabled(isAuthorized);
    setiOSManual(isIosManual);
  };

  const checkIntercom = async () => {
    try {
      const isVisible = await getIntercomBtnVisible();
      setIsIntercomVisible(isVisible);
    } catch (error) {}
  };

  const intercomvisiblehandler = async () => {
    try {
      await setIntercomBtnVisiblehandler();
      const isVisible = await getIntercomBtnVisible();
      // dispatch(UserActions.updateUserSettingLocal({ helpCenter: isVisible }))
      // dispatch(UserActions.updateUserSetting({ appUserId: user.data.userId, helpCenter: isVisible }))
      setIsIntercomVisible(isVisible);
    } catch (error) {}
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log('[error]', e);
    }
  };

  const checkGoogleFitPackage = async () => {
    const isInstalled = await CheckInstalledApplication.isInstalled(
      'com.google.android.apps.fitness',
    );
    if (isInstalled) {
      refModalGoogle && refModalGoogle.current.show('default');
    } else {
      refModalGoogle && refModalGoogle.current.show('playstore');
    }
  };

  const enableHealthKit = async () => {
    const { isIosManual, isAuthorized } = await requestFitness();
    setiOSManual(isIosManual);
    setHealthkitEnabled(isAuthorized);
  };

  const changeLanguage = async language => {
    dispatch(UserActions.updateUserSettingLocal({ language }));
    dispatch(
      UserActions.updateUserSetting({ appUserId: user.data.userId, language }),
    );
    i18next.changeLanguage(language);
  };

  const changeLanguageHandler = () => {
    const lang = i18next.language;
    navigation.navigate('ListingData', {
      callBack: changeLanguage,
      selected: true,
      title: 'ภาษา / Language',
      data: [
        { value: 'th', label: 'ไทย', check: lang === 'th' },
        { value: 'en', label: 'English', check: lang === 'en' },
      ],
      pageCallback: 'Profile',
    });
  };

  const onLogOuthandler = async () => {
    const fcmToken = await getFcmToken();
    dispatch(
      AuthActions.logout({
        callback: response => {
          if (response.success) {
            StreamChat.logout();
          }
        },
        fcmToken: fcmToken,
        provider: auth.isThirdPartyAuth?.provider,
      }),
    );
    const keys = ['access_token'];
    await AsyncStorage.multiRemove(keys);
  };

  const onLogOut = async () => {
    navigation.navigate('Loading', { onLogOut: onLogOuthandler });
  };

  return {
    actions: {
      intercomvisiblehandler,
    },
    auth,
    user,
    healthkitEnabled,
    refModalGoogle,
    isFocus,
    loading: loading || user.userSetting?.loading,
    refModalGoogle,
    isVisibleModal,
    enableHealthKit,
    isIntercomVisible,
    iOSManual,
    onLogOut,
    setIsVisibleModal,
    changeLanguageHandler,
    checkGoogleFitPackage,
  };
};

export { useHooks };
