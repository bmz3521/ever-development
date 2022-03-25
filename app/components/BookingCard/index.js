import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import styles from './styles';
import moment from 'moment';
import i18next from 'i18next';
import useHooks from './hooks';

const BookingCard = ({ item, navigation }) => {
  const { theme } = useTheme();
  const { RoleImage, RoleTopIcon } = useHooks();

  const TimeText = ({ bookingDay }) => {
    const formatDay = moment(bookingDay)
      .locale(i18next.language)
      .format('D MMM');
    const realTime = moment(bookingDay).format('HH:mm');
    return (
      <View style={[styles.timeContainer]}>
        <Text
          style={[styles.timeBigText, { fontFamily: theme.fontFamilyDefault }]}
        >
          {formatDay}
        </Text>
        <Text
          style={[styles.timeText, { fontFamily: theme.fontFamilyDefault }]}
        >
          {realTime}
        </Text>
      </View>
    );
  };

  const StatusText = ({ status, bookingCategory }) => {
    let textColor;
    let fromToStatus;
    let bookingTypeText;

    switch (bookingCategory) {
      case 'telemed':
        bookingTypeText = i18next.t('MYBOOKINGUI_CONSULT_SCHEDULE');
        break;
      case 'general':
        bookingTypeText = i18next.t('MYBOOKINGUI_CONSULT_NOW');
        break;
      case 'covid':
        bookingTypeText = i18next.t('MYBOOKINGUI_CONSULT_COVID');
        break;
      case 'procedure':
        bookingTypeText = i18next.t('MYBOOKINGUI_CLINIC_PROCEDURE');
        break;
      case 'clinicPackage':
        bookingTypeText = i18next.t('MYBOOKINGUI_CLINIC_PACKAGE');
        break;
      default:
        break;
    }

    switch (status) {
      case 'DOCTOR_PENDING':
        textColor = 'orange';
        fromToStatus =
          item.bookingCategory === 'telemed'
            ? i18next.t('MYBOOKINGUI_DOCTOR_PENDING')
            : i18next.t('MYBOOKINGUI_DOCTOR_PENDING_RB');
        break;
      case 'DOCTOR_CONFIRM':
        textColor = 'green';
        fromToStatus = moment().isBefore(moment(item?.admitTime))
          ? i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_BT')
          : i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT');
        break;
      case 'DOCTOR_PENDING_NOTE':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_DOCTOR_PENDING_NOTE');
        break;
      case 'DOCTOR_COMPLETED':
        textColor = '#109459';
        fromToStatus = i18next.t('MYBOOKINGUI_DOCTOR_COMPLETED');
        break;
      case 'DOCTOR_DECLINE':
        textColor = 'red';
        fromToStatus = i18next.t('MYBOOKINGUI_DOCTOR_DECLINED');
        break;
      case 'PHARMACY_PENDING':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_PHAR_PENDING');
        break;
      case 'PHARMACY_CONFIRM':
        textColor = 'green';
        fromToStatus = i18next.t('MYBOOKINGUI_PHAR_CONFIRMED');
        break;
      case 'PHARMACY_PENDING_NOTE':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_PHAR_PENDING_NOTE');
        break;
      case 'PHARMACY_COMPLETED':
        textColor = '#109459';
        fromToStatus = i18next.t('MYBOOKINGUI_PHAR_COMPLETED');
        break;
      case 'PHARMACY_DECLINE':
        textColor = 'red';
        fromToStatus = i18next.t('MYBOOKINGUI_PHAR_DECLINED');
        break;
      default:
        break;
      case 'CLINIC_PENDING':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_PENDING');
        break;
      case 'PATIENT_FINISH_FORM_SUBMISSION':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_PENDING');
        break;
      case 'CLINIC_CONFIRM':
        textColor = 'green';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_CONFIRMED');
        break;
      case 'CLINIC_CONFIRM_ADMIT':
        textColor = 'green';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_CONFIRMED_ADMIT');
        break;
      case 'CLINIC_DECLINE':
        textColor = 'red';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_DECLINED');
        break;
      case 'CLINIC_COMPLETED':
        textColor = '#109459';
        fromToStatus = i18next.t('MYBOOKINGUI_CLINIC_COMPLETED');
        break;
      case 'COMMUNITY_PHARMACIST_COMPLETED':
        textColor = '#109459';
        fromToStatus = i18next.t('MYBOOKINGUI_COMPHAR_COMPLETED');
        break;
      case 'COMMUNITY_PHARMACIST_PENDING':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_COMPHAR_PENDING');
        break;
      case 'COMMUNITY_PHARMACIST_PENDING_NOTE':
        textColor = 'orange';
        fromToStatus = i18next.t('MYBOOKINGUI_COMPHAR_PENDING_NOTE');
        break;
      case 'COMMUNITY_PHARMACIST_CONFIRM':
        textColor = 'green';
        fromToStatus = i18next.t('MYBOOKINGUI_COMPHAR_CONFIRMED');
        break;
      case 'COMMUNITY_PHARMACIST_DECLINE':
        textColor = 'red';
        fromToStatus = i18next.t('MYBOOKINGUI_COMPHAR_DECLINED');
        break;
    }

    return (
      <View style={styles.statusWrapper}>
        <View style={[styles.statusContainer]}>
          <Text
            style={[
              styles.titleText,
              { color: textColor, fontFamily: theme.fontFamilyBold },
            ]}
          >
            {fromToStatus}
          </Text>

          <Text
            style={[
              styles.bookingTypeText,
              { fontFamily: theme.fontFamilyDefault },
            ]}
          >
            {bookingTypeText}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      underlayColor="#f4f2f2"
      style={[
        styles.content,
        styles.boxShadow,
        { shadowColor: theme.colors.shadows },
      ]}
      onPress={() => {
        navigation.navigate('BookingStack', {
          screen: 'MyBookingActivity',
          params: {
            bookingId: item.bookingId,
            role: item.status.split('_')[0],
          },
        });
      }}
    >
      <View style={[styles.topCard]}>
        <View style={[styles.cardContainer]}>
          <View style={[styles.imageContainer]}>
            <RoleImage item={item} />
          </View>
          <View style={[styles.iconContainer]}>
            <RoleTopIcon item={item} />
          </View>
          <StatusText
            status={item.status}
            bookingCategory={item.bookingCategory}
          />
          <TimeText bookingDay={item.bookingDay} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
