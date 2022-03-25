import {
  DoctorAvailableTimeAPI,
  PractitionerTypeAPI,
  PractitionerAPI,
} from '@api';

export async function getPractitionerTypes() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await PractitionerTypeAPI.getPractitionerTypes();

      resolve(response);
    } catch (e) {
      console.log('Error retrieving practitioners data', e);
      reject({ err: e.response });
    }
  });
}

export async function getPractitioners(specialtyId, page) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await PractitionerAPI.getPractitioners({
        specialtyId,
        page,
      });
      resolve(response);
    } catch (e) {
      console.log('Error retrieving practitioners data', e);
      reject({ err: e.response });
    }
  });
}

export async function getEverPractitioners(specialtyId, page) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await PractitionerAPI.getEverPractitioners({
        specialtyId,
        page,
      });
      // console.log('response ====>',response);
      resolve(response);
    } catch (e) {
      console.log('Error retrieving Ever practitioners data', e);
      reject({ err: e.response });
    }
  });
}

export async function getPractitionerDetailByUserId(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await PractitionerAPI.getPractitionerDetail({ id });
      resolve(response);
    } catch (e) {
      console.log('Error retrieving practitioners data', e);
      reject({ err: e.response });
    }
  });
}

export async function getPractitionerAvailableTime(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await PractitionerAPI.getTimeSlot(id);
      resolve(response);
    } catch (e) {
      console.log('Error retrieving practitioners available time data', e);
      reject({ err: e.response });
    }
  });
}
