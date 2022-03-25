import React, { useCallback } from 'react';
import { createBooking } from '@services/bookingService';
import { useSelector } from 'react-redux';

const useHooks = ({ navigation, route }) => {
  const { clinic, quotation, inquiry, type, clinicPackage } = route.params;
  const user = useSelector(state => state.user);

  const onBookNow = useCallback(async () => {
    const products = quotation.procedures;
    let bookingData = {
      startTime: new Date(quotation.startTime).toISOString(),
      endTime: new Date(quotation.endTime).toISOString(),
      totalPrice: quotation.totalPrice,
      products: products,
      formData: inquiry,
      clinicId: clinic.id,
    };

    navigation.navigate('MainStack', {
      screen: 'PaymentOrder',
      params: {
        bookingCategory: 'procedure',
        bookingData,
      },
    });
  }, []);

  const onBookPackage = useCallback(async () => {
    const products = [{ ...clinicPackage, type: 'CLINIC_PACKAGE' }];
    let bookingData = {
      startTime: new Date(quotation.startTime).toISOString(),
      endTime: new Date(quotation.endTime).toISOString(),
      totalPrice: quotation.totalPrice,
      productableId: clinicPackage.id,
      products: products,
      formData: inquiry,
      clinicId: clinic.id,
    };

    navigation.navigate('MainStack', {
      screen: 'PaymentOrder',
      params: {
        bookingCategory: 'clinicPackage',
        bookingData,
      },
    });
  }, []);

  const onBookOMA = useCallback(async () => {
    let newData;

    switch (type) {
      case 'procedure':
        newData = {
          treatment: {
            appUserId: user.data.userId,
            treatmentableId: clinic.id,
            treatmentableType: 'clinic',
          },
          quotation: { ...quotation, redeem: 'true', clinicId: clinic.id },
          inquiry: inquiry,
          userInfo: user.data,
        };
        break;
      case 'clinicPackage':
        newData = {
          treatment: {
            appUserId: user.data.userId,
            treatmentableId: clinic.id,
            treatmentableType: 'clinic',
          },
          quotation: {
            ...quotation,
            procedures: [{ ...clinicPackage, type: 'CLINIC_PACKAGE' }],
            redeem: 'true',
            clinicId: clinic.id,
          },
          inquiry: inquiry,
          userInfo: user.data,
        };
        break;
      default:
        break;
    }

    navigation.navigate('MainStack', {
      screen: 'PaymentOrder',
      params: {
        bookingCategory: type,
        bookingData: newData,
      },
    });
  }, []);

  return {
    actions: {
      onBookNow,
      onBookPackage,
      onBookOMA,
    },
    clinic,
    clinicPackage,
    quotation,
    inquiry,
    type,
  };
};

export default useHooks;
