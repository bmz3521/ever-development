import { useState } from 'react';
import { Alert } from 'react-native';
import { uploadFileBooking, deleteFileBooking } from '@services/bookingService';
import { ImagePickerManager } from '@utils/imagePickerManager';

export const useHooks = props => {
  const { navigation, route } = props;
  const { bookingData, practitioner } = route.params;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [note, setNote] = useState('');

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

  const submit = async () => {
    navigation.navigate('MainStack', {
      screen: 'PaymentOrder',
      params: {
        bookingCategory: bookingData.bookingCategory,
        bookingData,
        practitioner,
        imageUrl,
        note,
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
    practitioner,
    bookingData,
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
