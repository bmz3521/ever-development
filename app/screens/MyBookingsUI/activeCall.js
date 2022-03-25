import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import database from '@react-native-firebase/database';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {
  // Image,
  Icon,
  ClinicItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  CarouselComponent,
  ImageCardComponent,
  Image,
} from '@components';
import styles from './styles';
import DoctorIcon from '@assets/images/homeicon7.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import config from '@_config';
import { Images } from '@config';
import { ScrollView } from 'react-native-gesture-handler';
import { store } from 'app/store';

export default function ActiveCall({ navigation }) {
  const user = useSelector(state => state.user);

  const [status, setStatus] = React.useState(false);
  const [isColor, setIsColor] = React.useState(false);
  const [firebase, setFirebase] = React.useState(false);

  const auth = store.getState().auth;

  useEffect(() => {
    checkPatientStatus();
  }, []);

  useEffect(() => {
    if (user?.data?.userId) {
      checkStatusRoom();
    }
  }, []);

  const checkStatusRoom = async () => {
    const snapshot = await database()
      .ref(`/statusRoom/patient${user?.data?.userId}`)
      .on('value', snapshot => {
        if (snapshot?.val()?.status) {
          const status = snapshot.val().status;
          const isRoom = ['doctorJoin', 'pharmacyJoin', 'nurseJoin'].includes(
            status,
          );
          if (isRoom) {
            navigation.navigate('VideoCall', {
              isRoundRobin: status === 'doctorJoin',
              isRoundRobinPharmacy: status === 'pharmacyJoin',
              isRoundRobinNurse: status === 'nurseJoin',
              twilioRoom: snapshot.val().name,
              twilioDate: snapshot.val().date,
              twilioRoomName: snapshot.val().roomName,
              twilioToken: snapshot.val().patientToken,
            });
          }
        }
      });
  };

  const checkPatientStatus = async () => {
    const snapshot = await database()
      .ref(`/patientStatus/${user?.data?.userId}`)
      .on('value', snapshot => {
        setFirebase(snapshot);
        if (
          snapshot.val() &&
          snapshot.val().color &&
          (snapshot.val().color === 'red' ||
            snapshot.val().color === 'yellow' ||
            snapshot.val().color === 'green')
        ) {
          setIsColor(true);
          setStatus(snapshot.val() && snapshot.val().color);
          console.log('snapshot', snapshot.val());
        } else {
          setIsColor(false);
        }
      });
  };

  let backgroundColor: '';
  let descriptiveText: '';
  let titleText: '';
  let icon: '';
  let color: 'green';

  let roundRobinType: '';
  console.log('status', status);
  switch (status) {
    case 'red':
      color = 'red';
      roundRobinType = 'isRoundRobin';
      titleText = 'คุณอยู่ในช่วงเฝ้าระวังอาการอย่างใกล้ชิด';
      descriptiveText = 'คุณสามารถเข้าห้องรอแพทย์เพื่อรอพบได้ตลอด 24 ชม.';
      break;
    case 'yellow':
      color = '#f2ce2c';
      roundRobinType = 'isRoundRobin';
      titleText = 'คุณอยู่ในช่วงเฝ้าระวังอาการ';
      descriptiveText = 'คุณสามารถเข้าห้องรอแพทย์เพื่อรอพบได้ตลอด 24 ชม.';

      break;
    case 'green':
      color = 'green';
      roundRobinType = 'isRoundRobinNurse';
      titleText = 'คุณอยูุ่ในช่วงดูแลอาการ';
      descriptiveText =
        'คุณสามารถเข้าห้องรอคุยกับพยาบาลเพื่อรอพบได้ตลอด 24 ชม.';

      break;
  }

  const navigateToTelepayment = () => {
    switch (status) {
      case 'red':
        navigation.navigate('TelePayment', { roundRobin: true });
        break;
      case 'yellow':
        navigation.navigate('TelePayment', { roundRobin: true });
        break;
      case 'green':
        navigation.navigate('TelePayment', { roundRobinNurse: true });
        break;
    }
  };

  return (
    <View style={{ height: 120 }}>
      {isColor && status && (
        <TouchableOpacity
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigateToTelepayment()}
          style={[styles.iconTopAppointment]}
        >
          <BarIndicator
            color={status}
            style={{
              alignSelf: 'flex-start',
              flex: 0.09,
              marginTop: -33,
              elevation: 30,
            }}
          />
          <Image
            source={DoctorIcon}
            size={10}
            // color={BaseColor.primaryColor}
            // solid
            style={{ width: 50, height: 50, marginBottom: 10 }}
          />
          <View
            style={{ paddingHorizontal: 3, alignSelf: 'flex-start' }}
          ></View>
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                flex: 1,
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'white',
              }}
              caption1
              grayColor
            >
              {titleText}
            </Text>
            <Text
              style={{
                flex: 1,
                height: 50,
                color: 'black',
                fontSize: 14,
                alignSelf: 'center',
                color: 'white',
              }}
              caption1
              grayColor
            >
              {descriptiveText}
            </Text>
          </View>
          <Icon
            name="phone"
            style={{
              fontSize: 20,
              color: status,
              alignSelf: 'flex-end',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
