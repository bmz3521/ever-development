import { UserAPI, TreatmentAPI, BookingAPI } from '@api';
import { getAccessToken } from '@utils/asyncStorage';
import storage from '@react-native-firebase/storage';

import RNFetchBlob from 'react-native-fetch-blob';
const { fs, fetch, wrap } = RNFetchBlob;

import _config from '@_config';
import axios from 'axios';
const baseURL = _config.apiUrl;

export function getBookings(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const treatments = await UserAPI.getTreatmentsByUserId(userId);
      const bookingResponse = Promise.all(
        treatments.map(
          async treatment =>
            await TreatmentAPI.getBookingsByTreatmentId({ id: treatment.id }),
        ),
      );

      const bookingData = await Promise.all([bookingResponse]);
      const bookings = bookingData[0]
        .map(item => item)
        .map(item => item)
        .flat();
      const sortedBooking = await bookings.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );

      const covertBooking = await sortedBooking.map(booking => ({
        bookingDay: booking?.admitTime,
        bookingTime: booking?.bookingTime,
        bookingCategory: booking?.bookingCategory,
        createdAt: booking?.createdAt,
        externalBookingId: booking?.externalBookingId,
        bookingId: booking?.id,
        patientId: booking?.patientId,
        practitionerAppUserId: booking?.practitionerAppUserId,
        status: booking?.status,
        treatmentId: booking?.treatmentId,
        updatedAt: booking?.updatedAt,
      }));

      const activeBookings = await covertBooking?.filter(
        item =>
          ![
            'DOCTOR_COMPLETED',
            'PHARMACY_COMPLETED',
            'DOCTOR_DECLINE',
            'PHARMACY_DECLINE',
          ].includes(item.status),
      );
      const completedBookings = await covertBooking?.filter(item =>
        [
          'DOCTOR_COMPLETED',
          'PHARMACY_COMPLETED',
          'DOCTOR_DECLINE',
          'PHARMACY_DECLINE',
        ].includes(item.status),
      );
      resolve({ activeBookings, completedBookings });
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function getBookingById(bookingId) {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await BookingAPI.getBookingById({ bookingId: bookingId });
      resolve(booking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function patchStatus(bookingId) {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await BookingAPI.patchStatus({ bookingId: bookingId });
      resolve(booking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function updateBookingById(bookingId, bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await BookingAPI.updateBookingById({
        bookingId,
        ...bookingData,
      });
      resolve(booking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function updateBookingAddressById(bookingId, locationAddress) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(locationAddress);
      const booking = await BookingAPI.updateBookingAddressById({
        bookingId,
        ...locationAddress,
      });
      resolve(booking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function getBookingsByPracitionerId(practitionerAppUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      const bookings = await BookingAPI.getBookingsByPractitionerId(
        practitionerAppUserId,
      );
      resolve(bookings);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export function createBooking(treatmentData, bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      const treatment = await TreatmentAPI.postTreatment(treatmentData);
      const booking = await TreatmentAPI.postBookingByTreatmentId({
        treatmentId: treatment.id,
        ...bookingData,
      });

      resolve(booking);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function createBookingByTreatmentId(bookingData) {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await TreatmentAPI.postBookingByTreatmentId({
        ...bookingData,
      });

      resolve(booking);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export async function uploadFileBooking(res) {
  try {
    const { userId } = await getAccessToken();
    const newUri =
      Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri;
    const imageRef = `/bookingfile/patientId${userId}/${Date.now()}.${res.fileName
      .split('.')
      .pop()}`;
    const storageRef = storage().ref(imageRef);
    await storageRef.putFile(newUri);
    const imageUrl = await storageRef.getDownloadURL();
    return imageUrl;
  } catch (err) {
    console.log('error', err);
    throw 'การอัพโหลดไฟล์ผิดพลาด';
  }
}

export async function deleteFileBooking(imageUrl) {
  try {
    const ref = storage().refFromURL(imageUrl);
    const result = await ref.delete();
    return result;
  } catch (err) {
    console.log('error', err);
    throw new Error('การลบไฟล์ผิดพลาด');
  }
}

export async function getActiveBookings(page, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getBookings({
        page,
        userId,
        filter: {
          order: 'updatedAt DESC',
          where: {
            or: [
              { status: 'DOCTOR_PENDING' },
              { status: 'DOCTOR_CONFIRM' },
              { status: 'DOCTOR_PENDING_NOTE' },
              { status: 'PHARMACY_PENDING' },
              { status: 'PHARMACY_CONFIRM' },
              { status: 'PHARMACY_PENDING_NOTE' },
              { status: 'CLINIC_PENDING' },
              { status: 'PATIENT_FINISH_FORM_SUBMISSION' },
              { status: 'CLINIC_CONFIRM' },
              { status: 'CLINIC_CONFIRM_ADMIT' },
              { status: 'COMMUNITY_PHARMACIST_PENDING' },
              { status: 'COMMUNITY_PHARMACIST_CONFIRM' },
              { status: 'COMMUNITY_PHARMACIST_PENDING_NOTE' },
            ],
          },
        },
      });

      const covertBooking = await response.data.map(booking => ({
        bookingDay: booking?.admitTime,
        bookingTime: booking?.bookingTime,
        bookingCategory: booking?.bookingCategory,
        createdAt: booking?.createdAt,
        externalBookingId: booking?.externalBookingId,
        bookingId: booking?.id,
        patientId: booking?.patientId,
        practitionerAppUserId: booking?.practitionerAppUserId,
        status: booking?.status,
        treatmentId: booking?.treatmentId,
        updatedAt: booking?.updatedAt,
      }));

      resolve(covertBooking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

export async function getCompletedBookings(page, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getBookings({
        page,
        userId,
        filter: {
          order: 'updatedAt DESC',
          where: {
            or: [
              { status: 'DOCTOR_COMPLETED' },
              { status: 'DOCTOR_DECLINE' },
              { status: 'PHARMACY_COMPLETED' },
              { status: 'PHARMACY_DECLINE' },
              { status: 'CLINIC_COMPLETED' },
              { status: 'CLINIC_DECLINE' },
              { status: 'COMMUNITY_PHARMACIST_COMPLETED' },
              { status: 'COMMUNITY_PHARMACIST_DECLINED' },
            ],
          },
        },
      });

      const covertBooking = await response.data.map(booking => ({
        bookingDay: booking?.admitTime,
        bookingTime: booking?.bookingTime,
        bookingCategory: booking?.bookingCategory,
        createdAt: booking?.createdAt,
        externalBookingId: booking?.externalBookingId,
        bookingId: booking?.id,
        patientId: booking?.patientId,
        practitionerAppUserId: booking?.practitionerAppUserId,
        status: booking?.status,
        treatmentId: booking?.treatmentId,
        updatedAt: booking?.updatedAt,
      }));

      resolve(covertBooking);
    } catch (e) {
      reject({ err: e });
    }
  });
}

// use this only in OMA flow
export function setBookingFinishQuotationFinishFormSubmission(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const treatment = await TreatmentAPI.postTreatment(data.treatment);
      const result = await TreatmentAPI.postBookingByTreatmentId({
        treatmentId: treatment.id,
        ...data.quotation,
        ...data,
      });

      const { DocumentDir } = RNFetchBlob.fs.dirs;
      const path = DocumentDir + '/inquiry.txt';

      await RNFetchBlob.fs.writeFile(
        path,
        JSON.stringify(data.inquiry),
        'utf8',
      );

      const token = await getAccessToken();

      await RNFetchBlob.fetch(
        'POST',
        `${baseURL}/Bookings/${result.id}/inquiry`,
        {
          Authorization: `Bearer ${token.id}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'data',
            filename: 'inquiry.txt',
            data: RNFetchBlob.wrap(path),
          },
        ],
      );

      await BookingAPI.finishQuotation({ id: result.id });

      const dataForm = {
        firstname: {
          value:
            (data.inquiry.firstName
              ? data.inquiry.firstName
              : data.userInfo.firstname) || '',
          name: 'Firstname',
        },
        lastname: {
          value:
            (data.inquiry.lastName
              ? data.inquiry.lastName
              : data.userInfo.lastname) || '',
          name: 'Lastname',
        },
        email: { value: data.inquiry.email || '' },
        gender: { value: '', name: 'Gender' },
        birthdate: { value: '', name: 'Birthdate' },
        country: { value: '', name: 'Country' },
        phone: { value: data.inquiry.phoneNo || '', name: 'Phone Number' },
        weight: { value: '', name: 'Weight' },
        height: { value: '', name: 'Height' },
        formCompletion: 'true',
      };

      const dataToSubmit = { ...dataForm, id: result.id };

      const formInfo = {
        name: `${
          data.inquiry.firstName
            ? data.inquiry.firstName
            : data.userInfo.firstname || ''
        } ${
          data.inquiry.lastName
            ? data.inquiry.lastName
            : data.userInfo.lastname || ''
        }`,
        firstname:
          (data.inquiry.firstName
            ? data.inquiry.firstName
            : data.userInfo.firstname) || '',
        lastname:
          (data.inquiry.lastName
            ? data.inquiry.lastName
            : data.userInfo.lastname) || '',
        email: data.inquiry.email || '',
        gender: '',
        birthdate: '',
        country: '',
        phone: data.inquiry.phoneNo || '',
        weight: '',
        height: '',
      };

      result.formInfo = formInfo;

      await BookingAPI.finishFormSubmission(dataToSubmit);

      resolve(result);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
