import React, { useRef, useEffect, Component } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';
import { BaseStyle } from '@config';
import { Header, SafeAreaView } from '@components';
import { DotIndicator } from 'react-native-indicators';
import firebase from '@react-native-firebase/app';
import styles from './styles';
import { fcmService } from '../../FCMService';
import { localNotificationService } from '../../LocalNotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, useTheme, Divider, Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import DoctorLottie from 'app/assets/lottie-animation/Doctor.json';
import PharmacyLottie from 'app/assets/lottie-animation/Pharmacy.json';
import TimelineCard from '../MyBookingActivity/timelineCard';

export default function Telepending(props) {
  const { theme } = useTheme();
  function onRegister(token) {
    console.log('[oj] onRegister: ', token);
  }

  function onNotification(notify) {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );

    // For Android
    const channelObj = {
      channelId: 'SampleChannelID',
      channelName: 'SampleChannelName',
      channelDes: 'SampleChannelDes',
    };
    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._notificationId,
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel: channel,
      data: {
        fullname: 'sittikiat',
      },
      colorBgIcon: '#1A243B',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
    };

    const notification = fcmService.buildNotification(buildNotify);
    fcmService.displayNotification(notification);
  }

  function onOpenNotification(notify) {
    alert('Open Notification: ' + notify._body);
  }

  const setPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const initNotification = async () => {
    await setPermission();
    const fcmToken = await firebase.messaging().getToken();
    await AsyncStorage.setItem('fcmToken', fcmToken);
  };

  const { navigation, bookingId, roleText } = props;
  console.log(bookingId);
  return (
    <React.Fragment>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          backgroundColor: theme.colors.grey5,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            margin: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizeLarger,
                fontFamily: theme.fontFamilyBold,
                color: theme.colors.grey1,
              }}
            >{`ขั้นตอนดำเนินการ`}</Text>
            <Text
              style={{
                fontSize: theme.fontSizeSmallest,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.grey3,
              }}
            >
              {`BOOKING ID : ${bookingId}`}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TimelineCard doctorDone={false} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.white,
            marginHorizontal: 10,
            marginBottom: 10,
            borderRadius: 10,
            flex: 1,
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: theme.fontSizeLarger,
                fontFamily: theme.fontFamilyBold,
                color: theme.colors.grey1,
              }}
            >
              {roleText === `DOCTOR`
                ? 'ห้องรอปรึกษาแพทย์'
                : roleText === `PHARMACY`
                ? 'ห้องรอปรึกษาเภสัชกร'
                : ``}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizeSmall,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.grey3,
              }}
            >
              {roleText === `DOCTOR`
                ? 'ขณะนี้แพทย์กำลังเตรียมความพร้อม'
                : roleText === `PHARMACY`
                ? 'ขณะนี้เภสัชกรกำลังเตรียมความพร้อม'
                : ``}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <LottieView
              style={{ height: 200 }}
              source={
                roleText === `DOCTOR`
                  ? DoctorLottie
                  : roleText === `PHARMACY`
                  ? PharmacyLottie
                  : ``
              }
              autoPlay
              loop
            />
            <DotIndicator
              color={theme.colors.primary}
              size={theme.fontSizeSmall}
              count={3}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}
            >
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => navigation.navigate('Home')}
              >
                <View
                  style={{
                    height: 100,
                    backgroundColor: theme.colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Icon
                    name="arrow-top-left"
                    type="material-community"
                    color={theme.colors.white}
                    size={theme.fontSizeLargest}
                  />
                  <Text
                    style={{
                      fontSize: theme.fontSizeDefault,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.white,
                    }}
                  >
                    ออกชั่วคราว
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}
