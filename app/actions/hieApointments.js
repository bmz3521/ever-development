import { HieBookingsConstants } from '@constants';

export function getAppointment({ userInfoId, page }) {
  return {
    type: HieBookingsConstants.GET_HIE_APPOINTMENT_REQUEST,
    userInfoId,
    page,
  };
}

export function getAppointmentSuccess(payload) {
  return {
    type: HieBookingsConstants.GET_HIE_APPOINTMENT_SUCCESS,
    payload,
  };
}

export function getAppointmentFailure(error) {
  return {
    type: HieBookingsConstants.GET_HIE_APPOINTMENT_FAILURE,
    error,
  };
}

export function getHistoryAppointment({ userInfoId, page }) {
  return {
    type: HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_REQUEST,
    userInfoId,
    page,
  };
}

export function getHistoryAppointmentSuccess(payload) {
  return {
    type: HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_SUCCESS,
    payload,
  };
}

export function getHistoryAppointmentFailure(error) {
  return {
    type: HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_FAILURE,
    error,
  };
}

export function clear(callback) {
  return {
    type: HieBookingsConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: HieBookingsConstants.CLEAR_SUCCESS,
  };
}
