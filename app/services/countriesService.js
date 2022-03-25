import { CountriesAPI } from '@api';

export async function getCountries(filter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await CountriesAPI.getCountries({
        filter: filter,
      });
      
      resolve(response);
    } catch (e) {
      console.log('Error retrieving Countries', e);
      reject({ err: e.response });
    }
  });
}
