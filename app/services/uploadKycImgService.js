import { Platform } from 'react-native';
import { KycImageAPI, UserAPI } from '@api';
import { setAccessToken } from '@utils/asyncStorage';
import storage from '@react-native-firebase/storage';
const env = process.env.NODE_ENV;

export const handleUploadImage = (
  { photo, photoIdCard },
  registerData,
  userId,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { imageCid, imageUpload } = await uploadKYCImage(
        photo,
        photoIdCard,
        registerData,
      );
      const finalResponse = await uploadImageToPatient(
        userId,
        imageUpload,
        imageCid,
      );
      resolve(finalResponse);
    } catch (e) {
      console.log('error upload Image', e);
      reject(e);
    }
  });
};

export const uploadKYCImage = async (photo, photoIdCard, registerData) => {
  let uri = photo.uri;
  let uriIdCard = photoIdCard.uri;
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  const uploadUriIdCard =
    Platform.OS === 'ios' ? uriIdCard.replace('file://', '') : uriIdCard;

  const ext = uri.split('.').pop(); // Extract image extension
  const ext2 = uriIdCard.split('.').pop(); // Extract image extension

  const name = `${registerData.firstname}-${registerData.lastname}`;
  const filename1 = `${name}-selfie.${ext}-${Date.now()}`; // Generate unique name
  const filename2 = `${name}-card.${ext2}-${Date.now()}`; // Generate unique name
  const reference1 = await storage()
    .ref(`/patient-kyc/${env}/${filename1}`)
    .putFile(uploadUri);
  const reference2 = await storage()
    .ref(`/patient-kyc/${env}/${filename2}`)
    .putFile(uploadUriIdCard);
  const imageUpload = await storage()
    .ref(`/patient-kyc/${env}/${filename1}`)
    .getDownloadURL();
  const imageCid = await storage()
    .ref(`/patient-kyc/${env}/${filename2}`)
    .getDownloadURL();

  return { imageCid, imageUpload };
};

const uploadImageToPatient = async (patientId, image, cIdImage) => {
  const resUpload = await KycImageAPI.uploadKycImages({
    patientId,
    image,
    cIdImage,
  });
  if (resUpload) {
    return resUpload;
  }
};
