import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import moment from 'moment';
import _ from 'lodash';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from '@components';
import { useSelector } from 'react-redux';
import { BaseStyle, BaseColor } from '@config';
import { ScrollView } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import { Text, Divider, Button, useTheme } from 'react-native-elements';
import { Header } from '@components';
import { getPractitionerAvailableTime } from '@services/practitionerService';
import { getBookingsByPracitionerId } from '@services/bookingService';
import { LocaleConfig } from 'react-native-calendars';
import { useHooks } from './hook';
import { Images } from '@config';
import 'moment/locale/th';
moment.locale('th');
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
LocaleConfig.locales['en'] = LocaleConfig.locales[''];

// LocaleConfig.defaultLocale = 'th'
function Appointment({ route, navigation }) {
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingTimes, setBooking] = useState();
  const [filterBookings, setFilterBookings] = useState();
  const [minuteTimes, setMinute] = useState();
  const [selected, setSelected] = useState(false);
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(false);
  const [seperateTime, setSeperateTime] = useState([]);
  const [periodSelected, setPeriodSelected] = useState('');
  const { practitioner } = route.params;
  const { theme } = useTheme();
  const {
    getHolidays,
    setWeekEnd,
    getDaysInMonth,
    dayOff,
    weekend,
    DISABLED_DAYS,
    currentDateTime,
  } = useHooks();

  useEffect(() => {
    fetchDoctorAvailableTimes();
    // fetchBookings();
  }, []);

  const fetchDoctorAvailableTimes = async () => {
    try {
      setLoading(true);
      const data = await getPractitionerAvailableTime({
        id: practitioner.practitionerId,
      });

      const sortAvailableTimes = data[0].time.sort();
      const filterAvailableTimes = sortAvailableTimes.map(sortAvailableTime => {
        const periods = [];
        let start = sortAvailableTime[0];
        while (start < sortAvailableTime[1]) {
          periods.push(start);
          start += data[0].minute;
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

      setAvailableTimes(filterAvailableTimes);
      setMinute(data.minute);
      setLoading(false);
    } catch (error) {
      console.log('getAvailableTime==', error);
    }
  };

  const createBooking = async () => {
    const bookingData = {
      admitTime: moment(selected)
        .startOf('isoWeek')
        .add(selectedTime, 'minutes')
        .toISOString(),
      bookingCategory: 'telemed',
      practitionerAppUserId: practitioner.appUserId,
      status: `DOCTOR_PENDING`,
    };

    navigation.navigate('AppointmentForm', {
      bookingCategory: 'telemed',
      bookingData,
      practitioner,
    });
  };

  const fetchBookings = async () => {
    const data = await getBookingsByPracitionerId({
      practitionerAppUserId: practitioner.appUserId,
    });

    const filterBooking = data.filter(booking => {
      return ![
        'DOCTOR_COMPLETED',
        'PHARMACY_COMPLETED',
        'DOCTOR_PENDING',
        'PHARMACY_PENDING',
      ].includes(booking.status);
    });

    setBooking(filterBooking);
  };

  React.useLayoutEffect(() => {
    LocaleConfig.defaultLocale = i18next.language;
  });

  const onDayPress = day => {
    const selectedDay = moment(day.dateString).format('d');
    const filterTimes = availableTimes.filter(
      availableTime => availableTime.value === selectedDay,
    );

    const filterBooking = bookingTimes;
    // .filter(time => {
    //   return moment(time.admitTime).format('YYYY-MM-DD') === day.dateString;
    // });

    const seperateTime = filterTimes
      .reduce((timeArray, current) => timeArray.concat(current.timePeriods), [])
      .filter(time => {
        // console.log(
        //   `${time}`,
        //   moment(day.dateString)
        //     .startOf('isoWeek')
        //     .add(time, 'minutes'),
        // );
        const _start = moment(day.dateString)
          .startOf('isoWeek')
          .add(time, 'minutes');
        const _end = moment(day.dateString)
          .startOf('isoWeek')
          .add(time, 'minutes')
          .add(minuteTimes - 1, 'minutes');

        const timeIsExisted = filterBooking?.some(
          booking =>
            moment(booking.admitTime).isBetween(_start, _end) ||
            moment(booking.admitTime).isSame(_start) ||
            moment(booking.admitTime).isSame(_end),
        );
        return !timeIsExisted;
      });

    setSeperateTime(seperateTime);
    setFilterBookings(filterBooking);
    setTimes(filterTimes);
    setPeriodSelected('');
    setSelectedTime(false);
    setSelected(day.dateString);
  };

  const setSlotTime = time => {
    const filterSelectBooking = filterBookings
      ? filterBookings.map(t => t.admitTime)
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

  const TimeComponent = ({ timeSlot }) => {
    return timeSlot.length > 0 ? (
      <View
        style={{
          marginVertical: 10,
        }}
      >
        {[`morning`, `afternoon`, `evening`].map((period, index) => {
          const times = timeSlot.filter(t => {
            // console.log(
            //   moment()
            //     .startOf('week')
            //     .add(t, 'minutes')
            //     .format('HH:mm'),
            // );
            const momentTime = moment()
              .startOf('isoWeek')
              .add(t, 'minutes')
              .format('HH:mm');
            if (period === `morning`) {
              return momentTime < '12:00';
            } else if (period === `afternoon`) {
              return momentTime >= '12:00' && momentTime < '18:00';
            } else if (period === `evening`) {
              return momentTime >= '18:00';
            } else {
              return false;
            }
          });

          const timeIcon =
            period === `morning`
              ? require(`../../assets/logotime/morning.png`)
              : period === `afternoon`
              ? require(`../../assets/logotime/afternoon.png`)
              : require(`../../assets/logotime/evening.png`);

          return (
            times.length > 0 && (
              <React.Fragment key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={timeIcon}
                    style={{
                      width: 32,
                      height: 32,
                      marginBottom: 5,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      color: theme.colors.grey1,
                      fontSize: 16,
                      fontFamily: 'Prompt-Regular',
                    }}
                  >
                    {`${period.charAt(0).toUpperCase() +
                      period.slice(1).toLowerCase()}`}
                  </Text>
                  <View
                    style={{
                      marginLeft: 10,
                      backgroundColor: theme.colors.primary,
                      paddingHorizontal: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.white,
                        fontSize: 14,
                        fontFamily: 'Prompt-Bold',
                      }}
                    >
                      {`${times.length - setSlotTime(period)} Slots`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    marginBottom: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  {times.map((item, index) => (
                    <TouchableOpacity
                      style={{
                        borderColor: selectedTime === item ? '#2aa275' : 'grey',
                        borderWidth: 1,
                        backgroundColor:
                          selectedTime === item
                            ? theme.colors.secondary
                            : '#ffffff',
                        borderRadius: 5,
                        alignItems: 'center',
                        flexBasis: '22%',
                        padding: 5,
                        margin: 5,
                      }}
                      key={index}
                      onPress={() => setSelectedTime(item)}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color:
                            selectedTime === item
                              ? theme.colors.white
                              : 'black',
                        }}
                      >
                        {moment()
                          .startOf('isoWeek')
                          .add(item, 'minutes')
                          .format('HH:mm')}
                      </Text>
                      {/* <Text
                        style={{
                          color:
                            selectedTime === item
                              ? theme.colors.grey5
                              : theme.colors.grey1,
                        }}
                      >
                        {moment()
                          .startOf('isoWeek')
                          .add(item, 'minutes')
                          .format('HH:mm') < '12:00'
                          ? 'AM'
                          : 'PM'}
                      </Text> */}
                    </TouchableOpacity>
                  ))}
                </View>
              </React.Fragment>
            )
          );
        })}
      </View>
    ) : (
      <View
        style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.grey2,
            fontFamily: 'Prompt-Italic',
          }}
        >
          {i18next.t('APPOINTMENT_NO_AVAILABLE')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('APPOINTMENT_ADD_SCHEDULE')}
        subText={`${practitioner.title ? practitioner.title : ''}${
          practitioner.firstName
        } ${practitioner.lastName}`}
        onPressLeft={() => navigation.goBack()}
        profileImagePath={
          practitioner?.imageUrl
            ? {
                uri: `${practitioner?.imageUrl}`,
              }
            : Images.DoctorPlaceholder
        }
      />
      <View style={{ flex: 1 }}>
        {!user && loading === false ? (
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
          <ScrollView style={{ backgroundColor: theme.colors.white }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                paddingTop: 10,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: selected ? '#2aa275' : 'grey',
                      fontFamily: 'Prompt-Bold',
                    }}
                  >
                    {i18next.t('APPOINTMENT_SELECT_DATE')}
                  </Text>
                </View>
                <View>
                  <Divider orientation="horizontal" width={1} />
                </View>
                <Calendar
                  minDate={currentDateTime}
                  markedDates={{
                    [selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: '#2aa275',
                      selectedTextColor: '#ffffff',
                    },
                    ...dayOff,
                    // ...weekend,
                  }}
                  style={{
                    borderRadius: 5,
                    padding: 10,
                  }}
                  disabledDaysIndexes={[0, 6]}
                  style={{
                    borderRadius: 8,
                  }}
                  onDayPress={onDayPress}
                  onMonthChange={date => {
                    setSelectedTime(false);
                    setWeekEnd(
                      getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS),
                    );
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
                    textMonthFontFamily: 'Prompt-Bold',
                    textDayFontFamily: 'Prompt-Light',
                    textDayHeaderFontFamily: 'Prompt-Medium',
                    textTodayFontFamily: 'Prompt-Regular',
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                    'stylesheet.calendar.header': {
                      dayTextAtIndex0: {
                        color: 'red',
                      },
                      dayTextAtIndex6: {
                        color: 'blue',
                      },
                    },
                  }}
                />
              </View>
              {selected && (
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: selectedTime ? '#2aa275' : 'grey',
                          fontFamily: 'Prompt-Bold',
                        }}
                      >
                        {i18next.t('APPOINTMENT_SELECT_TIME')}
                      </Text>
                    </View>
                    <View>
                      <Divider orientation="horizontal" width={1} />
                    </View>
                    <View>
                      <TimeComponent timeSlot={seperateTime} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        <View
          style={{
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopColor: '#f5f5f5',
            borderTopWidth: 3,
          }}
        >
          <Button
            type="solid"
            title={i18next.t('APPOINTMENT_NEXT')}
            buttonStyle={{
              backgroundColor: theme.colors.primary,
            }}
            titleStyle={{
              fontSize: theme.fontSizeDefault,
              fontFamily: theme.fontFamilyBold,
              color: theme.colors.white,
            }}
            onPress={createBooking}
            disabled={!(selectedTime && times.length)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Appointment;
