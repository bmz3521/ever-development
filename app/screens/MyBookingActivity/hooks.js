import React from 'react';
import { getBookingById } from '@services/bookingService';
import { getPractitionerDetailByUserId } from '@services/practitionerService';
import { getClinicsById } from '@services/clinicService';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { TelemedicineActions } from 'app/actions';
import i18next from 'i18next';

const useHooks = props => {
  const { bookingId, navigation, dispatch, price } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [practitioner, setPractitioner] = React.useState({});
  const [clinic, setClinic] = React.useState({});
  const [booking, setBooking] = React.useState(null);
  const [drugPriceTotal, setDrugPriceTotal] = React.useState(0);

  const isFocused = useIsFocused();
  const logisticStatusText = {
    PENDING: 'รอส่งของ',
    ON_GOING: 'กำลังส่งของ',
    COMPLETED: 'ส่งของเสร็จ',
  };
  const navigateToVideoCallScreen = async params => {
    navigation.navigate('VideoCall', params);
  };

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

  React.useEffect(() => {
    screenInit();
  }, [isFocused, bookingId]);

  const screenInit = async () => {
    await fetchBooking(bookingId);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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

  const fetchBooking = async _bookingId => {
    try {
      let _booking = await getBookingById(_bookingId);

      setBooking(_booking);

      if (_booking?.practitionerAppUserId) {
        await fetchPractitioner(_booking?.practitionerAppUserId);
      } else {
        setPractitioner({});
      }

      console.log(_booking);

      if (_booking?.clinicId) {
        await fetchClinic(_booking?.clinicId);
      } else {
        setClinic({});
      }
    } catch (error) {
      console.log('getBookingError==', error);
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

  const fetchClinic = async _clinicId => {
    try {
      const _clinic = await getClinicsById(_clinicId);

      setClinic(_clinic);
    } catch (err) {
      console.log('getClinicError==', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      screenInit();
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [refreshing]);

  const getBookingTypeWording = () => {
    if (booking?.status === undefined) return '';
    const roleName =
      booking?.status.split('_').length > 2
        ? `${booking?.status.split('_')[0]}_${booking?.status.split('_')[1]}`
        : `${booking?.status.split('_')[0]}`;
    const role =
      roleName === `DOCTOR`
        ? i18next.t('ROLE_PHYSICIAN')
        : roleName === `CLINIC`
        ? i18next.t('ROLE_CLINIC')
        : roleName === `PATIENT_FINISH`
        ? i18next.t('ROLE_CLINIC')
        : roleName === `COMMUNITY_PHARMACIST`
        ? i18next.t('ROLE_COMMUNITY_PHARMACIST')
        : i18next.t('ROLE_PHARMACIST');

    switch (booking?.bookingCategory) {
      case `telemed`:
        return i18next.language == 'en'
          ? `Schedule a ${role} consult`
          : `นัดหมายปรึกษา${role}ออนไลน์`;
      case `general`:
        return i18next.language == 'en'
          ? `Consult a ${role} now`
          : `ปรึกษา${role}แบบสุ่ม`;
      case `covid`:
        return i18next.language == 'en'
          ? `Consult a home isolation ${role}`
          : `ปรึกษา${role} home isolation`;
      case `procedure`:
        return i18next.language == 'en'
          ? `Schedule a ${role}`
          : `นัดหมาย${role}`;
      case `clinicPackage`:
        return i18next.language == 'en'
          ? `Schedule a ${role} package`
          : `นัดหมายโปรแกรมรักษา`;
    }
  };

  const getBookingStatusWording = status => {
    switch (status) {
      case `DOCTOR_PENDING`:
        return booking?.bookingCategory === 'telemed'
          ? i18next.t('MYBOOKINGUI_DOCTOR_PENDING')
          : i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT');
      case `DOCTOR_CONFIRM`:
        return moment().isBefore(
          moment(booking?.admitTime).subtract(15, 'minutes'),
        )
          ? i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_BT')
          : i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT');
      case `DOCTOR_PENDING_NOTE`:
        return i18next.t('MYBOOKINGUI_DOCTOR_PENDING_NOTE');
      case `DOCTOR_COMPLETED`:
        return i18next.t('MYBOOKINGUI_DOCTOR_COMPLETED');
      case `DOCTOR_DECLINE`:
        return i18next.t('MYBOOKINGUI_DOCTOR_DECLINED');
      case `PHARMACY_PENDING`:
        return i18next.t('MYBOOKINGUI_PHAR_PENDING');
      case `PHARMACY_CONFIRM`:
        return i18next.t('MYBOOKINGUI_PHAR_CONFIRMED');
      case `PHARMACY_PENDING_NOTE`:
        return i18next.t('MYBOOKINGUI_PHAR_PENDING_NOTE');
      case `PHARMACY_COMPLETED`:
        return i18next.t('MYBOOKINGUI_PHAR_COMPLETED');
      case `PHARAMCY_DECLINE`:
        return i18next.t('MYBOOKINGUI_PHAR_DECLINED');
      case `COMMUNITY_PHARMACIST_PENDING`:
        return i18next.t('MYBOOKINGUI_COMPHAR_PENDING');
      case `COMMUNITY_PHARMACIST_CONFIRM`:
        return i18next.t('MYBOOKINGUI_COMPHAR_CONFIRMED');
      case `COMMUNITY_PHARMACIST_PENDING_NOTE`:
        return i18next.t('MYBOOKINGUI_COMPHAR_PENDING_NOTE');
      case `COMMUNITY_PHARMACIST_COMPLETED`:
        return i18next.t('MYBOOKINGUI_COMPHAR_COMPLETED');
      case `COMMUNITY_PHARMACIST_DECLINE`:
        return i18next.t('MYBOOKINGUI_COMPHAR_DECLINED');
      case `CLINIC_PENDING`:
        return i18next.t('MYBOOKINGUI_CLINIC_PENDING');
      case `PATIENT_FINISH_FORM_SUBMISSION`:
        return i18next.t('MYBOOKINGUI_CLINIC_PENDING');
      case `CLINIC_CONFIRM`:
        return i18next.t('MYBOOKINGUI_CLINIC_CONFIRMED');
      case `CLINIC_CONFIRM_ADMIT`:
        return i18next.t('MYBOOKINGUI_CLINIC_CONFIRMED_ADMIT');
      case `CLINIC_DECLINE`:
        return i18next.t('MYBOOKINGUI_CLINIC_DECLINED');
      case `CLINIC_COMPLETED`:
        return i18next.t('MYBOOKINGUI_CLINIC_COMPLETED');
    }
  };

  return {
    refreshing,
    isLoading,
    booking,
    practitioner,
    clinic,
    logisticStatusText,
    drugPriceTotal,
    fromTo,
    onRefresh,
    getBookingTypeWording,
    getBookingStatusWording,
    navigateToVideoCallScreen,
  };
};

export { useHooks };
