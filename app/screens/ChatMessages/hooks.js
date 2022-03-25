import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { getBookingById as GetBookingByIdService } from '@services/bookingService';
import { getPractitionerDetailByUserId } from '@services/practitionerService';
import {
  handleSendMessage,
  joinChatRoom,
  uploadFileToFirebase,
  uploadImageToFirebase,
} from '@services/chatScreenService';
import {
  ImagePickerManager,
  documentPickerManager,
} from '@utils/imagePickerManager';

const useHooks = props => {
  const NODE_ENV = process.env.NODE_ENV;
  const { navigation, bookingId, isRoundRobin, firebaseStatus } = props;
  const [firebaseDocument, setFirebaseDocument] = useState(false);
  const [messages, setMessages] = useState({
    message: [],
    listImage: [],
  });
  const [patientStatus, setPatientStatus] = useState(false);
  const [loadingVisible, setLoading] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});
  const [listOfImage, setListOfImage] = useState([]);
  const user = useSelector(state => state.user);
  const userId = user?.data?.userId;
  useEffect(() => {
    /** NOTE Get pratictionerId  */
    const getpratictionerId = async () => {
      const bookingDetail = await GetBookingByIdService(bookingId);
      if (bookingDetail.practitionerAppUserId) {
        const resPractitioner = await getPractitionerDetailByUserId(
          bookingDetail.practitionerAppUserId,
        );
        if (resPractitioner.length) {
          setDoctorDetail(resPractitioner[0]);
        }
        setFirebaseDocument(
          `patient${userId}officer${bookingDetail.practitionerAppUserId}`,
        );
      }
    };

    /** NOTE Triggers firebase realtime */
    const getFirebaseStatus = () => {
      let ref = isRoundRobin
        ? 'rooms/roundRobin/general/patients/'
        : 'rooms/roundRobin/covid/patients/';
      let name = `patient${userId}`;
      let refName = `${ref}${name}`;
      database()
        .ref(refName)
        .on('value', snapshot => {
          let valueObject = snapshot.val() ? snapshot.val() : {};
          setPatientStatus(valueObject);
        });
    };

    if (bookingId) {
      getpratictionerId();
      // getFirebaseStatus();
    }
    return () => getFirebaseStatus();
  }, [bookingId, firebaseStatus]);

  useEffect(() => {
    let messagesListener;
    if (firebaseDocument) {
      let listImage = [];
      joinChatRoom(firebaseDocument);
      messagesListener = firestore()
        // .collection(`THREADS_${NODE_ENV}`)
        .collection('CHAT')
        .doc(firebaseDocument)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();
            const data = {
              _id: doc.id,
              text: '',
              createdAt: new Date().getTime(),
              ...firebaseData,
            };
            if (firebaseData.image) {
              listImage.push({ url: firebaseData.image });
            }
            if (!firebaseData.system) {
              data.user = {
                avatar:
                  firebaseData.user?._id === userId
                    ? user.data.img
                    : doctorDetail?.photos?.length > 0
                    ? doctorDetail?.photos[0]?.imageUrl
                    : '',
                ...firebaseData.user,
                // name: firebaseData.user.email,
              };
            }
            return data;
          });
          setMessages({
            message: messages,
            listImage: listImage.reverse(),
          });
        });
      // Stop listening for updates whenever the component unmounts
    }
    return () => messagesListener && messagesListener.unsubscribe();
  }, [firebaseDocument]);

  const openFilePicker = async type => {
    try {
      if (type === 'file') {
        setLoading(true);
        const res = await documentPickerManager();
        await uploadFileToFirebase(res[0], userId, firebaseDocument);
        setLoading(false);
      } else {
        const option = {
          mediaType: 'photo',
          quality: 0.4,
          saveToPhotos: false,
        };
        setLoading(true);
        const res = await ImagePickerManager(type, option);
        await uploadImageToFirebase(res, userId, firebaseDocument);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('error upload file', error);
    }
  };

  const handleSend = useCallback(
    async messages => {
      await handleSendMessage(messages, userId, firebaseDocument);
    },
    [userId, firebaseDocument],
  );

  return {
    messages,
    userId,
    actions: {
      openFilePicker,
      handleSend,
    },
    loadingVisible,
  };
};

export { useHooks };
