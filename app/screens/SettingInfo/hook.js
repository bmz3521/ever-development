import { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from '@actions';
import { checkCIdVerify } from '@utils/alertVerifyUser';
import { uploadProfileImage } from '@services/userInfoService';
import moment from 'moment';
import { ImagePickerManager } from '@utils/imagePickerManager';
import { labelInfo, infoData } from './LabelInfo';
import { useTheme, Icon } from 'react-native-elements';
import i18next from 'i18next';
const Gender = {
  MALE: 'ชาย',
  FEMALE: 'หญิง',
};
const useHooks = () => {
  const imagePickerRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const user = useSelector(state => state.user);
  const userAddress = user?.data?.addresses[0];
  const userInfo = user?.data;
  const convertBirthDate = birthDate => {
    return moment(birthDate).isValid()
      ? moment(birthDate)
          .add(543, 'year')
          .format('DD MMM YYYY')
      : '-';
  };
  useEffect(() => {
    i18next.language === 'th' ? moment.locale('th') : moment.locale('en');
  }, [i18next.language]);
  const convertCidFormat = cId => {
    let regex = /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/;
    // 0-0000-00000-00-0
    var match = regex.exec(cId);
    if (match) {
      match.shift();
      cId = match.join('-');
    }
    return cId;
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

  const pickerImageHandler = async type => {
    setLoading(true);
    try {
      const response = await ImagePickerManager(type, {
        mediaType: 'photo',
        quality: 0.5,
        saveToPhotos: true,
        cameraType: 'front',
      });
      if (response) {
        const uploadURL = await uploadProfileImage(response, user?.data);
        dispatch(
          UserActions.getUpdateInfo({
            data: { img: uploadURL },
            id: user?.data?.id,
            callback: response => {
              if (response.success) {
                setVisibleModal(true);
                setIsSuccessModal(true);
                setLoading(false);
              } else {
                setVisibleModal(true);
                setIsSuccessModal(false);
                setLoading(false);
              }
            },
          }),
        );
      }
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  const titleModal = useMemo(() => {
    return isSuccessModal ? 'เปลี่ยนรูปโปรไฟล์เสร็จสิ้น' : 'เกิดข้อผิดพลาด';
  }, [isSuccessModal]);

  const descriptionModal = useMemo(() => {
    return isSuccessModal
      ? 'ระบบบันทึกข้อมูลของท่านเรียบร้อยแล้ว'
      : 'ระบบบันทึกข้อมูลของท่านไม่สำเร็จ';
  }, [isSuccessModal]);
  const userInfoData = [
    {
      userInfo: !checkCIdVerify(userInfo?.cId)
        ? userInfo.email
        : convertCidFormat(userInfo?.cId) ?? '-',
      isEmail: !checkCIdVerify(userInfo?.cId),
    },
    {
      userInfo: userInfo?.firstname ?? '-',
    },
    {
      userInfo: userInfo?.lastname ?? '-',
    },
    {
      userInfo: convertBirthDate(userInfo?.birthDate) ?? '-',
    },
    {
      userInfo: convertPhoneNumberFormat(userInfo?.mobileNumber) ?? '-',
    },
    {
      userInfo: Gender[userInfo?.gender] ?? '-',
    },
  ];
  const userAddressInfo = [
    {
      userInfo: `${userAddress?.no || ''}, ${userAddress?.road ||
        ''}, ${userAddress?.soi || ''}`,
    },
    {
      userInfo: `${userAddress?.province || ''}, ${userAddress?.postalCode ||
        ''}`,
    },
  ];
  return {
    modal: {
      visibleModal,
      setVisibleModal,
      title: titleModal,
      description: descriptionModal,
      isSuccessModal,
    },
    Icon,
    userInfoData,
    userAddressInfo,
    convertBirthDate,
    convertCidFormat,
    convertPhoneNumberFormat,
    userInfo,
    theme,
    labelInfo,
    infoData,
    Gender,
    userAddress,
    pickerImageHandler,
    loading,
    imagePickerRef,
  };
};

export { useHooks };
