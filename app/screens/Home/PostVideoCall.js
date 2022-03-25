import React, { useEffect } from 'react';
import { View, Text, Touchable } from 'react-native';
import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export default function PostVideoCall({ user, auth, navigation }) {
  const [status, setStatus] = React.useState(false);
  const [close, setClose] = React.useState(false);

  const [isColor, setIsColor] = React.useState(false);
  const [firebase, setFirebase] = React.useState(false);

  let backgroundColor: '';
  let descriptiveText: '';
  let titleText: '';
  let icon: '';
  let color: 'green';

  let roundRobinType: '';

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

  return (
    <View style={{ bottom: 0, width: '100%', zIndex: 10 }}>
      {!close && (
        <TouchableOpacity
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigation.jumpTo('MyBookingsUI')}
          style={[styles.iconTopAppointment, {}]}
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
          <View style={{ flex: 1 }}>
            <Image
              source={DoctorIcon}
              size={10}
              // color={BaseColor.primaryColor}
              // solid
              style={{ width: 50, height: 50, marginBottom: 10 }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              padddingRight: 30,
              marginRight: 30,
              marginLeft: 15,
              flex: 5,
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                width: '100%',
                color: 'black',
                fontSize: 14,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'black',
              }}
              caption1
              grayColor
            >
              {titleText}
            </Text>
            <Text
              style={{
                width: '100%',
                color: 'black',
                fontSize: 12,
                alignSelf: 'center',
                color: 'black',
              }}
              caption1
              grayColor
            >
              {descriptiveText}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setClose(true)}
            style={{ flex: 1.5, justifyContent: 'flex-start', color: 'grey' }}
          >
            <View
              style={{ width: 30, height: 30, top: 0, alignItems: 'center' }}
            >
              <Text
                style={{
                  fontSize: 24,
                  height: '100%',
                  color: 'grey',
                  alignSelf: 'flex-end',
                  paddingRight: 10,
                }}
              >
                x
              </Text>
            </View>
          </TouchableOpacity>
          {/* <Icon
            name="phone"
            style={{
              fontSize: 20,
              color: status,
              alignSelf: 'flex-end',
              alignSelf: 'center',
            }}
          /> */}
        </TouchableOpacity>
      )}
    </View>
  );
}
