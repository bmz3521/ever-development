import { call, put, takeLatest } from 'redux-saga/effects';
import { HieAppointmentActions } from '@actions';
import { HieBookingsConstants } from '@constants';

import {
  getAppointmentData as getAppointmentAPI,
  getDrugDetailbyUserId as getDrugDetailAPT,
  getHistoryAppointmentData as getHistoryAPI,
} from '@services/userInfoService';

/** Saga functions */

function* getHistoryAppointment({ userInfoId, page }) {
  try {
    const payload = yield call(getDrugDetailAPT, {
      userInfoId,
      page,
    });
    console.log('payload appointment...');
    console.log(payload);

    yield put(HieAppointmentActions.getHistoryAppointmentSuccess(payload));
  } catch (e) {
    yield put(HieAppointmentActions.getHistoryAppointmentFailure(e));
  }
}

function* getAppointment({ userInfoId, page }) {
  try {
    const payload = yield call(getAppointmentAPI, { userInfoId, page });

    console.log('payload History...');
    console.log(payload);

    yield put(HieAppointmentActions.getAppointmentSuccess(payload));
  } catch (e) {
    yield put(HieAppointmentActions.getAppointmentFailure(e));
  }
}

export default function* watchHieAppointment() {
  yield takeLatest(
    HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_REQUEST,
    getHistoryAppointment,
  );
  yield takeLatest(
    HieBookingsConstants.GET_HIE_APPOINTMENT_REQUEST,
    getAppointment,
  );
}
