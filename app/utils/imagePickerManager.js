import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export const ImagePickerManager = (type, option) => {
  if (type === 'camera') {
    return new Promise(async (resolve, reject) => {
      if (Platform.OS === 'android') {
        const granted = await requestCameraPermission();
        if (!granted) reject(`Can't open camera`);
      }
      setTimeout(() => {
        launchCamera(option, response => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject(`error: ${response.error}`);
          } else if (response.camera) {
            reject(`error: ${response.camera}`);
          } else if (response.errorCode) {
            reject(`error: ${response.errorCode}`);
          } else {
            const source = response;
            resolve(source);
          }
        });
      }, 400); // NOTE wait 400ms avoid bug in IOS device
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        launchImageLibrary(option, response => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ', response.error);
          } else if (response.camera) {
            reject('User tapped custom button: ', response.camera);
          } else {
            const source = response;
            resolve(source);
          }
        });
      }, 400);
    });
  }
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const LIST_TYPES = [
  DocumentPicker.types.csv,
  DocumentPicker.types.doc,
  DocumentPicker.types.docx,
  DocumentPicker.types.pdf,
  DocumentPicker.types.ppt,
  DocumentPicker.types.pptx,
  DocumentPicker.types.xls,
  DocumentPicker.types.xlsx,
  DocumentPicker.types.zip,
  DocumentPicker.types.plainText,
  DocumentPicker.types.images,
];

export const documentPickerManager = () => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = DocumentPicker.pick({
          type: LIST_TYPES,
          allowMultiSelection: false,
        });
        resolve(res);
      } catch (e) {
        reject('การอัพโหลดไฟล์ผิดพลาด');
      }
    }, 400);
  });
};
