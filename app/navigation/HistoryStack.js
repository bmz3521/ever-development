import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientHIEBookingHistory from '@screens/PatientHIEBookingHistory';
import PatientHIEBookingDetail from '@screens/PatientHIEBookingDetail';
import LabList from '@screens/LabList';
import DocumentDisplay from '@screens/DocumentDisplay';
import UnAuthentication from '@screens/UnAuth';
import i18next from 'i18next';

export default function HistoryStack() {
  const Stack = createNativeStackNavigator();
  const auth = useSelector(state => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!auth.isAuthenticated ? (
        <Stack.Screen
          name="UnAuthentication"
          component={UnAuthentication}
          initialParams={{
            title: i18next.t('NAVBAR_PATIENT_RECORD'),
            desp: i18next.t('UNAUTH_HISTORY'),
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="PatientHIEBookingHistory"
            component={PatientHIEBookingHistory}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              options={{
                animation: 'slide_from_bottom',
                animationTypeForReplace: 'pop',
              }}
              name="PatientHIEBookingDetail"
              component={PatientHIEBookingDetail}
            />
            <Stack.Screen
              options={{
                animation: 'slide_from_right',
                animationTypeForReplace: 'pop',
              }}
              component={DocumentDisplay}
              name="DocumentDisplay"
            />
            <Stack.Screen
              options={{
                animation: 'slide_from_right',
                animationTypeForReplace: 'pop',
              }}
              component={LabList}
              name="LabList"
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
