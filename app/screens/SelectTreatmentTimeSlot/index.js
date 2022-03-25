import React from 'react';
import moment from 'moment';
import { CalendarList, Calendar, LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity, View } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Button, Text } from '@components';
// import styles from './styles';
import useHooks from './hooks';
import { Divider, useTheme } from 'react-native-elements';
import useStyles from './styles';
import i18next from 'i18next';
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

LocaleConfig.defaultLocale = 'th';
function SelectTreatmentTimeSlot({ navigation, route }) {
  const { theme } = useTheme();
  const baseStyles = useStyles({ ready });
  const { timeFormat, minDate, markTime, ready, type, actions } = useHooks({
    navigation,
    route,
  });
  
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text="Select preferred time slot"
        onPressLeft={() => navigation.goBack()}
        renderRight={() => {
          return (
            <TouchableOpacity onPress={actions.reset}>
              <Text type="buttonSmall">Reset</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={baseStyles.container}>
        {/* result container */}
        <View style={[baseStyles.resultContainer]}>
          <View style={[baseStyles.result]}>
            <Text type="body2">{timeFormat}</Text>
          </View>
        </View>

        {/*select calendar header */}
        <View style={baseStyles.headerContainer}>
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.secondary,
              fontFamily: theme.fontFamilyBold,
            }}
          >
            {i18next.t('APPOINTMENT_SELECT_DATE')}
          </Text>
          <Divider orientation="horizontal" width={1} />
        </View>

        <CalendarList
          style={{ marginTop: 5 }}
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
          hideArrows={false}
          renderArrow={direction => (
            <Icon
              name={direction === 'left' ? 'caret-left' : 'caret-right'}
              style={{ fontSize: 18 }}
            />
          )}
          minDate={minDate}
          onDayPress={actions.onChangeDate()}
          firstDay={0}
          markedDates={markTime}
          markingType="period"
          horizontal={true}
          pagingEnabled={true}
          pastScrollRange={0}
          futureScrollRange={3}
        />
      </View>

      <View style={[baseStyles.footer]}>
        <TouchableOpacity
          disabled={!ready}
          style={[
            baseStyles.bottomBtn,
            {
              backgroundColor: ready
                ? theme.colors.primary
                : theme.colors.grey5,
            },
          ]}
          onPress={
            type == 'clinicPackage'
              ? actions.onBookingPackage()
              : actions.onNext()
          }
        >
          <Text
            type="buttonLarge"
            style={
              ready ? baseStyles.bottomBtnText : baseStyles.bottomBtnTextDis
            }
          >
            {'ถัดไป'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SelectTreatmentTimeSlot;
