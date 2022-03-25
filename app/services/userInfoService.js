import { UserInfoAPI, UserAPI } from '@api';
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';

export async function getOrganizations({ userId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getOrganizations({ userId });
      resolve(response);
    } catch (e) {
      console.log('Error retrieving organizations data', e);
      reject({ err: e.response });
    }
  });
}

export async function getHistoryAppointmentData({ userInfoId, count = 20 }) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('userInfoId', userInfoId);
      console.log('count', count);

      const response = await UserInfoAPI.getHistoryAppointmentData({
        userInfoId,
        count,
      });

      console.log('response////', response);

      resolve(response);
    } catch (e) {
      console.log('Error retrieving history appointment data', e);
      reject({ err: e.response });
    }
  });
}

export async function getAppointmentData({ userInfoId, page = 1 }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserInfoAPI.getAppointmentData({
        userInfoId,
        page,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving history appointment data', e);
      reject({ err: e.response });
    }
  });
}

export async function getDrugDetailbyUserId({ userInfoId, page }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserInfoAPI.getDrugdetailFromHie({
        userInfoId,
        page,
      });
      resolve(response);
      resolve();
    } catch (e) {
      console.log('Error get drug detail appointment data', e);
      reject({ err: e.response });
    }
  });
}

export const uploadProfileImage = async (image, userInfo) => {
  console.log(userInfo);
  let uri = image.uri;
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const ext = uri.split('.').pop();
  const filename1 = `profileId_${userInfo?.id}.${ext}`;
  await storage()
    .ref(`/profile-image/userId${userInfo?.id}/${filename1}`)
    .putFile(uploadUri);
  const imageUpload = await storage()
    .ref(`/profile-image/userId${userInfo?.id}/${filename1}`)
    .getDownloadURL();
  return imageUpload;
};

export async function getMonitoringSummary({ userInfo }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserInfoAPI.getMonitoringSummary({
        userInfo,
      });
      resolve(response);
    } catch (e) {
      console.log('Error get monitoring summary data', e);
      reject({ err: e.response });
    }
  });
}

export async function updateUserInfo(userInfoData, userInfoId) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await UserInfoAPI.updateUserInfo({
        ...(userInfoData ?? {}),
        userInfoId,
      });
      resolve(result);
    } catch (e) {
      console.log('Error update userInfomation', e);
      reject({ err: e.response });
    }
  });
}

export async function updateUserInfoFirstTimeThirdParty(userInfos, credential) {
  return new Promise(async (resolve, reject) => {
    try {
      if (credential.provider === 'line') resolve(userInfos);
      if (
        !userInfos.firstname ||
        !userInfos.lastname ||
        (!userInfos.img && credential.profile?.photo)
      ) {
        const response = await UserInfoAPI.updateUserInfo({
          firstname:
            credential.provider === 'facebook'
              ? credential.profile?.first_name
              : credential.profile?.givenName,
          lastname:
            credential.provider === 'facebook'
              ? credential.profile?.last_name
              : credential.profile?.familyName,
          img: credential.profile?.photo,
          userInfoId: userInfos.id,
        });
        resolve(response);
      } else {
        resolve(userInfos);
      }
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export async function createAddress(addressInfo, userInfoId) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await UserInfoAPI.createAddress({
        ...(addressInfo ?? {}),
        userInfoId,
      });
      resolve(result);
    } catch (e) {
      console.log('Error create address', e);
      reject({ err: e.response });
    }
  });
}

export async function editAddress(addressInfo, userInfoId, addressId) {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      /** NOTE Check if doesn't have an addressId create new one.*/
      if (addressId) {
        result = await UserInfoAPI.editAddress({
          ...(addressInfo ?? {}),
          userInfoId,
          addressId,
        });
      } else {
        result = await createAddress(addressInfo, userInfoId);
      }
      resolve(result);
    } catch (e) {
      console.log('Error edit address', e);
      reject({ err: e.response });
    }
  });
}

export async function deleteAddress(userInfoId, addressId) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await UserInfoAPI.deleteAddress({ userInfoId, addressId });
      resolve(result);
    } catch (e) {
      console.log('Error delete address', e);
      reject({ err: e.response });
    }
  });
}
