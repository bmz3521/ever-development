import { getAccessToken, getFcmToken } from '@utils/asyncStorage';
import { UserAPI } from '@api';

export const fcmHandleLogin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const findRes = await createFCMToken();
      resolve(findRes);
    } catch (e) {
      reject({ err: e.response });
    }
  });
};

/** NOTE Create FCM token when register */

export const fcmHandleRegsiter = () => {
  new Promise(async (resolve, reject) => {
    try {
      const createRes = await createFCMToken();
      resolve(createRes);
    } catch (e) {
      reject({ err: e.response });
    }
  });
};

/** NOTE get create and update FCM funcs */

const getFCMTokenFromAPI = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = await getAccessToken();
      const response = await UserAPI.getFCMToken({ userId });
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
};

const createFCMToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = await getAccessToken();
      const fcmToken = await getFcmToken();
      const response = await UserAPI.createFCMToken({ userId, fcmToken });
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
};

export const createFCMTokenManually = fcmToken => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = await getAccessToken();
      if (userId) {
        const listRes = await getFCMTokenFromAPI();
        if (listRes.findIndex(e => e.fcmToken === fcmToken) != -1) {
          resolve('Already have fcm token');
        } else {
          const response = await UserAPI.createFCMToken({ userId, fcmToken });
          resolve(response);
        }
      } else {
        resolve('Undefined userId');
      }
    } catch (e) {
      console.log('e.response ', e.response);
      reject({ err: e.response });
    }
  });
};
