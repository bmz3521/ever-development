import { CommunicationAPI } from '@api';

export function getToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const communication = CommunicationAPI.getToken();
      resolve(communication);
    } catch (e) {
      reject({ err: e });
    }
  });
}
