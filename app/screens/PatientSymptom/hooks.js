import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { uploadFileBooking, deleteFileBooking } from '@services/bookingService';
import { ImagePickerManager } from '@utils/imagePickerManager';
import { getMedicationForOrgs } from '@services/symptomGroupService';

import moment from 'moment';

export const useHooks = props => {
  const { navigation, route } = props;

  const {
    bookingData,
    bookingCategory,
    bookingType,
    symptomGroupId = null,
    price = null,
    title = null,
    subtitle = null,
    illustration = null,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [note, setNote] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const uploadImage = async type => {
    try {
      setLoading(true);
      const res = await ImagePickerManager(type, {
        mediaType: 'photo',
        quality: 0.4,
        saveToPhotos: false,
      });
      if (res) {
        const uploadRes = await uploadFileBooking(res);
        setImageUrl(uploadRes);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('อัพโหลดล้มเหลว', e, [
        {
          text: 'ตกลง',
        },
      ]);
    }
    setLoading(false);
  };

  const deleteImage = async () => {
    try {
      setLoading(true);
      await deleteFileBooking(imageUrl);
      setImageUrl('');
    } catch (e) {
      setLoading(false);
      Alert.alert(e);
    }
    setLoading(false);
  };

  const fetchPrescription = async () => {
    setLoading(true);
    try {
      const prescriptions = await getMedicationForOrgs(symptomGroupId);
      setPrescriptions(prescriptions);
    } catch (err) {
      console.log('err get prescription list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symptomGroupId) {
      fetchPrescription();
    }
  }, [symptomGroupId]);

  const submit = async () => {
    let stackName;
    let stackScreen;
    let bookingData;
    let additionalParams;

    // let pharmacyObject;
    // let bookingObj;

    switch (bookingType) {
      case 'Telepharmacy':
        stackName = 'MainStack';
        stackScreen = 'PaymentOrder';

        bookingData = {
          productableType: 'Telemedicine',
          bookingCategory: 'general',
          bookingType: 'Telepharmacy',
          status: `COMMUNITY_PHARMACIST_PENDING`,
          bookingTypeId: 0,
          prescription: prescriptions,
          symptom: { imageUrl, note },
        };

        additionalParams = {
          bookingData: bookingData,
          bookingCategory: 'general',
          bookingType: 'Telepharmacy',
        };

        break;
      default:
        //DOCTOR
        stackName = 'MainStack';
        stackScreen = 'PaymentOrder';

        bookingData = {
          bookingCategory: `general`,
          status: `DOCTOR_PENDING`,
          productableType: 'Telemedicine',
          bookingTypeId: 0,
          symptom: { imageUrl, note },
        };

        additionalParams = {
          price,
          title,
          subtitle,
          illustration,
          bookingData: bookingData,
        };
        break;
    }

    navigation.navigate(stackName, {
      screen: stackScreen,
      params: {
        bookingCategory,
        ...additionalParams,
      },
    });
  };

  const onLoongPress = () => {
    Alert.alert('ต้องการลบภาพใช่หรือไม่?', '', [
      {
        text: 'ลบ',
        onPress: deleteImage,
        style: 'destructive',
      },
      { text: 'ยกเลิก' },
    ]);
  };

  return {
    loading,
    imageUrl,
    note,
    actions: {
      uploadImage,
      submit,
      setNote,
      onLoongPress,
    },
  };
};
