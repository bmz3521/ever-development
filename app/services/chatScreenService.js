import { Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

const NODE_ENV = process.env.NODE_ENV;

export const handleSendMessage = async (messages, userId, documentRef) => {
  try {
    const docRef = firestore()
      // .collection(`THREADS_${NODE_ENV}`)
      .collection('CHAT')
      .doc(documentRef);
    const text = messages[0].text;
    await Promise.all([
      docRef.collection('MESSAGES').add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: userId,
        },
        read: false,
        delivered: false,
      }),
      docRef.set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true },
      ),
    ]);
  } catch (err) {
    throw new Error('การส่งข้อความผิดพลาด');
  }
};

export const joinChatRoom = async documentRef => {
  try {
    const docRef = firestore()
      // .collection(`THREADS_${NODE_ENV}`)
      .collection('CHAT')
      .doc(documentRef);
    await Promise.all([
      docRef.set({
        name: 'ห้องโทรเวช',
        latestMessage: {
          text: `You have joined the room.`,
          createdAt: new Date().getTime(),
        },
      }),
    ]);
  } catch (err) {
    throw new Error('สร้างการเข้าห้องผิดพลาด');
  }
};

export const uploadImageToFirebase = async (res, userId, documentRef) => {
  const newUri =
    Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri;
  const fileName = `${res.fileName}`;
  const uniNameRef = moment(res.timestamp).unix();
  const storageRef = storage().ref(
    `/chat-file/${documentRef}/${uniNameRef}.${fileName.split('.').pop()}`,
  );
  try {
    await storageRef.putFile(newUri);
    const image = await storageRef.getDownloadURL();
    return Promise.all([
      firestore()
        // .collection(`THREADS_${NODE_ENV}`)
        .collection('CHAT')
        .doc(documentRef)
        .collection('MESSAGES')
        .add({
          image,
          createdAt: new Date().getTime(),
          user: {
            _id: userId,
          },
          read: false,
          delivered: false,
        }),
      firestore()
        // .collection(`THREADS_${NODE_ENV}`)
        .collection('CHAT')
        .doc(documentRef)
        .set(
          {
            latestMessage: {
              image,
              createdAt: new Date().getTime(),
            },
          },
          { merge: true },
        ),
    ]);
  } catch (err) {
    console.log('err ======', err);
    throw new Error('การอัพโหลดผิดพลาด');
  }
};

export const uploadFileToFirebase = async (res, userId, documentRef) => {
  const newUri =
    Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri;
  const uniNameRef = moment(res.timestamp).unix();
  const isImage =
    res.name.endsWith('jpg') || res.name.endsWith('png') ? true : false;
  const storageRef = storage().ref(
    `/chat-file/${documentRef}/${uniNameRef}_${res.name}`,
  );
  try {
    const resBlob = await fetch(newUri);
    const BLOB = await resBlob.blob();
    await storageRef.put(BLOB);
    const file = await storageRef.getDownloadURL();
    const text = res.name;
    return Promise.all([
      firestore()
        // .collection(`THREADS_${NODE_ENV}`)
        .collection('CHAT')
        .doc(documentRef)
        .collection('MESSAGES')
        .add(
          isImage
            ? {
                image: file,
                text,
                createdAt: new Date().getTime(),
                user: {
                  _id: userId,
                },
                read: false,
                delivered: false,
              }
            : {
                file,
                text,
                createdAt: new Date().getTime(),
                user: {
                  _id: userId,
                },
                read: false,
                delivered: false,
              },
        ),
      firestore()
        // .collection(`THREADS_${NODE_ENV}`)
        .collection('CHAT')
        .doc(documentRef)
        .set(
          {
            latestMessage: {
              file,
              text,
              createdAt: new Date().getTime(),
            },
          },
          { merge: true },
        ),
    ]);
  } catch (err) {
    console.log('err ======', err);
    throw new Error('การอัพโหลดผิดพลาด');
  }
};
