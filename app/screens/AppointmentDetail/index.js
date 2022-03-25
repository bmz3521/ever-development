import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { BaseStyle, Images } from '@config';
import { SafeAreaView, Header, Text } from '@components';
import { useTheme, Avatar } from 'react-native-elements';
import styles from './styles';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import i18next from 'i18next';

const AppointmentDetail = ({ navigation, route }) => {
  const { theme } = useTheme();
  const detail = route.params.item;
  const doctorName =
    detail.doctorName?.split(',').length > 1
      ? `${detail.doctorName?.split(',')[1]} ${
          detail.doctorName?.split(',')[0]
        }`
      : detail?.doctorName;

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('APPOINTMENTDETAIL_HEADER')}
        onPressLeft={() =>
          navigation.navigate('BookingStack', {
            screen: 'MyBookingsUI',
            params: { backFromDetail: true },
          })
        }
      />
      <ScrollView contentContainerStyle={styles(theme).marginHor16}>
        <View style={styles(theme).titleCard}>
          <View style={styles(theme).rowcenter}>
            <Text type="h6" style={styles(theme).fullWidth}>
              {i18next.t('APPOINTMENTDETAIL_ATHOSP')}
            </Text>
            <Image source={Images.hospital} style={styles(theme).iconHosp} />
          </View>
          <View style={styles(theme).labelTime}>
            <Text type="body2" style={styles(theme).greyColor}>
              <Text type="body2" style={styles(theme).blackFont}>
                {i18next.t('HISTORYDETAIL_DATE')} :{' '}
              </Text>
              {moment(detail.appointmentDateTime).format('dddd, Do MMMM YYYY')}
            </Text>
            <Text type="body2" style={styles(theme).greyColor}>
              <Text type="body2" style={styles(theme).blackFont}>
                {i18next.t('HISTORYDETAIL_TIME')} :{' '}
              </Text>
              {`${moment(detail.appointmentDateTime).format('HH:mm')}${
                i18next.language === 'th' ? ' น.' : ''
              }`}
            </Text>
          </View>
        </View>
        <View
          style={[styles(theme).cardContainer, styles(theme).moreCardContainer]}
        >
          <Text type="h6" style={styles(theme).labelDoctor}>
            {i18next.t('APPOINTMENTDETAIL_DOCTOR')}
          </Text>
          <View style={styles(theme).rowcenter}>
            <Avatar
              source={Images.DoctorPlaceholder}
              containerStyle={styles(theme).spaceBootom}
              size="medium"
              rounded
            />
            <View style={styles(theme).labelDoctorContainer}>
              <Text type="body2">{doctorName}</Text>
              <Text
                style={{
                  ...styles(theme).subtitleClinic,
                  ...styles(theme).greyColor,
                }}
              >{`${detail.clinicName}`}</Text>
            </View>
          </View>
        </View>
        <View
          style={[styles(theme).cardContainer, styles(theme).moreCardContainer]}
        >
          <Text type="h6" style={styles(theme).spaceBootom}>
            {i18next.t('APPOINTMENTDETAIL_DEPARTMENT')}
          </Text>
          <Text
            style={styles(theme).defaultText}
          >{`${detail.clinicName}`}</Text>
        </View>
        <View
          style={[styles(theme).cardContainer, styles(theme).moreCardContainer]}
        >
          <Text type="h6" style={styles(theme).spaceBootom}>
            {i18next.t('APPOINTMENTDETAIL_ROOM')}
          </Text>
          <Text style={styles(theme).defaultText}>
            โทรเวชกรรมผ่าน Ever Healthcare
          </Text>
        </View>
        {detail.note ? (
          <View
            style={[
              styles(theme).cardContainer,
              styles(theme).moreCardContainer,
            ]}
          >
            <Text type="h6" style={styles(theme).spaceBootom}>
              {i18next.t('APPOINTMENTDETAIL_NOTE')}
            </Text>
            <Text style={styles(theme).defaultText}>{detail.note}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetail;
