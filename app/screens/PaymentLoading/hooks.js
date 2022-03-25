import React, { useState, useEffect } from 'react';
import {
  createBooking as CreateBookingService,
  setBookingFinishQuotationFinishFormSubmission as CreateBookingOMA,
} from '@services/bookingService';

import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { View, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Images } from '@config';
import styles from './styles';

const useHooks = ({ navigation, route, theme }) => {
  const {
    bookingCategory,
    bookingData = null,
    consultationPrice = 0,
    drugPriceTotal = 0,
    shippingPrice = 0,
    totalPrice = 0,
    paymentType = null,
    locationAddress = null,
  } = route.params;

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromTo = {
    general:
      bookingData?.bookingType === `Telepharmacy`
        ? i18next.t('TELEPAYMENT_PHARMACIST_NOW')
        : i18next.t('TELEPAYMENT_CONSULT_NOW'),
    telemed: i18next.t('TELEPAYMENT_CONSULT_SCHEDULE'),
    covid: i18next.t('TELEPAYMENT_CONSULT_COVID'),
    procedure: i18next.t('TELEPAYMENT_CLINIC_PROCEDURE'),
    clinicPackage: i18next.t('TELEPAYMENT_CLINIC_PACKAGE'),
  };

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (ready) {
      // submit(price,title);
      submit(totalPrice);
    }
  }, [ready]);

  useEffect(() => {
    const checkNetwork = () => {
      NetInfo.fetch().then(state => {
        console.log(state);
        console.log('Is isInternetReachable?', state.isInternetReachable);

        const notConnected = () => {
          Alert.alert(
            i18next.t('STATUS_NOCONNECTION'),
            i18next.t('STATUS_CHECKINTERNET'),
            [
              {
                text: i18next.t('STATUS_OK'),
                onPress: () => navigation.navigate('HealthActivity'),
              },
            ],
          );
        };

        if (state?.isInternetReachable === false) {
          notConnected();
        }
      });
    };

    checkNetwork();
  }, []);

  const createBooking = async bookingData => {
    let newTreatmentData = {
      appUserId: user.data.userId,
      treatmentableType: 'organization',
      treatmentableId: 2,
    };
    const newBookingData = bookingData;
    const newBooking = await CreateBookingService(
      newTreatmentData,
      newBookingData,
    );
    return newBooking;
  };

  const submit = async (totalPrice = 0, title = 'unknown') => {
    setLoading(true);
    let newData;
    let stackName;
    let stackScreen;

    let newBooking;
    // await analytics().logPurchase({
    //   value: parseInt(price),
    //   currency: 'thb',
    //   items: [
    //     {
    //       item_brand: 'EVER',
    //       item_id: 'EVER_CONSULT_01',
    //       item_name: `B${price}-${title}`,
    //       item_category: 'consulting services',
    //     },
    //   ],
    // });
    switch (bookingCategory) {
      case `telemed`:
        newData = {
          ...bookingData,
          productableType: 'Telemedicine',
          bookingTypeId: 0,
          symptom: { note, imageUrl },
        };
        stackName = `BookingStack`;
        stackScreen = `MyBookingActivity`;
        break;
      case `general`:
        newData = {
          ...bookingData,
          admitTime: moment().toISOString(),
        };

        stackName = `none`;
        stackScreen = `VideoCall`;

        if (bookingData?.bookingType === `Telepharmacy`) {
          newData = {
            ...bookingData,
            admitTime: moment().toISOString(),
            productableType: 'Telemedicine',
            locationAddress,
          };

          stackName = `BookingStack`;
          stackScreen = `MyBookingActivity`;
        }

        stackName = `none`;
        stackScreen = `VideoCall`;
        break;
      case `covid`:
        newData = {
          admitTime: moment().toISOString(),
          bookingCategory: `covid`,
          status: `DOCTOR_PENDING`,
          productableType: 'Telemedicine',
          bookingTypeId: 0,
          covidForm: covidForm,
        };
        stackName = `BookingStack`;
        stackScreen = `MyBookingActivity`;
        break;
      default:
        break;
    }

    try {
      newBooking = await createBooking(newData);
    } catch (err) {
      Alert.alert(
        'ไม่สามารถยืนยันรายการสั่งซื้อได้',
        'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        [
          {
            text: 'ตกลง',
            onPress: () => navigation.goBack(),
          },
        ],
      );
      console.log('error create booking', err);
    } finally {
      setLoading(false);
    }

    // const newBooking = await createBooking(newData);

    if (stackName === 'none') {
      navigation.popToTop();
      navigation.navigate(stackScreen, {
        bookingId: newBooking.id,
        consultationPrice,
        totalPrice,
        drugPriceTotal,
        shippingPrice,
      });
    } else {
      navigation.popToTop();
      navigation.navigate(`MyBookingsUI`);
      navigation.navigate(stackName, {
        screen: stackScreen,
        params: { bookingId: newBooking.id },
      });
    }
  };

  const PaymentIcon = () => {
    switch (paymentType) {
      case 1:
        return (
          <View style={styles(theme).iconMoney}>
            <Icon
              size={12}
              name="attach-money"
              color={theme.colors.secondary}
            />
          </View>
        );
      case 2:
        return (
          <View style={{ justifyContent: 'center', marginRight: 5 }}>
            <View style={styles(theme).iconMoney}>
              <Image
                style={styles(theme).iconCredit}
                source={Images.CreditCardLogo}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={{ justifyContent: 'center' }}>
            <View style={styles(theme).iconBankColumn}>
              <Image
                style={styles(theme).iconBanking}
                source={Images.InternetBanking}
              />
            </View>
          </View>
        );
      case 4:
        return (
          <View style={{ justifyContent: 'center', marginRight: 5 }}>
            <View style={styles.iconPromptPayColumn}>
              <Image
                style={styles(theme).iconPromptPay}
                source={Images.PromptPay}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return {
    actions: {},
    fromTo,
    bookingCategory,
    bookingData,
    consultationPrice,
    totalPrice,
    loading,
    shippingPrice,
    PaymentIcon,
  };
};

export default useHooks;
