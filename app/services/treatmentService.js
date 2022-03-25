import { UserAPI } from '@api';

export function getCovidTreatments(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const treatments = await UserAPI.getCovidTreatments({ userId: userId });
      resolve(treatments);
    } catch (e) {
      reject({ err: e });
    }
  });
}
