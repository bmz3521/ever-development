import { ClinicPackageAPI } from '@api';

export async function getClinicPackages(page) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ClinicPackageAPI.getClinicPackage({
        page,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving clinic package data', e);
      reject({ err: e.response });
    }
  });
}

export async function getClinicPackageById(clinicPackageId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ClinicPackageAPI.getClinicPackageById({
        clinicPackageId,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving clinics data', e);
      reject({ err: e.response });
    }
  });
}

export async function getClinicPackage(filter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ClinicPackageAPI.getClinicPackages({
        filter: filter,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving ClinicPackages', e);
      reject({ err: e.response });
    }
  });
}
