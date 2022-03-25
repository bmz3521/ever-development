import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '@screens/SignIn';
import SignInWithOTP from '@screens/SignInWithOTP';
import TermsAndCondition from '@screens/UserRegistation/screens/ComplianceScreen/TermsAndCondition';
import PrivacyPolicy from '@screens/UserRegistation/screens/ComplianceScreen/PrivacyPolicy';

import InformationForm from '@screens/UserRegistation/screens/InformationForm';
import AddressForm from '@screens/UserRegistation/screens/AddressForm';
import PlaceHolderImage from '@screens/UserRegistation/screens/PlaceHolderImage';
import PlaceHolderIdCard from '@screens/UserRegistation/screens/PlaceHolderIdCard';
import StatusModal from '@screens/UserRegistation/screens/StatusModal';

import CameraIdCard from '@screens/UserRegistation/screens/CameraIdCard';
import PreviewImage from '@screens/UserRegistation/screens/PreviewImage';
import PreviewIdCard from '@screens/UserRegistation/screens/PreviewIdCard';
import SendRegsiterForm from '@screens/UserRegistation/screens/SendRegsiterForm';

import ResetPassword from '@screens/ResetPassword';
import ActiveDataProvince from '@screens/ActiveDataProvince';
import District from '@screens/ActiveDataProvince/District';
import SubDistrict from '@screens/ActiveDataProvince/SubDistrict';
export default function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignInWithOTP" component={SignInWithOTP} />
      <Stack.Group
        screenOptions={{ gestureEnabled: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="AddressForm" component={AddressForm} />
        <Stack.Screen name="InformationForm" component={InformationForm} />
        <Stack.Screen name="PlaceHolderImage" component={PlaceHolderImage} />
        <Stack.Screen
          name="PreviewImage"
          component={PreviewImage}
          options={{
            gestureEnabled: false,
            animation: 'slide_from_bottom',
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen name="PlaceHolderIdCard" component={PlaceHolderIdCard} />
        <Stack.Screen
          name="PreviewIdCard"
          component={PreviewIdCard}
          options={{
            gestureEnabled: false,
            animation: 'slide_from_bottom',
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen name="SendRegsiterForm" component={SendRegsiterForm} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ gestureEnabled: false, presentation: 'card' }}
      >
        <Stack.Screen
          name="ActiveDataProvince"
          component={ActiveDataProvince}
        />
        <Stack.Screen name="District" component={District} />
        <Stack.Screen name="SubDistrict" component={SubDistrict} />
      </Stack.Group>
      <Stack.Screen
        name="CameraIdCard"
        component={CameraIdCard}
        options={{
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="StatusModal"
        component={StatusModal}
        options={{
          gestureEnabled: false,
          animation: 'slide_from_bottom',
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
