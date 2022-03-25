import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home';

import MedicalSearchPage from '@screens/MedicalSearchPage';
import RoundRobinLandingPage from '@screens/RoundRobinLandingPage';
import RoundRobinSelectedPage from '@screens/RoundRobinSelectedPage';

import ItemFilterScreen from '@screens/ItemFilterScreen';

import PractitionerType from '@screens/PractitionerType';
import FilterListing from '@screens/FilterListing';

import ClinicProfile from '@screens/ClinicProfile';
import DoctorList from '@screens/DoctorList';
import ClinicReview from '@screens/ClinicReview';

import ClinicPackageProfile from '@screens/ClinicPackageProfile';

import SelectProcedure from '@screens/SelectProcedure';
import SelectTreatmentTimeSlot from '@screens/SelectTreatmentTimeSlot';
import MedicalQueryForm from '@screens/MedicalQueryForm';
import BookingOverview from '@screens/BookingOverview';

import HealthQuestion from '@screens/HealthQuestion';

import TeleDoctorProfile from '@screens/TeleDoctorProfile';

import Appointment from '@screens/Appointment';
import AppointmentForm from '@screens/AppointmentForm';

import TelePayment from '@screens/TelePayment';
import PaymentOrder from '@screens/PaymentOrder';
import PaymentLoading from '@screens/PaymentLoading';

import LoadMonitoring from '@screens/LoadMonitoring';
import HealthActivity from '@screens/HealthActivity';
import MonitorBloodPressure from '@screens/MonitorBloodPressure';
import MonitorBloodGlucose from '@screens/MonitorBloodGlucose';
import MonitorO2Sat from '@screens/MonitorO2Sat';
import MonitorBodyTemperature from '@screens/MonitorBodyTemperature';
import MonitorHeartRate from '@screens/MonitorHeartRate';
import MonitorWeight from '@screens/MonitorWeight';
import MonitorFullList from '@screens/MonitorFullList';
import MonitorAddData from '@screens/MonitorAddData';

import ContentFeed from '@screens/ContentFeed';
import ContentFeedDetail from '@screens/ContentFeedDetail';
import PaymentSelect from '@screens/PaymentSelect';
import PaymentCreditCard from '@screens/PaymentCreditCard';
import PaymentInclude from '@screens/PaymentInclude';
import PromptPay from '@screens/PromptPay';
import ProcedureListSelect from '@screens/ProcedureListSelect';
import SavePlace from '@screens/SavePlace';
import GooglePlace from '@screens/GooglePlace';
import PatientSymptom from '@screens/PatientSymptom';

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

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* Filter Listing */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="MedicalSearchPage" component={MedicalSearchPage} />
        <Stack.Screen
          name="RoundRobinLandingPage"
          component={RoundRobinLandingPage}
        />
        <Stack.Screen
          name="RoundRobinSelectedPage"
          component={RoundRobinSelectedPage}
        />

        <Stack.Screen name="ItemFilterScreen" component={ItemFilterScreen} />

        <Stack.Screen name="PractitionerType" component={PractitionerType} />
        <Stack.Screen
          name="FilterListing"
          options={{ gestureEnabled: false }}
          component={FilterListing}
        />
      </Stack.Group>

      {/* Filter Listing Doctor */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen
          name="TeleDoctorProfile"
          options={{ gestureEnabled: false }}
          component={TeleDoctorProfile}
        />
      </Stack.Group>

      {/* Filter Listing Clinic */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="ClinicProfile" component={ClinicProfile} />
        <Stack.Screen name="DoctorList" component={DoctorList} />
        <Stack.Screen name="ClinicReview" component={ClinicReview} />
      </Stack.Group>

      {/* Filter Listing Clinic Package */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen
          name="ClinicPackageProfile"
          component={ClinicPackageProfile}
        />
      </Stack.Group>

      {/* Clinic & Clinic Package Appointment */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="SelectProcedure" component={SelectProcedure} />
        <Stack.Screen
          name="SelectTreatmentTimeSlot"
          component={SelectTreatmentTimeSlot}
        />
        <Stack.Screen
          name="ProcedureListSelect"
          component={ProcedureListSelect}
          options={verticalAnimation}
        />
        <Stack.Screen name="MedicalQueryForm" component={MedicalQueryForm} />
        <Stack.Screen name="BookingOverview" component={BookingOverview} />
      </Stack.Group>

      {/*Survey Component */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="HealthQuestion" component={HealthQuestion} />
      </Stack.Group>

      {/* Doctor Appointment */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
      </Stack.Group>

      {/* Payment Screen */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="PatientSymptom" component={PatientSymptom} />
        <Stack.Screen name="TelePayment" component={TelePayment} />
        <Stack.Screen name="PaymentOrder" component={PaymentOrder} />
        <Stack.Screen
          name="PaymentSelect"
          component={PaymentSelect}
          options={verticalAnimation}
        />
        <Stack.Screen name="PaymentLoading" component={PaymentLoading} />
        <Stack.Screen name="PaymentCreditCard" component={PaymentCreditCard} />
        <Stack.Screen name="PaymentInclude" component={PaymentInclude} />
        <Stack.Screen name="PromptPay" component={PromptPay} />
        <Stack.Screen name="SavePlace" component={SavePlace} />
        <Stack.Screen
          name="GooglePlace"
          component={GooglePlace}
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Group>
      {/*Telemonitoring Component */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="LoadMonitoring" component={LoadMonitoring} />
        <Stack.Screen name="HealthActivity" component={HealthActivity} />
        <Stack.Screen name="MonitorWeight" component={MonitorWeight} />
        <Stack.Screen name="MonitorFullList" component={MonitorFullList} />
        <Stack.Screen name="MonitorAddData" component={MonitorAddData} />
        <Stack.Screen
          name="MonitorBloodPressure"
          component={MonitorBloodPressure}
        />
        <Stack.Screen
          name="MonitorBloodGlucose"
          component={MonitorBloodGlucose}
        />
        <Stack.Screen name="MonitorO2Sat" component={MonitorO2Sat} />
        <Stack.Screen
          name="MonitorBodyTemperature"
          component={MonitorBodyTemperature}
        />
        <Stack.Screen name="MonitorHeartRate" component={MonitorHeartRate} />
      </Stack.Group>

      {/* Content Component */}
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="ContentFeed" component={ContentFeed} />
        <Stack.Screen name="ContentFeedDetail" component={ContentFeedDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
