import React from 'react';
import i18next from 'i18next';
import { Image } from 'react-native';
import { Images } from '@config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import BookingStack from './BookingStack';
import HistoryStack from './HistoryStack';
import MainStack from './MainStack';
import ProfileStack from './ProfileStack';

const BottomTab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontFamily: 'Prompt-Regular',
        },
        headerShown: false,
        tabBarLabel:
          route.name === 'MainStack'
            ? i18next.t('NAVBAR_MAIN_MENU')
            : route.name === 'BookingStack'
            ? i18next.t('NAVBAR_BOOKING_ACTIVITY')
            : route.name === 'HistoryStack'
            ? i18next.t('NAVBAR_PATIENT_RECORD')
            : route.name === 'ProfileStack'
            ? i18next.t('NAVBAR_ACCOUNT')
            : '',
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'MainStack') {
            iconName = focused
              ? Images.HomeActiveIcon
              : Images.HomeInactiveIcon;
          } else if (route.name === 'BookingStack') {
            iconName = focused
              ? Images.BookingActiveIcon
              : Images.BookingInactiveIcon;
          } else if (route.name === 'HistoryStack') {
            iconName = focused
              ? Images.HealthActiveIcon
              : Images.HealthInactiveIcon;
          } else if (route.name === 'ProfileStack') {
            iconName = focused
              ? Images.AccountActiveIcon
              : Images.AccountInactiveIcon;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: 24,
                height: 24,
                marginVertical: 5,
                resizeMode: 'contain',
              }}
            />
          );
        },
      })}
    >
      <BottomTab.Screen name="MainStack" component={MainStack} />
      <BottomTab.Screen name="BookingStack" component={BookingStack} />
      <BottomTab.Screen name="HistoryStack" component={HistoryStack} />
      <BottomTab.Screen name="ProfileStack" component={ProfileStack} />
    </BottomTab.Navigator>
  );
}
