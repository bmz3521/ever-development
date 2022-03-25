import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
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
import { useTheme } from 'react-native-elements';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const auth = useSelector(state => state.auth);
  const { theme } = useTheme();
  //   const {t} = useTranslation();
  //   const {colors} = useTheme();
  const color = 'black';
  //   const font = useFont();
  //   const auth = useSelector(state => state.auth);
  //   const login = auth.login.success;
  const nameTab = {
    Home: {
      name: 'NAVBAR_MAIN_MENU',
      active: Images.HomeActiveIcon,
      inActive: Images.HomeInactiveIcon,
    },
    MyBookingsUI: {
      name: 'NAVBAR_BOOKING_ACTIVITY',
      active: Images.BookingActiveIcon,
      inActive: Images.BookingInactiveIcon,
    },
    PatientHIEBookingHistory: {
      name: 'NAVBAR_PATIENT_RECORD',
      active: Images.HealthActiveIcon,
      inActive: Images.HealthInactiveIcon,
    },
    Profile: {
      name: 'NAVBAR_ACCOUNT',
      active: Images.AccountActiveIcon,
      inActive: Images.AccountInactiveIcon,
    },
  };
  return (
    <BottomTab.Navigator
      initialRouteName=""
      headerMode="none"
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontFamily: 'Prompt-Regular',
        },
        headerShown: false,
        tabBarLabel: () => (
          <ButtomLable nameTab={nameTab[route.name].name} theme={theme} />
        ),
        tabBarIcon: ({ focused }) => (
          <RenderTabIcon focused={focused} nameTab={nameTab} route={route} />
        ),
      })}
    >
      <BottomTab.Screen name="Home" headerMode="none" component={Home} />
      {!auth.isAuthenticated ? (
        <BottomTab.Screen
          name="MyBookingsUI"
          headerMode="none"
          component={UnAuthentication}
          initialParams={{
            title: 'NAVBAR_BOOKING_ACTIVITY',
            desp: 'UNAUTH_BOOKING',
          }}
        />
      ) : (
        <BottomTab.Screen
          name="MyBookingsUI"
          headerMode="none"
          component={MyBookingsUI}
        />
      )}

      {!auth.isAuthenticated ? (
        <BottomTab.Screen
          name="PatientHIEBookingHistory"
          headerMode="none"
          component={UnAuthentication}
          initialParams={{
            title: 'NAVBAR_PATIENT_RECORD',
            desp: 'UNAUTH_HISTORY',
          }}
        />
      ) : (
        <BottomTab.Screen
          name="PatientHIEBookingHistory"
          headerMode="none"
          component={PatientHIEBookingHistory}
        />
      )}

      {!auth.isAuthenticated ? (
        <BottomTab.Screen
          name="Profile"
          headerMode="none"
          component={UnAuthentication}
          initialParams={{
            title: 'NAVBAR_ACCOUNT',
            desp: 'UNAUTH_PROFILE',
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Profile"
          headerMode="none"
          component={Profile}
        />
      )}
    </BottomTab.Navigator>
  );
}
const ButtomLable = ({ theme, nameTab }) => {
  return (
    <Text
      style={{
        fontFamily: theme.fontFamilyDefault,
        fontSize: 10,
        color: theme.colors.grey3,
      }}
    >
      {i18next.t(nameTab)}
    </Text>
  );
};
const RenderTabIcon = ({ focused, nameTab, route }) => {
  const iconName = focused
    ? nameTab[route.name].active
    : nameTab[route.name].inActive;
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
};
