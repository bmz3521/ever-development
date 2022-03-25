import { takeLatest, put, call } from 'redux-saga/effects';
import { BookingAPI } from '@api';
import { BookingActions } from '@actions';
import { BookingConstants } from '@constants';
import { getBookings as getBookingAPI } from '@services/bookingService';
import { getTreatmentsByUserId as getTreatmentAPI } from '@services/userService';
import { getAccessToken } from 'app/utils/asyncStorage';

function* createBooking({ data }) {
  try {
    const result = yield call(BookingAPI.createMobileBooking, data);
    yield put(BookingActions.createBookingSuccess(result));
  } catch (e) {
    yield put(BookingActions.createBookingFailure(e));
  }
}

function* getBookings({ userId }) {
  try {
    const result = yield call(getBookingAPI, { userId });
    yield put(BookingActions.getBookingSuccess(result));
  } catch (e) {
    console.log('error==', e);
    yield put(BookingActions.getBookingFailure(e));
  }
}

function* getBooking({ data }) {
  try {
    console.log(data);
    const result = yield call(BookingAPI.getMobileBooking, data);
    // const result = yield call(BookingAPI.findById, data);
    yield put(BookingActions.getBookingSuccess(result));
  } catch (e) {
    yield put(BookingActions.getBookingFailure(e));
  }
}

// Individual exports for testing
export default function* watchBookingSaga() {
  // Take Last Action Only
  yield takeLatest(BookingConstants.CREATE_BOOKING_REQUEST, createBooking);
  yield takeLatest(BookingConstants.GET_BOOKING_REQUEST, getBookings);
}
