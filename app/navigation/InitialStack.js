import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Images } from '@config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthStack from './AuthStack';
import Loading from '@screens/Loading';
import MainTabNavigator from './MainTabNavigator';
import BookingStack from './BookingStack';
import HistoryStack from './HistoryStack';
import MainStack from './MainStack';
import ProfileStack from './ProfileStack';
import Home from '@screens/Home';
import MyBookingsUI from '@screens/MyBookingsUI';
import PatientHIEBookingHistory from '@screens/PatientHIEBookingHistory';
import Profile from '@screens/Profile';
import UnAuthentication from '@screens/UnAuth';
import i18next from 'i18next';
import BottomTabNavigator from './BottomTabStack';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function InitialStack() {
  return (
    <Stack.Navigator
      initialRouteName="InitStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InitStack" component={BottomTabNavigator} />
      {Platform.OS === 'ios' ? (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ gestureEnabled: false }}
        />
      ) : null}
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="BookingStack" component={BookingStack} />
      <Stack.Screen
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        name="HistoryStack"
        component={HistoryStack}
      />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
    </Stack.Navigator>
  );
}
