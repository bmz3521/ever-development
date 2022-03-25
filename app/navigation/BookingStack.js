import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import MyBookingsUI from '@screens/MyBookingsUI';
import BookingList from '@screens/BookingList';
import MyBookingActivity from '@screens/MyBookingActivity';
import AppointmentDetail from '@screens/AppointmentDetail';
import DocumentDisplay from '@screens/DocumentDisplay';
import UnAuthentication from '@screens/UnAuth';
import MedicalSearchPage from '@screens/MedicalSearchPage';
import Chat from '@screens/Chat';
import i18next from 'i18next';

export default function BookingStack() {
  const Stack = createNativeStackNavigator();
  const auth = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName="MyBookingsUI"
      screenOptions={{ headerShown: false }}
    >
      {!auth.isAuthenticated ? (
        <Stack.Screen
          name="UnAuthentication"
          component={UnAuthentication}
          initialParams={{
            title: i18next.t('NAVBAR_BOOKING_ACTIVITY'),
            desp: i18next.t('UNAUTH_BOOKING'),
          }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen name="MyBookingsUI" component={MyBookingsUI} />
          <Stack.Screen name="BookingList" component={BookingList} />
          <Stack.Screen
            name="MedicalSearchPage"
            component={MedicalSearchPage}
          />

          <Stack.Screen
            name="MyBookingActivity"
            component={MyBookingActivity}
            // options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            // options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="AppointmentDetail"
            component={AppointmentDetail}
          />
          {/* <Stack.Screen name="SavePlace" component={SavePlace} />
          <Stack.Screen
            name="GooglePlace"
            component={GooglePlace}
            options={{ presentation: 'fullScreenModal' }}
          /> */}
          <Stack.Screen name="DocumentDisplay" component={DocumentDisplay} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
