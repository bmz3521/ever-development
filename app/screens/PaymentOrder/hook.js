import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { labelInfo } from './LabelInfo';
import * as Yup from 'yup';
import { Text, Avatar, useTheme, Icon } from 'react-native-elements';
import Ionics from 'react-native-vector-icons/Ionicons';
import { Images } from '@config';
import styles from './style';
import { View, Alert, Dimensions, FlatList } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  createBooking as CreateBookingService,
  setBookingFinishQuotationFinishFormSubmission as CreateBookingOMA,
} from '@services/bookingService';
import { getPaymentOmiseCustomerId as getOmiCustId } from '@services/authService';
import { PaymentActions } from '@actions';
import i18next from 'i18next';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

export const useHooks = ({
  bookingCategory,
  navigation,
  bookingData,
  note,
  imageUrl,
  covidForm,
  locationAddress,
  price,
}) => {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const payment = useSelector(state => state?.payment?.data);
  const selectType = useSelector(state => state?.payment?.selectType);
  const test = useSelector(state => state?.payment);
  const [lengthCredit, setLengthCredit] = useState(payment.length);
  const [paymentType, setPaymentType] = useState(selectType || 1);
  const [customerId, setCustomerId] = useState(payment?.customerId);
  const [consultationPrice, setConsultationPrice] = useState(price);
  const [shippingPrice, setShippingPrice] = useState(50);

  const [drugPriceTotal, setDrugPriceTotal] = useState(0);
  const { theme } = useTheme();
  const itemList = [
    { title: i18next.t('SELECT_PAYMENT_METHOD_CASH'), id: 1 },
    { title: i18next.t('SELECT_PAYMENT_METHOD_DEBIT'), id: 2 },
    { title: i18next.t('SELECT_PAYMENT_METHOD_INTERNET'), id: 3 },
  ];

  useEffect(() => {
    switch (bookingData?.bookingType) {
      case 'Telepharmacy':
        return setConsultationPrice(50);
      default:
        return;
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    checkNetwork();
    if (payment.cards?.data.length === 0) {
      setPaymentType(1);
    } else setPaymentType(selectType || 1);

    let drugPriceTotal = 0;
    bookingData?.prescription?.map(item => {
      if (item.unitPriceCents && item.unitPriceCents !== undefined) {
        return (drugPriceTotal += (item.unitPriceCents * item.amount) / 100);
      }
      return;
    });

    setDrugPriceTotal(drugPriceTotal);
  }, [bookingCategory, selectType, payment.cards?.data?.length]);

  const totalPrice = consultationPrice + drugPriceTotal + shippingPrice;

  const fetchCustomerInfo = async () => {
    const resp = customerId ? customerId : await getOmiCustId();
    var config = {
      method: 'get',
      url: `https://api.omise.co/customers/${resp?.omiseCustomerId ||
        customerId}`,
      headers: {
        Authorization: 'Basic c2tleV90ZXN0XzVxM3Mzb3plbzB4amRiOHpkZ3g6',
      },
    };
    console.log(
      'customerId fffffffff ===',
      resp?.omiseCustomerId || customerId,
    );
    axios(config)
      .then(async function(response) {
        await dispatch(
          PaymentActions.saveCustomerInfo({
            data: response.data,
            selectType: paymentType,
            customerId: resp?.omiseCustomerId || customerId,
            callback: response => {
              if (response.success) {
                // alert('SUCCESS')
              } else {
                alert('FAIL');
              }
            },
          }),
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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

  const createBooking = async bookingData => {
    let newTreatmentData =
      // bookingCategory === 'procedure' || bookingCategory == 'clinicPackage'
      //   ? { clinicId: bookingData.clinicId }
      //   :
      {
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

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      console.log(state);
      console.log('Is isInternetReachable?', state.isInternetReachable);

      const notConnected = () => {
        Alert.alert(
          'ไม่สามารถเชื่อมต่อได้',
          'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
          [
            {
              text: 'ตกลง',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      };

      if (state?.isInternetReachable === false) {
        notConnected();
      }
    });
  };

  const submit = async (price = 0, title = 'unknown') => {
    setLoading(true);
    let newData;
    let stackName;
    let stackScreen;
    await analytics().logPurchase({
      value: parseInt(price),
      currency: 'thb',
      items: [
        {
          item_brand: 'EVER',
          item_id: 'EVER_CONSULT_01',
          item_name: `B${price}-${title}`,
          item_category: 'consulting services',
        },
      ],
    });
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
          productableType: 'Telemedicine',
          bookingTypeId: 0,
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

      // case `procedure`:
      //   newData = {
      //     ...bookingData,
      //     admitTime: moment().toISOString(),
      //     status: `CLINIC_PENDING`,
      //     productableType: 'Procedure',
      //     bookingCategory: 'procedure',
      //   };
      //   stackName = `BookingStack`;
      //   stackScreen = `MyBookingActivity`;
      //   break;

      // case `clinicPackage`:
      //   newData = {
      //     ...bookingData,
      //     admitTime: moment().toISOString(),
      //     status: `CLINIC_PENDING`,
      //     productableType: 'ClinicPackage',
      //     bookingCategory: 'clinicPackage',
      //   };
      //   stackName = `BookingStack`;
      //   stackScreen = `MyBookingActivity`;
      default:
        break;
    }

    const newBooking = await createBooking(newData);

    setLoading(false);
    if (stackName === 'none') {
      navigation.popToTop();
      navigation.navigate(stackScreen, { bookingId: newBooking.id });
    } else {
      navigation.popToTop();
      navigation.navigate(`MyBookingsUI`);
      navigation.navigate(stackName, {
        screen: stackScreen,
        params: { bookingId: newBooking.id },
      });
    }
  };

  const onNext = async () => {
    switch (bookingCategory) {
      case `general`:
        navigation.navigate('MainStack', {
          screen: 'PaymentLoading',
          params: {
            bookingCategory: 'general',
            bookingData,
            consultationPrice,
            drugPriceTotal,
            shippingPrice,
            totalPrice,
            paymentType,
            locationAddress,
          },
        });
        break;
    }
  };

  const submitOMA = async (price = 0, title = 'unknown') => {
    setLoading(true);

    let newData;
    let stackName;
    let stackScreen;

    await analytics().logPurchase({
      value: parseInt(price),
      currency: 'thb',
      items: [
        {
          item_brand: 'EVER',
          item_id: 'EVER_CONSULT_01',
          item_name: `B${price}-${title}`,
          item_category: 'consulting services',
        },
      ],
    });

    switch (bookingCategory) {
      case `procedure`:
        newData = {
          ...bookingData,
          admitTime: moment().toISOString(),
          status: `CLINIC_PENDING`,
          productableType: 'Procedure',
          bookingCategory: 'procedure',
        };
        stackName = 'BookingStack';
        stackScreen = 'MyBookingActivity';
        break;
      case `clinicPackage`:
        newData = {
          ...bookingData,
          admitTime: moment().toISOString(),
          status: `CLINIC_PENDING`,
          productableType: 'ClinicPackage',
          bookingCategory: 'clinicPackage',
        };
        stackName = 'BookingStack';
        stackScreen = 'MyBookingActivity';

        break;
      default:
        break;
    }

    const newBooking = await CreateBookingOMA(newData);

    setLoading(false);

    navigation.popToTop();
    navigation.navigate(stackName, { screen: `MyBookingsUI` });
    navigation.navigate(stackName, {
      screen: stackScreen,
      params: { bookingId: newBooking.id },
    });
  };

  const renderIconService = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          padding: 0,
          paddingBottom: 10,
          paddingVertical: 40,
        }}
      >
        <View style={styles(theme).DrugListCarousel}>
          <View>
            <Avatar
              source={Images.DoctorIcon}
              containerStyle={{
                backgroundColor: theme.colors.grey4,
              }}
              size="medium"
              rounded
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                },
              ]}
            >
              {`Paracetamol \n250mg`}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizeSmallest,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.secondary,
              }}
            >
              {i18next.t('TELEPAYMENT_FREE')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ChevronRight = ({ height, font }) => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 5,
          top: height,
        }}
      >
        <Icon name="chevron-right" color={theme.colors.grey4} size={font} />
      </View>
    );
  };
  const StraightLine = () => (
    <View
      style={{
        borderColor: '#eeeeee',
        borderWidth: 0.8,
      }}
    />
  );
  return {
    auth,
    theme,
    fromTo,
    Images,
    loading,
    payment,
    itemList,
    paymentType,
    lengthCredit,
    customerId,
    Text,
    Avatar,
    Icon,
    consultationPrice,
    drugPriceTotal,
    shippingPrice,
    totalPrice,
    Ionics,
    submit,
    submitOMA,
    useTheme,
    setLoading,
    ChevronRight,
    StraightLine,
    renderIconService,
    fetchCustomerInfo,
    onNext,
  };
};
