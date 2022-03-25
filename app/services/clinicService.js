import { ClinicAPI } from '@api';

export async function getClinics(page) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ClinicAPI.getClinic({
        page,
        filter: {
          include: [
            'Accreditations',
            'Amenities',
            'Doctors',
            'ClinicPackages',
            'ClinicPhotos',
            'ClinicReviews',
            'Procedures',
          ],
        },
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving clinics data', e);
      reject({ err: e.response });
    }
  });
}

export async function getClinicsById(clinicId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ClinicAPI.getClinicById({
        clinicId,
        filter: {
          include: [
            'Accreditations',
            'Amenities',
            'Doctors',
            'ClinicPackages',
            'ClinicPhotos',
            'ClinicReviews',
            'Procedures',
          ],
        },
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving clinics data', e);
      reject({ err: e.response });
    }
  });
}
