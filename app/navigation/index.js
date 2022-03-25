import React, { useEffect, useState, useCallback } from 'react';
import analytics from '@react-native-firebase/analytics';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '@actions';
import Loading from '@screens/Loading';
import { createFCMTokenManually } from '@services/fcmService';
/* Bottom Tabs Navigator */
import MainTabNavigator from './MainTabNavigator';
import InitialStack from './InitialStack';
/* Modal Screen only affect iOS */

import VideoCall from '@screens/VideoCall';
import ChatMessages from '@screens/ChatMessages';
import ListingData from '@screens/ListingData';

import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotificationService';
import { setFcmToken, getFcmToken } from '@utils/asyncStorage';
import Intercom from '@intercom/intercom-react-native';
import MainStack from './MainStack';
import { useChatContext } from 'app/hooks/useGetStream';

const RootStack = createStackNavigator();
export default function Navigator() {
  const { clientChat } = useChatContext();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [screenName, setScreenName] = useState('');
  const navigationRef = React.useRef();
  const routeNameRef = React.useRef();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      primary: '#2AA275',
    },
    fontsFamilyRegular: 'Prompt-Regular',
  };

  const navigateFunction = data => {
    if (data?.screen === 'Home') {
      navigationRef.current.navigate('MainStack', {
        screen: data?.screen,
      });
    } else if (data?.screen === 'Booking') {
      navigationRef.current.navigate('BookingStack');
      if (data?.bookingId) {
        navigationRef.current.navigate('BookingStack', {
          screen: 'MyBookingActivity',
          params: { bookingId: data?.bookingId },
        });
      }
    } else if (data?.screen === 'Profile') {
      navigationRef.current.navigate('ProfileStack', {
        screen: data?.screennotify?.screen,
      });
    } else if (data?.screen === 'TeleSymptom') {
      navigationRef.current.navigate('MainStack', {
        screen: 'PractitionerType',
      });
    } else {
      navigationRef.current.navigate(data?.screen);
    }
  };

  useEffect(() => {
    const createTokenAuthenticated = async () => {
      const fcmToken = await getFcmToken();
      if (!fcmToken) return;
      createFCMTokenManually(fcmToken);
    };
    if (auth.isAuthenticated) createTokenAuthenticated();
  }, [auth.isAuthenticated]);

  useEffect(() => {
    async function onOpenNotification(notify) {
      const optionData = screenName ? screenName : notify;
      if (notify.alertAction) {
        if (notify?.local) {
          navigateFunction(notify);
        } else if (!screenName && optionData.screen) {
          setTimeout(() => {
            navigateFunction(optionData);
          }, 3000);
        } else if (optionData.screen) {
          navigateFunction(optionData);
        }
      }
    }

    async function onNotification(notify, data) {
      if (data.auth) {
        dispatch(UserActions.setVerifyStatus({ data: data.auth }));
      }
      if (data.service && user.data?.userId) {
        dispatch(UserActions.getUpdateUserOrganization(user.data?.userId));
      }
      if (data.page) {
        setScreenName({ screen: data.page, bookingId: data?.bookingId });
      }
      if (data.id) {
        const message = await clientChat.getMessage(data.id);
        notify = {
          ...notify,
          title: message.message.user.name
            ? message.message.user.name
            : 'Practitioner',
          body: message.message.text,
        };
      }
      const options = {
        soundName: 'default',
        playSound: true,
      };
      console.log({ notify, data });
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
        data,
      );
    }

    function onRegister(token) {
      Intercom.sendTokenToIntercom(token);
      setFcmToken(token);
    }

    async function init() {
      await fcmService.registerAppWithFCM();
      fcmService.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);
    }

    init();
    Platform.OS === 'android' ? StatusBar.setTranslucent(true) : null;
    Platform.OS === 'android' ? StatusBar.setBackgroundColor('white') : null;
    StatusBar.setBarStyle('dark-content');
    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, [screenName, user.data?.userId, clientChat]);

  const onReadyHandler = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
  }, [routeNameRef.current, navigationRef.current]);

  const onStateChangeHandler = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute().name;
    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    routeNameRef.current = currentRouteName;
  }, [routeNameRef.current, navigationRef.current]);

  return (
    <NavigationContainer
      onReady={onReadyHandler}
      onStateChange={onStateChangeHandler}
      ref={navigationRef}
      theme={MyTheme}
    >
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        mode="modal"
      >
        <RootStack.Screen
          name="Loading"
          component={Loading}
          options={{ gestureEnabled: false }}
        />
        {/* Tab  Navigator*/}
        <RootStack.Screen name="Main" component={InitialStack} />

        {/* Video Call */}
        <RootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <RootStack.Screen name="VideoCall" component={VideoCall} />
          <RootStack.Screen name="ChatMessages" component={ChatMessages} />
          <RootStack.Screen
            name="ListingData"
            component={ListingData}
            options={{ gestureEnabled: false }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
