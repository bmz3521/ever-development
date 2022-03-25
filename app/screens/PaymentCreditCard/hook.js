import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PaymentActions } from '@actions';
import moment from 'moment';
import { getAccessToken } from 'app/utils/asyncStorage';
import * as Yup from 'yup';
import { Formik, useFormikContext } from 'formik';
import { useTheme, Icon } from 'react-native-elements';
import { Platform, View } from 'react-native';
moment.locale('th');
var axios = require('axios');
var qs = require('qs');
const GenderItem = [
  { label: 'ชาย', value: 'MALE' },
  { label: 'หญิง', value: 'FEMALE' },
];
const Gender = {
  MALE: 'ชาย',
  FEMALE: 'หญิง',
};
const useHooks = () => {
  const [showBirthDate, setShowBirthDate] = useState('-');
  const [failModal, setFailModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [complicanceModal, setComplicanceModal] = useState(false);
  const [dateValidate, setDateValidate] = useState(false);
  const [typeEditAble, setTypeEditAble] = useState('');
  const [checkAddressSave, setCheckAddressSave] = useState(false);
  const formRef = useRef();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userInfo = user?.data;
  const userAddressInfo = user?.data?.addresses[0];
  const [userAddress, setUserAddress] = useState(userAddressInfo);
  const [userProvince, setUserProvince] = useState(userAddressInfo);
  const [newPostalCode, setNewPostalCode] = useState(false);
  const payment = useSelector(state => state.payment.data);
  const cusId = useSelector(state => state.payment.customerId);
  const [customerId, setCustomerId] = useState(cusId);
  useEffect(() => {}, [userAddress, newPostalCode]);

  const validationSchemaUserInfo = Yup.object().shape({
    creditNo: Yup.string()
      .required('กรุณากรอกหมายเลขบัตร')
      .min(19, 'กรุณากรอกจำนวนเลขบัตรให้ครบ')
      .label('creditNo'),
    expiry: Yup.string()
      .required('กรุณากรอกวันหมดอายุบัตร')
      .min(5, 'กรุณากรอกวันหมดอายุให้ครบ')
      .label('expiry'),
    cVv: Yup.string()
      .required('เลขหลังบัตรไม่ถูกต้อง')
      .min(3, 'กรุณากรอกเลขหลังบัตรให้ครบ')
      .label('cVv'),
    holderName: Yup.string()
      .required('กรอกชื่อที่แสดงบนบัตร')
      .label('holderName'),
  });

  const verifyCreditCard = async data => {
    var cardData = qs.stringify({
      'card[name]': data.holderName,
      'card[city]': '',
      'card[postal_code]': '',
      'card[number]': data.creditNo.replaceAll('-', ''),
      'card[security_code]': data.cVv,
      'card[expiration_month]': data.expiry.split('/')[0],
      'card[expiration_year]': `20${data.expiry.split('/')[1]}`,
    });
    // 3530 1111 1119 0011
    var config = {
      method: 'post',
      url: 'https://vault.omise.co/tokens',
      headers: {
        Authorization: 'Basic cGtleV90ZXN0XzVweGxxMTNpaTE0MGRkN25veTg6',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: cardData,
    };

    const resp = await axios(config)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
    return resp;
  };
  const saveCardToOmise = async response => {
    var data = qs.stringify({
      card: response.id,
    });
    var config = {
      method: 'patch',
      url: `https://api.omise.co/customers/${customerId}`,
      headers: {
        Authorization: 'Basic c2tleV90ZXN0XzVxM3Mzb3plbzB4amRiOHpkZ3g6',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    console.log('saveCardToOmise ========== = = = = ', customerId);
    const resp = await axios(config)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
    return resp;
  };
  const saveCreditCard = async (data, { resetForm }) => {
    const response = await verifyCreditCard(data);
    const onSaveCard = response ? await saveCardToOmise(response) : false;
    if (onSaveCard) {
      await dispatch(
        PaymentActions.saveCustomerInfo({
          data: onSaveCard,
          customerId: customerId,
          callback: response => {
            if (response.success) {
              setSuccessModal(true);
            } else {
              setFailModal(true);
            }
          },
        }),
      );
    } else setFailModal(true);

    console.log('onsace Card ===', onSaveCard);
  };
  const handleSubmitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  return {
    showBirthDate,
    validationSchemaUserInfo,
    failModal,
    successModal,
    theme,
    GenderItem,
    Gender,
    formRef,
    Icon,
    Formik,
    saveCreditCard,
    setSuccessModal,
    setFailModal,
    handleSubmitForm,
  };
};

export { useHooks };
