import React from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Icon } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles, { Card, TopCard, ProfileImage } from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

import moment from 'moment';
import PharmacyImage from './Pharmacy.png';

function BookingTabHospital(props) {
  const { bookingItem, onPress } = props;
  const booking = bookingItem?.item;
  const formatDay = moment(booking?.bookingDay).format('D MMM');
  const realTime = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('HH:mm');

  let statusText = '';
  let textColor = '';
  let showAppointment = false;
  let patientState = '';
  let doctorState = '';
  let icon = '';
  let backgroundColor = 'white';
  let directiveText;

  switch (booking?.status) {
    case 'DOCTOR_CONFIRM':
      doctorState = 'docConfirm';
      //statusText = 'ได้รับการอนุมัติจากแพทย์';
      statusText = 'ได้รับการอนุมัติ';
      textColor = 'green';
      // showAppointment = true;
      icon = 'doctor';
      break;

    case 'DOCTOR_PENDING':
      doctorState = 'docPending';
      //statusText = 'รอแพทย์ยืนยันการนัดหมาย';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'doctor';
      break;

    case 'DOCTOR_DECLINE':
      doctorState = 'docDecline';
      //statusText = 'แพทย์ยกเลิกการนัดหมาย';
      statusText = 'การนัดหมายถูกยกเลิก';
      textColor = 'red';
      icon = 'doctor';
      break;

    case 'DOCTOR_PENDING_RX':
      doctorState = 'docRx';
      statusText = 'แพทย์รอจ่ายยา';
      textColor = 'orange';
      icon = 'doctor-Rx';
      break;

    case 'DOCTOR_ALERT':
      patientState = 'doctorAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหา';
      icon = 'doctor';
      directiveText = true;
      directiveText = 'จองใหม่';
      break;

    case 'PATIENT_DRAFT':
      doctorState = 'patientDraft';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'doctor';
      break;

    case 'MEDICINE_ALERT':
      textColor = 'red';
      statusText = 'ยังไม่ได้รับยา';
      icon = 'doctor-Rx';
      break;

    case 'PATIENT_SUCCESS_PAYMENT':
      patientState = 'patientSuccess';
      textColor = 'green';
      statusText = 'ชำระเงินเสร็จสิ้น';
      icon = 'Rx';
      break;

    case 'PATIENT_DECLINE_PAYMENT':
      patientState = 'patientDecline';
      textColor = 'red';
      statusText = 'ผู้ป่วยยกเลิกการชำระเงิน';
      icon = 'doctor';
      break;

    case 'PHARMACY_ALERT':
      patientState = 'pharmacyAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหา';
      icon = 'RX';

      directiveText = true;
      directiveText = 'จองใหม่';
      break;

    case 'PHARMACY_PENDING_RX':
      patientState = 'pharmacyPending';
      textColor = 'orange';
      statusText = 'รอเภสัชกรตรวจยา';
      icon = 'Rx';
      break;

    case 'PHARMACY_COMPLETE_RX':
      patientState = 'pharmacyComplete';
      textColor = 'green';
      statusText = 'เภสัชกรตรวจยาเสร็จแล้ว';
      icon = 'Rx';
      break;

    case 'PHARMACY_PENDING_BOOKING':
      patientState = 'pharmacyBooking';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      // showAppointment = true;
      icon = 'Rx';
      break;

    case 'PHARMACY_CONFIRM_BOOKING':
      patientState = 'pharmacyConfirm';
      statusText = 'เภสัชกรยืนยันการนัดหมาย';
      textColor = 'green';
      icon = 'Rx';
      break;

    case 'PHARMACY_DECLINE_BOOKING':
      patientState = 'pharmacyDecline';
      statusText = 'เภสัชกรยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'Rx';
      break;

    case 'CALL_CENTER_CONFIRM':
      patientState = 'centerConfirm';
      textColor = 'orange';
      statusText = 'รอผู้ป่วยดำเนินการชำระเงิน';
      icon = 'doctor';
      break;

    case 'CALL_CENTER_DECLINE':
      patientState = 'centerDecline';
      statusText = 'เจ้าหน้าที่ยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'doctor';
      break;

    case 'EPHIS_CONFIRM':
      patientState = 'ephisPending';
      statusText = 'ทำการนัดหมายเภสัชกร';
      textColor = 'green';
      icon = 'Rx';
      break;

    case 'EPHIS_PENDING':
      patientState = 'ephisPending';
      statusText = 'รอแพทย์สั่งยา';
      textColor = 'orange';
      icon = 'Rx';
      break;

    case 'BOOKING_COMPLETED':
      patientState = 'bookingComplete';
      statusText = 'เสร็จสิ้น';
      textColor = 'blue';
      icon = 'Rx';
      break;

    case 'DOCTOR_COMPLETED':
      patientState = 'doctorComplete';
      statusText = 'เสร็จสิ้นการพบแพทย์';
      textColor = '#109459';
      icon = 'doctor';
      backgroundColor = '#f2f2f2';
      break;

    case 'PHARMACY_COMPLETED':
      patientState = 'pharmacyComplete';
      statusText = 'เสร็จสิ้นการพบเภสัชกร';
      textColor = '#109459';
      icon = 'Rx';
      break;
  }

  if (
    ['WAIT_FOR_PATIENT_EMS', 'WAIT_FOR_PATIENT_PHAMACYSTORE'].includes(
      booking?.medicines?.status,
    )
  ) {
    statusText = 'คนขับกำลังไปส่ง';
    textColor = 'blue';
  }

  return (
    <TouchableOpacity
      underlayColor="#f4f2f2"
      style={[
        styles.content,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <>
        <TopCard>
          <View style={styles.makeRow}>
            <View style={{ flex: 1 }}>
              <View style={(styles.makeColumn, [{ justifyContent: 'center' }])}>
                {['EPHIS_CONFIRM', 'PHARMACY_COMPLETED'].includes(
                  booking.status,
                ) ? (
                  <Image style={styles.userAva} source={PharmacyImage} />
                ) : (
                  <Image style={styles.userAva} source={Images.homeicon7} />
                )}
              </View>
            </View>

            <View
              style={{ flex: 7, alignItems: 'flex-start', paddingLeft: 10 }}
            >
              <View
                style={
                  (styles.makeColumn, [{ justifyContent: 'center', flex: 1 }])
                }
              >
                {[
                  'EPHIS_CONFIRM',
                  'PHARMACY_CONFIRM_BOOKING',
                  'PHARMACY_PENDING_BOOKING',
                  'PHARMACY_COMPLETED',
                ].includes(booking.status) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 0,
                      paddingBottom: 0,
                      flex: 1,
                    }}
                  >
                    <Icon
                      name="prescription-bottle-alt"
                      style={[styles.titleIcon, { color: '#085394' }]}
                    />
                    <Text style={[styles.titleText, { color: '#085394' }]}>
                      {booking?.paymentStatus ===
                      'PHARMACIST_CONFIRM_PENDING_CALLCENTER_DISPATCH'
                        ? 'ยากำลังถูกจัดส่งไปที่คุณ'
                        : 'แพทย์สั่งยาเรียบร้อย'}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 0,
                      paddingBottom: 0,
                      flex: 1,
                    }}
                  >
                    <Icon
                      name="stethoscope"
                      style={[styles.titleIcon, { color: textColor }]}
                    />
                    <Text
                      style={[styles.titleText, { color: textColor, flex: 1 }]}
                    >
                      {statusText}
                    </Text>
                  </View>
                )}

                {booking?.doctor?.fullname === 'pharmacy' ? (
                  <View style={styles.doctorProfile}>
                    <View style={styles.wrapName}>
                      <Text
                        style={
                          (styles.detailText,
                          [{ fontSize: 16, fontWeight: 'bold', width: '100%' }])
                        }
                      >
                        ระบบกำลังประมวลผล
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.doctorProfile}>
                    <View style={styles.wrapName}>
                      <Text
                        style={
                          (styles.detailText,
                          [
                            {
                              fontSize: 16,
                              fontWeight: 'bold',
                              width: '100%',
                            },
                          ])
                        }
                      >
                        {booking.doctor && booking.doctor.fullname
                          ? booking.doctor.fullname
                          : ''}
                      </Text>
                    </View>
                  </View>
                )}
                {booking?.paymentStatus ===
                  'DOCTOR_PESCRIBED_PATIENT_PENDING_PAYMENT' && (
                  <View style={styles.doctorProfile}>
                    <Text style={{ color: '#00bae5', fontWeight: 'bold' }}>
                      ทำการสั่งยา
                    </Text>
                  </View>
                )}

                {directiveText && (
                  <View style={styles.doctorProfile}>
                    <Text
                      style={{ color: '#00bae5', fontWeight: 'bold', flex: 1 }}
                    >
                      {directiveText}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{ flex: 2 }}>
              <View
                style={
                  (styles.makeColumn,
                  [{ justifyContent: 'flex-start', marginTop: -20 }])
                }
              >
                <View style={styles.status}>
                  <Text style={styles.appoitnmentText}>{formatDay}</Text>
                  <Text style={styles.appoitnmentText}>{realTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </TopCard>
      </>
    </TouchableOpacity>
  );
}

export default BookingTabHospital;
