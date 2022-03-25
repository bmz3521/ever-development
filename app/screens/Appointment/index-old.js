import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _, { indexOf } from 'lodash';
import { View, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { SafeAreaView } from '@components';
import { useSelector, connect } from 'react-redux';
import { BaseStyle, BaseColor, FontFamily, Images } from '@config';
import { TopCard, ProfileImage } from './style';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Utils from '@utils';
import Loading from '@components/Loading';
import config from '@_config';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';
import { find } from 'lodash';
import 'moment/locale/th';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { getAccessTeleToken } from '@utils/asyncStorage';
import {
  Text,
  Header,
  Icon,
  Avatar,
  Divider,
  Button,
  Badge,
  Card,
} from 'react-native-elements';

moment.locale('th');
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['th'] = {
  monthNames: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  monthNamesShort: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  dayNames: [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ],
  dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  today: 'วันนี้',
};
LocaleConfig.defaultLocale = 'th';
function Appointment(props) {
  const telemedicine = useSelector(state => state.telemedicine);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingTimes, setBooking] = useState();
  const [filterBookings, setFilterBookings] = useState();
  const [minuteTimes, setMinute] = useState();
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { navigation, userTele, user } = props;
  const [omaUser, setOmaUser] = useState(false);
  const [seperateTime, setSeperateTime] = useState([]);

  const fetchVerifyIdStatus = async userId => {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/UserInfos/userInfoByPatientId?patientId=${userId}`,
      );
      return data.verifyId;
    } catch (error) {
      console.log(error);
    }
  };
  const checkOmaUser = async () => {
    setLoading(true);
    if (
      user.data === null ||
      (user.data === undefined && !user.data.userInformation)
    ) {
      setOmaUser(false);
      setLoading(false);
    } else {
      const omaUserStatus = await fetchVerifyIdStatus(
        user.data.userInformation.userId,
      );
      setOmaUser(omaUserStatus);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOmaUser();
  }, []);

  var doctorId = 1;

  const alertCreateBooking = () => {
    // const date = moment(selected)
    //   .format('LLLL')
    //   .split('เวลา');
    // const time = moment()
    //   .startOf('isoWeek')
    //   .add(selectedTime, 'minutes')
    //   .format('HH:mm');

    setModalVisible(true);

    // Alert.alert(
    //   'คุณเลือกนัดหมายแพทย์',
    //   `${date[0]} เวลา ${time} น.`,
    //   [
    //     {
    //       text: 'ไม่ใช่',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'ใช่',
    //       onPress: () => createBooking(),
    //     },
    //   ],
    //   { cancelable: false },
    // );
  };

  const createBooking = async () => {
    const ACCESS_TOKEN = await getAccessTeleToken();

    const response = await axios.post(
      `${config.VA_API_URL}/Bookings?access_token=${ACCESS_TOKEN.id}`,
      {
        admitTime: selected,
        bookingTime: selectedTime,
        patientId: userTele.dataTele.userId,
        doctorId: telemedicine.data.doctor.id,
        bookingEndTime: 0,
      },
    );
    if (response.status === 200) {
      navigation.navigate('PackageConsult', { type: 'แพทย์' });
    }
  };

  useEffect(() => {
    fetchDoctorAvailableTimes();
    fetchBookings();
  }, []);

  const fetchDoctorAvailableTimes = async () => {
    const { data } = await axios.get(
      `${config.VA_API_URL}/doctorAvailableTimes/filterType?doctorId=${doctorId}&type=weekly`,
    );

    const sortAvailableTimes = data.time.sort();

    const filterAvailableTimes = sortAvailableTimes.map(sortAvailableTime => {
      const periods = [];
      let start = sortAvailableTime[0];
      while (start < sortAvailableTime[1]) {
        periods.push(start);
        start += data.minute;
      }
      return {
        value: moment()
          .startOf('isoWeek')
          .add(sortAvailableTime[0], 'minutes')
          .format('d'),
        label: moment()
          .startOf('isoWeek')
          .add(sortAvailableTime[0], 'minutes')
          .format('dddd'),
        timePeriods: periods,
      };
    });

    const filterTimes = filterAvailableTimes.filter(
      availableTime => availableTime.value === moment().format('d'),
    );
    setTimes(filterTimes);
    setSeperateTime(filterTimes[0].timePeriods);
    setAvailableTimes(filterAvailableTimes);
    setMinute(data.minute);
  };

  const fetchBookings = async () => {
    const { data } = await axios.get(
      `${config.VA_API_URL}/Bookings/filterByDoctorId?doctorId=${doctorId}`,
    );
    const filterBooking = data.filter(
      booking =>
        moment(booking.admitTime).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD') &&
        ![
          'DOCTOR_COMPLETD',
          'PHARMACY_COMPLETED',
          'CALL_CENTER_DECLINE',
          'DOCTOR_DECLINE',
          'PHARMACY_DECLINE_BOOKING',
        ].includes(booking.status),
    );
    setFilterBookings(filterBooking);
    setBooking(data);
  };

  const onDayPress = day => {
    const selectedDay = moment(day.dateString).format('d');
    const filterTimes = availableTimes.filter(
      availableTime => availableTime.value === selectedDay,
    );
    const filterBooking = bookingTimes.filter(
      time => moment(time.admitTime).format('YYYY-MM-DD') === day.dateString,
    );
    setFilterBookings(filterBooking);
    setTimes(filterTimes);
    setSelected(day.dateString);
  };
  const setSlotTime = time => {
    const filterSelectBooking = filterBookings
      ? filterBookings.map(t => t.bookingTime)
      : 'NODATA';
    let countSlot = seperateTime.filter(item =>
      filterSelectBooking.includes(item),
    );

    switch (time) {
      case 'morning':
        countSlot = countSlot.filter(
          item =>
            moment()
              .startOf('isoWeek')
              .add(item, 'minutes')
              .format('HH:mm') < '12:00',
        ).length;
        break;
      case 'afternoon':
        countSlot = countSlot.filter(
          item =>
            moment()
              .startOf('isoWeek')
              .add(item, 'minutes')
              .format('HH:mm') >= '12:00' &&
            moment()
              .startOf('isoWeek')
              .add(item, 'minutes')
              .format('HH:mm') < '18:00',
        ).length;
        break;
      case 'evening':
        countSlot = countSlot.filter(
          item =>
            moment()
              .startOf('isoWeek')
              .add(item, 'minutes')
              .format('HH:mm') >= '18:00',
        ).length;
        break;
    }
    return countSlot;
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        placement="left"
        backgroundColor="#2aa275"
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
        leftContainerStyle={{
          justifyContent: 'center',
        }}
        centerComponent={
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'Prompt-Regular',
              }}
            >
              {'รายชื่อแพทย์'}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#dcdcdc',
                fontFamily: 'Prompt-LightItalic',
              }}
            >
              {doctorType.name}
            </Text>
          </View>
        }
      />
      {/* <Loading isVisible={loading} /> */}
      <TopCard>
        <ProfileImage
          source={{
            uri: _.get(telemedicine, 'data.doctor.profileImage'),
          }}
        />
        <Text
          title3
          bold
          numberOfLines={1}
          style={{ marginTop: 10, color: '#095C3E' }}
        >
          {_.get(telemedicine, 'data.doctor.fullname')}
        </Text>
        <Text
          title5
          numberOfLines={1}
          style={{
            marginTop: 5,
            color: '#095C3E',
            fontWeight: '400',
            color: '#535353',
          }}
        >
          {_.get(telemedicine, 'data.symptom.name')}
        </Text>
      </TopCard>
      {omaUser == false && loading === false ? (
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              marginHorizontal: 20,
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>
              คุณยังไม่ได้ยืนยันตัวตน
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              คุณสามารถยืนยันตัวตนได้กับเจ้าหน้าที่
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={{ backgroundColor: '#F5F5F5', padding: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#535353' }}>
              ตารางนัดหมาย
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Calendar
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#0AB678',
                  selectedTextColor: '#ffffff',
                },
              }}
              style={{
                borderRadius: 8,
              }}
              onDayPress={onDayPress}
              onDayLongPress={day => {
                // console.log("selected day", day);
              }}
              onMonthChange={month => {
                setSelectedTime(false);
              }}
              theme={{
                textSectionTitleColor: BaseColor.textPrimaryColor,
                selectedDayBackgroundColor: BaseColor.primaryColor,
                selectedDayTextColor: '#ffffff',
                todayTextColor: BaseColor.primaryColor,
                dayTextColor: BaseColor.textPrimaryColor,
                textDisabledColor: BaseColor.grayColor,
                dotColor: BaseColor.primaryColor,
                selectedDotColor: '#ffffff',
                arrowColor: BaseColor.primaryColor,
                monthTextColor: BaseColor.textPrimaryColor,
                textDayFontFamily: FontFamily.default,
                textMonthFontFamily: FontFamily.default,
                textDayHeaderFontFamily: FontFamily.default,
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F5',
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 16, color: '#535353' }}
            >
              ช่วงเวลาที่ต้องการนัดหมาย
            </Text>
            <SafeAreaView>
              {times.length ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      resizeMode={'contain'}
                      style={{ width: 45, height: 45, marginRight: 5 }}
                      source={Images.MorningLogo}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#535353',
                      }}
                    >
                      Morning
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#45c693',
                        backgroundColor: '#e2f6ee',
                        marginLeft: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 20,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                    >
                      {seperateTime.filter(
                        t =>
                          moment()
                            .startOf('isoWeek')
                            .add(t, 'minutes')
                            .format('HH:mm') < '12:00',
                      ).length - setSlotTime('morning')}{' '}
                      Slots
                    </Text>
                  </View>
                  <FlatList
                    data={seperateTime.filter(
                      t =>
                        moment()
                          .startOf('isoWeek')
                          .add(t, 'minutes')
                          .format('HH:mm') < '12:00',
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({ item: period }) =>
                      find(filterBookings, { bookingTime: period }) ? (
                        <View style={{ flex: 0.33 }} disableTouchEvent>
                          <View
                            style={{
                              borderColor: '#e0e0e0',
                              borderWidth: 1,
                              borderRadius: 10,
                              alignItems: 'center',
                              padding: 5,
                              margin: 5,
                            }}
                          >
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm')}
                            </Text>
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm') < '12:00'
                                ? 'AM'
                                : 'PM'}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flex: 0.33 }}>
                          <TouchableOpacity
                            onPress={() => setSelectedTime(period)}
                          >
                            {selectedTime === period ? (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#0AB678',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#ffffff',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ fontWeight: 'bold' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ababab' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      resizeMode={'contain'}
                      style={{ width: 30, height: 30, marginRight: 5 }}
                      source={Images.AfternoonLogo}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#535353',
                      }}
                    >
                      Afternoon
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#45c693',
                        backgroundColor: '#e2f6ee',
                        marginLeft: 15,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 20,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                    >
                      {seperateTime.filter(
                        t =>
                          moment()
                            .startOf('isoWeek')
                            .add(t, 'minutes')
                            .format('HH:mm') >= '12:00',
                      ).length - setSlotTime('afternoon')}{' '}
                      Slots
                    </Text>
                  </View>
                  <FlatList
                    data={seperateTime.filter(
                      t =>
                        moment()
                          .startOf('isoWeek')
                          .add(t, 'minutes')
                          .format('HH:mm') >= '12:00',
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({ item: period }) =>
                      find(filterBookings, { bookingTime: period }) ? (
                        <View style={{ flex: 0.33 }} disableTouchEvent>
                          <View
                            style={{
                              borderColor: '#e0e0e0',
                              borderWidth: 1,
                              borderRadius: 10,
                              alignItems: 'center',
                              padding: 5,
                              margin: 5,
                            }}
                          >
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm')}
                            </Text>
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm') < '12:00'
                                ? 'AM'
                                : 'PM'}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flex: 0.33 }}>
                          <TouchableOpacity
                            onPress={() => setSelectedTime(period)}
                          >
                            {selectedTime === period ? (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#0AB678',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#ffffff',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ fontWeight: 'bold' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ababab' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      resizeMode={'contain'}
                      style={{ width: 35, height: 35, marginRight: 5 }}
                      source={Images.EveningLogo}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#535353',
                      }}
                    >
                      Evening
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#45c693',
                        backgroundColor: '#e2f6ee',
                        marginLeft: 15,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 20,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                    >
                      {seperateTime.filter(
                        t =>
                          moment()
                            .startOf('isoWeek')
                            .add(t, 'minutes')
                            .format('HH:mm') >= '18:00',
                      ).length - setSlotTime('evening')}{' '}
                      Slots
                    </Text>
                  </View>
                  <FlatList
                    data={seperateTime.filter(
                      t =>
                        moment()
                          .startOf('isoWeek')
                          .add(t, 'minutes')
                          .format('HH:mm') >= '18:00',
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({ item: period }) =>
                      find(filterBookings, { bookingTime: period }) ? (
                        <View style={{ flex: 0.33 }} disableTouchEvent>
                          <View
                            style={{
                              borderColor: '#e0e0e0',
                              borderWidth: 1,
                              borderRadius: 10,
                              alignItems: 'center',
                              padding: 5,
                              margin: 5,
                            }}
                          >
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm')}
                            </Text>
                            <Text style={{ color: '#ababab' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm') < '12:00'
                                ? 'AM'
                                : 'PM'}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flex: 0.33 }}>
                          <TouchableOpacity
                            onPress={() => setSelectedTime(period)}
                          >
                            {selectedTime === period ? (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#0AB678',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#ffffff',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 5,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ fontWeight: 'bold' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                                <Text style={{ color: '#ababab' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm') < '12:00'
                                    ? 'AM'
                                    : 'PM'}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  />
                </>
              ) : (
                <View>
                  <Text>ไม่สามารถนัดหมายในวันดังกล่าวได้</Text>
                </View>
              )}
            </SafeAreaView>
          </View>
        </ScrollView>
      )}
      <View style={{ padding: 20, backgroundColor: '#F5F5F5' }}>
        {selectedTime && times.length ? (
          <LinearGradient
            style={{
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            colors={['#0A905F', '#095C3E']}
          >
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              onPress={() => alertCreateBooking()}
            >
              <Text
                style={{ color: '#ffffff', fontSize: 18, fontWeight: '700' }}
              >
                ยืนยันการนัดหมาย
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <Button
            style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: '#C4C4C4',
            }}
          >
            <Text style={{ color: '#A3A3A3', fontSize: 18, fontWeight: '700' }}>
              ยืนยันการนัดหมาย
            </Text>
          </Button>
        )}
      </View>

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon name="calendar" size={60} style={{ color: '#0A8C5C' }} />
              <Text style={styles.modalTitle}>คุณเลือกนัดหมายแพทย์</Text>
              <Text style={styles.modalText}>
                {`${
                  moment(selected)
                    .format('LLLL')
                    .split('เวลา')[0]
                }`}
                {'\n'}
                {`เวลา ${moment()
                  .startOf('isoWeek')
                  .add(selectedTime, 'minutes')
                  .format('HH:mm')} น.`}
              </Text>

              <View style={styles.nextContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.backStyle}>ยกเลิก</Text>
                </TouchableOpacity>

                <LinearGradient
                  colors={['#0DA36D', '#00bae5', '#086C48']}
                  style={styles.finishGradient}
                >
                  <TouchableOpacity
                    full
                    style={styles.okButton}
                    onPress={() => {
                      createBooking();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.finishText}>ยืนยัน</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    auths: state.auth,
    user: state.user,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(Appointment);
