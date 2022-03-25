import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useTheme, Icon } from 'react-native-elements';
import { Formik, useFormikContext } from 'formik';
import { checkCIdVerify } from '@utils/alertVerifyUser';

import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from '@actions';
import * as Yup from 'yup';
import moment from 'moment';
import i18next from 'i18next';

moment.locale('th');

const Gender = {
  MALE: i18next.language === 'th' ? 'ชาย' : 'Male',
  FEMALE: i18next.language === 'th' ? 'หญิง' : 'Female',
};

const useHooks = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const formRef = useRef();
  const dateWheelRef = useRef();
  const dispatch = useDispatch();
  const userInfo = user?.data;
  const { theme } = useTheme();

  const [showBirthDate, setShowBirthDate] = useState('-');
  const [failModal, setFailModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [complicanceModal, setComplicanceModal] = useState(false);
  const [dateValidate, setDateValidate] = useState(false);
  const [typeEditAble, setTypeEditAble] = useState('');
  const [checkAddressSave, setCheckAddressSave] = useState(false);
  const userAddressInfo = user?.data?.addresses[0];
  const [userAddress, setUserAddress] = useState(userAddressInfo);
  const [userProvince, setUserProvince] = useState(userAddressInfo);
  const [newPostalCode, setNewPostalCode] = useState(false);

  const validationSchemaUserInfo = Yup.object().shape({
    ...(!checkCIdVerify(user.data.cId)
      ? {}
      : {
          cId: Yup.string()
            .required('ระบุหมายเลขบัตรประชาชนให้ถูกต้อง')
            .min(17, 'กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก')
            .label('cId'),
        }),
    firstName: Yup.string()
      .required('กรุณากรอกชื่อ')
      .min(1, 'กรุณากรอกชื่อให้ถูกต้อง')
      .label('firstName'),
    lastName: Yup.string()
      .required('กรุณากรอกนามสกุล')
      .min(1, 'กรุณากรอกนามสกุลให้ถูกต้อง')
      .label('lastName'),
    birthDate: Yup.string().label('birthDate'),
    genderValue: Yup.string()
      .required('กรุณาระบุเพศของคุณ')
      .label('genderValue'),
    mobileNumber: Yup.string()
      .required('กรุณากรอกเบอร์โทรศัพท์')
      .min(12, 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก')
      .label('mobileNumber'),
  });

  const selectGender = () => {
    navigation.navigate('ListingData', {
      callBack: formRef.current?.handleChange('genderValue'),
      title: i18next.t('USERREG_SELECT'),
      data: [
        {
          value: 'MALE',
          label: i18next.t('USERREG_MALE'),
          check: formRef?.current?.values.genderValue === 'MALE',
        },
        {
          value: 'FEMALE',
          label: i18next.t('USERREG_FEMALE'),
          check: formRef?.current?.values.genderValue === 'FEMALE',
        },
      ],
      selected: true,
      pageCallback: 'InformationForm',
    });
  };

  const convertPhoneNumberFormat = number => {
    let regex = /(\d{3})(\d{3})(\d{4})/;
    var match = regex.exec(number);
    if (match) {
      match.shift();
      number = match.join('-');
    }
    return number;
  };
  const convertBirthDate = birthDate => {
    return moment(birthDate).isValid()
      ? moment(birthDate)
          .add(543, 'year')
          .format('DD/MM/YYYY')
      : '-';
  };
  const convertCidFormat = cId => {
    let regex = /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/;
    var match = regex.exec(cId);
    if (match) {
      match.shift();
      cId = match.join('-');
    }
    return cId;
  };
  const updateInfo = async (data, { resetForm }) => {
    let pass = false;
    if (moment().diff(moment(data.birthDate), 'years') < 1) {
      setDateValidate('ปีเกิดควรน้อยกว่าปีปัจจุบัน 1 ปี');
    } else {
      pass = true;
    }

    const newDataInfo = {
      firstname: data.firstName,
      lastname: data.lastName,
      cId: data.cId.replaceAll('-', ''),
      birthDate: data.birthDate,
      gender: data.genderValue,
      mobileNumber: data.mobileNumber.replaceAll('-', ''),
    };
    if (pass) {
      onUpdateUserInfo(newDataInfo, pass);
    }
  };

  const handleSubmitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const handleSubmitFormAnddress = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const updateAdressInfo = (dataAddress, dataProvince) => {
    let pass = false;
    const newAdress = {
      no: dataAddress.no,
      village: dataAddress.village,
      soi: dataAddress.soi,
      road: dataAddress.road,
      district: dataProvince.district,
      subDistrict: dataProvince.subDistrict,
      postalCode: newPostalCode ? newPostalCode : dataProvince?.postalCode,
      province: dataProvince.province,
    };
    if (dataAddress && dataProvince) {
      pass = true;
    }
    onUpdateAddressInfo(newAdress, pass);
  };
  const onUpdateUserInfo = (dataObj, pass) => {
    if (pass) {
      dispatch(
        UserActions.getUpdateInfo({
          data: dataObj,
          id: userInfo.id,
          callback: response => {
            if (response.success) {
              setSuccessModal(true);
            } else {
              setFailModal(true);
            }
          },
        }),
      );
    }
  };

  const onUpdateAddressInfo = (addressInfo, pass) => {
    if (pass) {
      dispatch(
        UserActions.getUpdateAddressInfo({
          data: addressInfo,
          id: userInfo.id,
          addressId:
            Array.isArray(userInfo.addresses) && userInfo.addresses.length > 0
              ? userInfo.addresses[0].id
              : null,
          callback: response => {
            if (response.success) {
              setSuccessModal(true);
            } else {
              setFailModal(true);
            }
          },
        }),
      );
    }
  };
  const ChevronRight = ({ height }) => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 5,
          top: height,
        }}
      >
        <Icon name="chevron-right" color={theme.colors.grey4} size={30} />
      </View>
    );
  };
  return {
    data: {
      user,
      auth,
    },
    dateWheelRef,
    updateInfo,
    setSuccessModal,
    setFailModal,
    convertBirthDate,
    convertCidFormat,
    setComplicanceModal,
    setTypeEditAble,
    Formik,
    useTheme,
    useFormikContext,
    handleSubmitForm,
    setShowBirthDate,
    setDateValidate,
    ChevronRight,
    handleSubmitFormAnddress,
    setUserAddress,
    setUserProvince,
    updateAdressInfo,
    setCheckAddressSave,
    setNewPostalCode,
    convertPhoneNumberFormat,
    newPostalCode,
    userInfo,
    userAddress,
    userProvince,
    failModal,
    successModal,
    showBirthDate,
    validationSchemaUserInfo,
    complicanceModal,
    typeEditAble,
    Icon,
    theme,
    formRef,
    dateValidate,
    checkAddressSave,
    Gender,
    selectGender,
  };
};

export { useHooks };
