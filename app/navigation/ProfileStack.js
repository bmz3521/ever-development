import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import ChangeLanguage from '@screens/ChangeLanguage';
import Profile from '@screens/Profile';
import SettingInfo from '@screens/SettingInfo';
import EditUserInfo from '@screens/EditUserInfo';
import EditAddressNo from '@screens/EditUserInfo/AddressInfo/editAddressNo';
import SettingProvider from '@screens/SettingProvider';
import ActiveDataProvince from '@screens/ActiveDataProvince';
import ListingData from '@screens/ListingData';
import District from '@screens/ActiveDataProvince/District';
import SubDistrict from '@screens/ActiveDataProvince/SubDistrict';
import UnAuthentication from '@screens/UnAuth';
import i18next from 'i18next';

const Stack = createStackNavigator();

const verticalAnimation = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function ProfileStack() {
  const auth = useSelector(state => state.auth);
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      {!auth.isAuthenticated ? (
        <Stack.Screen
          name="UnAuthentication"
          component={UnAuthentication}
          initialParams={{
            title: i18next.t('NAVBAR_ACCOUNT'),
            desp: i18next.t('UNAUTH_PROFILE'),
          }}
        />
      ) : (
        <>
          <Stack.Group screenOptions={{ presentation: 'card' }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="SettingInfo" component={SettingInfo} />
            <Stack.Screen name="SettingProvider" component={SettingProvider} />
          </Stack.Group>

          {/* <Stack.Group screenOptions={{ presentation: 'card' }}> */}
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
          {/* </Stack.Group> */}
          <Stack.Screen
            name="EditUserInfo"
            component={EditUserInfo}
            options={verticalAnimation}
          />
          <Stack.Screen
            name="EditAddressNo"
            component={EditAddressNo}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen name="ListingData" component={ListingData} />
          <Stack.Screen name="District" component={District} />
          <Stack.Screen name="SubDistrict" component={SubDistrict} />
          <Stack.Screen
            name="ActiveDataProvince"
            component={ActiveDataProvince}
          />
        </>
      )}
      {/*Setting Component */}
      {/* Global UI Province District SubDistrict and PostalCode */}
    </Stack.Navigator>
  );
}
