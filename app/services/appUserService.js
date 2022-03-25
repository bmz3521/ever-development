import { UserAPI } from '@api';

export function updateUserSetting(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const reponse = await UserAPI.updateSetting(payload);
      resolve(reponse);
    } catch (e) {
      reject({ error: e.response });
    }
  });
}

export function getUserSetting(appUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      const reponse = await UserAPI.getUserSetting({ appUserId });
      resolve(reponse);
    } catch (e) {
      reject({ error: e.response });
    }
  });
}
