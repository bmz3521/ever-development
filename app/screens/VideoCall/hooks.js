import React, { useEffect, useCallback } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { getToken as GetTokenService } from '@services/communicationService';
import {
  getBookingById as GetBookingByIdService,
  createBookingByTreatmentId as CreateBookingByTreatmentIdService,
} from '@services/bookingService';
import { getPractitionerDetailByUserId } from '@services/practitionerService';
import { localNotificationService } from 'app/LocalNotificationService';
import { TelemedicineActions } from '@actions';
import { useIsFocused } from '@react-navigation/native';
import i18next from 'i18next';
import moment from 'moment';

const useHooks = props => {
  const {
    bookingId,
    navigation,
    dispatch,
    telemedicine,
    user,
    twilioRef,
    price,
    totalPrice,
    consultationPrice,
  } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [chatShow, setChatScreen] = React.useState(false);
  const [doctorNotePending, setDoctorNotePending] = React.useState(false);
  const [patientInWaiting, setPatientInWaiting] = React.useState(true);
  const [booking, setBooking] = React.useState({});
  const [practitioner, setPractitioner] = React.useState({});
  const [firebaseStatus, setFirebaseStatus] = React.useState(null);
  const [firebaseData, setFirebaseData] = React.useState({});
  const [twilioData, setTwilioData] = React.useState({});
  const [role, setRole] = React.useState(`DOCTOR`);
  const [roomName, setRoomName] = React.useState(null);
  const [status, setStatus] = React.useState('disconnected');
  const [videoTracks, setVideoTracks] = React.useState(new Map());
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const isFocused = useIsFocused();
  const [drugPriceTotal, setDrugPriceTotal] = React.useState(0);

  React.useEffect(() => {
    let drugPriceTotal = 0;

    booking?.prescription?.map(item => {
      if (item.unitPriceCents && item.unitPriceCents !== undefined) {
        return (drugPriceTotal += (item.unitPriceCents * item.amount) / 100);
      }
      return;
    });

    setDrugPriceTotal(drugPriceTotal);
  }, [booking]);

  const fromTo = {
    general:
      booking?.bookingType === `Telepharmacy`
        ? i18next.t('TELEPAYMENT_PHARMACIST_NOW')
        : i18next.t('TELEPAYMENT_CONSULT_NOW'),
    telemed: i18next.t('TELEPAYMENT_CONSULT_SCHEDULE'),
    covid: i18next.t('TELEPAYMENT_CONSULT_COVID'),
    procedure: i18next.t('TELEPAYMENT_CLINIC_PROCEDURE'),
    clinicPackage: i18next.t('TELEPAYMENT_CLINIC_PACKAGE'),
  };

  //BOOKING
  const checkBooking = async () => {
    try {
      let isReconnected = false;
      let _firebase;
      let _booking;
      let _twilio;
      let roomName;
      if (
        isEmpty(telemedicine.booking) &&
        isEmpty(telemedicine.firebase) &&
        isEmpty(telemedicine.twilio)
      ) {
        _twilio = await GetTokenService();
        _booking = await GetBookingByIdService(bookingId);
        if (_booking.status.includes('COMMUNITY_PHARMACIST')) {
          _firebase = {
            bookingId: _booking.id,
            date: Date.now(),
            latitude: _booking.locationAddress.latitude,
            longitude: _booking.locationAddress.longitude,
            status: 'COMMUNITY_PHARMACIST_PENDING',
            userId: user.data?.userId,
          };
        } else {
          _firebase = {
            roomName: `patient${user.data.userId}${_booking.status
              .split('_')[0]
              .toLowerCase()}`,
            date: Date.now(),
            name: `${user.data?.firstname} ${user.data?.lastname}`,
            userId: user.data?.userId,
            bookingId: _booking.id,
            status:
              _booking.status === 'DOCTOR_CONFIRM'
                ? `DOCTOR_PENDING`
                : _booking.status,
            ...(_booking.bookingCategory === 'covid' && {
              color: _booking?.covidForm?.color,
            }),
          };
        }

        console.log('_firebase', _firebase);

        dispatch(
          TelemedicineActions.saveTeleData({
            booking: _booking,
            firebase: _firebase,
            twilio: _twilio,
          }),
        );
      } else {
        _booking = await GetBookingByIdService(telemedicine.booking.id);
        _firebase = telemedicine.firebase;
        _twilio = telemedicine.twilio;
        isReconnected = true;
      }

      switch (_booking.bookingCategory) {
        case 'general':
          roomName = _booking.status.includes('COMMUNITY_PHARMACIST')
            ? `rooms/roundRobin/communityPharmacist/patients/patient${user.data.userId}`
            : `rooms/roundRobin/general/patients/patient${user.data.userId}`;
          break;
        case 'covid':
          roomName = `rooms/roundRobin/covid/patients/patient${user.data.userId}`;
          break;
        case 'telemed':
          if (_booking.status.split('_')[0].toLowerCase() === `doctor`) {
            roomName = `rooms/practitioners/practitioner${_booking.practitionerAppUserId}/patients/patient${user.data.userId}`;
          } else {
            roomName = `rooms/telemed/pharmacy/patients/patient${user.data.userId}`;
          }
          break;
        default:
          break;
      }

      if (_booking?.practitionerAppUserId)
        await fetchPractitioner(_booking?.practitionerAppUserId);

      const roleName =
        _booking.status.split('_').length > 2
          ? `${_booking.status.split('_')[0]}_${_booking.status.split('_')[1]}`
          : `${_booking.status.split('_')[0]}`;

      setRole(roleName.toUpperCase());

      setBooking(_booking);
      setTwilioData(_twilio);
      setRoomName(roomName);

      if (isReconnected) {
        database()
          .ref(roomName)
          .once('value', snap => {
            setFirebaseData(snap.val());
            goLive(roomName);
          });
      } else {
        setFirebaseData(_firebase);
        database()
          .ref(roomName)
          .update({
            ..._firebase,
          })
          .then(() => goLive(roomName));
      }
    } catch (error) {
      console.log('DOCTOR_ERROR', error);
    }
  };

  const fetchPractitioner = async _practitionerAppUserId => {
    try {
      const _practitioner = await getPractitionerDetailByUserId(
        _practitionerAppUserId,
      );

      setPractitioner(_practitioner[0]);
    } catch (error) {
      console.log('getPractitionerError==', error);
    }
  };

  const getBookingTypeWording = (type, status) => {
    let roleName = i18next.t('ROLE_PHYSICIAN');
    status?.split(`_`)[0] === `DOCTOR`
      ? i18next.t('ROLE_PHYSICIAN')
      : i18next.t('ROLE_PHARMACIST');

    switch (role) {
      case 'PHARMACY':
        roleName = i18next.t('ROLE_PHARMACIST');
        break;
      case 'COMMUNITY_PHARMACIST':
        roleName = i18next.t('ROLE_COMMUNITY_PHARMACIST');
        break;
      default:
        break;
    }
    switch (type) {
      case `telemed`:
        return i18next.language == 'en'
          ? `Schedule a ${roleName} consult`
          : `นัดหมายปรึกษา${roleName}ออนไลน์`;
      case `general`:
        return i18next.language == 'en'
          ? `Consult a ${roleName} now`
          : `ปรึกษา${roleName}แบบสุ่ม`;
      case `covid`:
        return i18next.language == 'en'
          ? `Consult a home isolation ${roleName}`
          : `ปรึกษา${roleName} a home isolation`;
    }
  };

  const getBookingStatusWording = {
    DOCTOR_PENDING:
      booking.bookingCategory === 'telemed'
        ? i18next.t('MYBOOKINGUI_DOCTOR_PENDING')
        : i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT'),
    DOCTOR_CONFIRM: moment().isBefore(moment(booking?.admitTime))
      ? i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_BT')
      : i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT'),
    DOCTOR_JOIN: i18next.t('VIDEOCALL_DOCTOR_JOIN'),
    DOCTOR_PENDING_NOTE: i18next.t('MYBOOKINGUI_DOCTOR_PENDING_NOTE'),
    DOCTOR_COMPLETED: i18next.t('MYBOOKINGUI_DOCTOR_COMPLETED'),
    DOCTOR_DECLINE: i18next.t('MYBOOKINGUI_DOCTOR_DECLINED'),
    PHARMACY_PENDING: i18next.t('MYBOOKINGUI_PHAR_PENDING'),
    PHARMACY_CONFIRM: i18next.t('MYBOOKINGUI_PHAR_CONFIRMED'),
    PHARMACY_JOIN: i18next.t('VIDEOCALL_PHARMACY_JOIN'),
    PHARMACY_PENDING_NOTE: i18next.t('MYBOOKINGUI_PHAR_PENDING_NOTE'),
    PHARMACY_COMPLETED: i18next.t('MYBOOKINGUI_PHAR_COMPLETED'),
    PHARAMCY_DECLINE: i18next.t('MYBOOKINGUI_PHAR_DECLINED'),
    COMMUNITY_PHARMACIST_JOIN: i18next.t('VIDEOCALL_COMM_PHARMACY_JOIN'),
    COMMUNITY_PHARMACIST_PENDING: i18next.t('MYBOOKINGUI_COMPHAR_PENDING'),
    COMMUNITY_PHARMACIST_CONFIRM: i18next.t('MYBOOKINGUI_COMPHAR_CONFIRMED'),
    COMMUNITY_PHARMACIST_PENDING_NOTE: i18next.t(
      'MYBOOKINGUI_COMPHAR_PENDING_NOTE',
    ),
    COMMUNITY_PHARMACIST_COMPLETED: i18next.t('MYBOOKINGUI_COMPHAR_COMPLETED'),
    COMMUNITY_PHARMACIST_DECLINE: i18next.t('MYBOOKINGUI_COMPHAR_DECLINED'),
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      checkBooking();
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [refreshing]);

  React.useEffect(() => {
    console.log(firebaseStatus);
    if (isFocused) {
      checkBooking();
    }
  }, [isFocused]);

  //FIREBASE
  const goLive = async firebaseRoom => {
    console.log('GO LIVE');
    let firebaseRef = database().ref(firebaseRoom);
    console.log('firebaseRoom', firebaseRoom);
    firebaseRef.on('value', value => {
      value.forEach(v => {
        if (v.key === 'status') {
          const _status = v.val();
          setFirebaseStatus(_status);
        }
      });
    });
    setIsLoading(false);
  };

  const endProcess = async () => {
    let bookingId = telemedicine.booking.id;
    let stackName = 'BookingStack';
    let bookingRedirectObj = {
      screen: 'MyBookingActivity',
      params: {
        bookingId: bookingId,
      },
    };

    const _booking = await GetBookingByIdService(bookingId);
    if (
      _booking &&
      _booking?.prescription?.length &&
      _booking?.prescription !== undefined &&
      _booking?.status.includes(`DOCTOR`)
    ) {
      let pharmacyObject = {
        admitTime: moment().toISOString(),
        productableType: 'Telemedicine',
        bookingCategory: 'general',
        bookingType: 'Telepharmacy',
        status: `COMMUNITY_PHARMACIST_PENDING`,
        bookingTypeId: 0,
        prescription: _booking?.prescription,
        treatmentId: _booking?.treatmentId,
        symptom: _booking?.symptom,
      };

      stackName = 'MainStack';
      bookingRedirectObj = {
        screen: 'PaymentOrder',
        params: {
          bookingData: pharmacyObject,
          bookingCategory: `general`,
        },
      };

      // newPharmacyBooking = await CreateBookingByTreatmentIdService(
      //   pharmacyObject,
      // );

      // if (newPharmacyBooking) {
      //   localNotificationService.showNotification(
      //     0,
      //     i18next.language === 'en' ? 'Alert' : 'แจ้งเตือน',
      //     i18next.language === 'en'
      //       ? 'Your doctor has prescribed medication. Please book an appointment with your pharmacist to learn how to take the medicine.'
      //       : 'แพทย์ได้ทำการสั่งยาแล้ว กรุณาทำการนัดหมายเภสัชกรเพื่อทำการเรียนรู้วิธีการใช้ยา',
      //     {
      //       page: 'Booking',
      //       bookingId: newPharmacyBooking?.id,
      //       local: true,
      //     },
      //   );

      // bookingRedirectId = newPharmacyBooking.id;
    }

    setIsLoading(false);
    Alert.alert(
      role === 'DOCTOR'
        ? i18next.language == 'en'
          ? 'Your care session has ended'
          : 'เสร็จสิ้นการปรึกษาแพทย์'
        : i18next.language == 'en'
        ? 'Consultation has ended'
        : 'เสร็จสิ้นการปรึกษาเภสัชกร',
      '',
      [
        {
          text: i18next.t('STATUS_OK'),
          onPress: () => {
            navigation.navigate(stackName, bookingRedirectObj);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const joinVideoCall = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(true);
      setPatientInWaiting(false);
      setChatScreen(false);
      twilioInit(firebaseData, twilioData);
    }, 2000);
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      let timer = null;
      const bookingUpdate = async () => {
        if (firebaseStatus && firebaseStatus === `${role}_JOIN`) {
          let bookingId = telemedicine.booking.id;
          let roleName = '';
          if (i18next.language === 'en') {
            roleName =
              role === 'DOCTOR'
                ? 'doctor'
                : role === 'PHARMACY'
                ? 'pharmacist'
                : 'community pharmacist';
          } else {
            roleName =
              role === 'DOCTOR'
                ? 'แพทย์'
                : role === 'PHARMACY'
                ? 'เภสัชกร'
                : 'เภสัชกรชุมชน';
          }

          localNotificationService.showNotification(
            0,
            i18next.language === 'en' ? 'Alert' : 'แจ้งเตือน',
            i18next.language === 'en'
              ? `Your ${roleName} has entered the room.`
              : `${roleName}ได้เข้าห้องแล้ว`,
          );

          const bookingUpdated = await GetBookingByIdService(bookingId);
          const practitionerUpdated = await fetchPractitioner(
            bookingUpdated?.practitionerAppUserId,
          );

          setPractitioner(practitionerUpdated[0]);
          setIsLoading(false);
        } else if (firebaseStatus === `${role}_PENDING_NOTE`) {
          setIsLoading(true);
          timer = setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          setPatientInWaiting(false);
          setDoctorNotePending(true);
        } else if (firebaseStatus === `${role}_COMPLETED`) {
          setIsLoading(true);
          twilioRef.current.disconnect();
          timer = setTimeout(() => {
            endProcess();
            dispatch(TelemedicineActions.clear());
          }, 2000);
        }
      };

      bookingUpdate();
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }, [firebaseStatus]),
  );

  //TWILIO
  const twilioInit = async (_firebase, _twilio) => {
    try {
      await requestAudioPermission();
      await requestCameraPermission();
      await onConnecting(_firebase, _twilio);
    } catch (error) {
      console.log('twilioInit', error);
    }
  };

  const onConnecting = async (_firebase, _twilio) => {
    setStatus('connecting');
    twilioRef.current.connect({
      roomName: _firebase.bookingId + _firebase.date,
      accessToken: _twilio.token,
    });
    setIsLoading(false);
  };

  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: i18next.t('VIDEOCALL_PERMISSION_MIC'),
          message: i18next.t('VIDEOCALL_ACCESS_MIC'),
          buttonNeutral: i18next.t('VIDEOCALL_LATER'),
          buttonNegative: i18next.t('VIDEOCALL_CANCEL'),
          buttonPositive: i18next.t('VIDEOCALL_ALLOW'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the microphone');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: i18next.t('VIDEOCALL_PERMISSION_CAMERA'),
          message: i18next.t('VIDEOCALL_ACCESS_CAMERA'),
          buttonNeutral: i18next.t('VIDEOCALL_LATER'),
          buttonNegative: i18next.t('VIDEOCALL_CANCEL'),
          buttonPositive: i18next.t('VIDEOCALL_ALLOW'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _onRoomDidConnect = () => {
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ error }) => {
    setStatus('disconnected');
    console.log('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    setStatus('disconnected');
    console.log('Failed');
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('Removed');
    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);
    setVideoTracks(videoTracksLocal);
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

  const connected = status === 'connected' || status === 'connecting';
  return {
    isLoading,
    doctorNotePending,
    patientInWaiting,
    booking,
    role,
    status,
    chatShow,
    videoTracks,
    practitioner,
    refreshing,
    firebaseStatus,
    getBookingStatusWording,
    totalPrice,
    consultationPrice,
    drugPriceTotal,
    fromTo,
    onRefresh,
    getBookingTypeWording,
    _onRoomDidConnect,
    _onRoomDidDisconnect,
    _onRoomDidFailToConnect,
    _onParticipantRemovedVideoTrack,
    _onParticipantAddedVideoTrack,
    _onMuteButtonPress,
    _onFlipButtonPress,
    setChatScreen,
    setFirebaseStatus,
    joinVideoCall,
    unreadCount,
    setUnreadCount,
    isAudioEnabled,
    connected,
  };
};

export { useHooks };
