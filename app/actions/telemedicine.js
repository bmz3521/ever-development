import { TelemedicineConstants } from '@constants';

export function setTelemedicine(data) {
  return {
    type: TelemedicineConstants.SET_TELEMEDICINE,
    data,
  };
}

export function getTeleData() {
  return {
    type: TelemedicineConstants.GET_TELEMEDICINE_REQUEST,
  };
}

export function getTeleDataSuccess() {
  return {
    type: TelemedicineConstants.GET_TELEMEDICINE_SUCCESS,
  };
}

export function getTeleDataFailure(error) {
  return {
    type: TelemedicineConstants.GET_TELEMEDICINE_FAILURE,
    error,
  };
}

export function saveTeleData(payload) {
  return {
    type: TelemedicineConstants.SAVE_TELEMEDICINE_REQUEST,
    payload,
  };
}

export function saveTeleDataSuccess(payload) {
  return {
    type: TelemedicineConstants.SAVE_TELEMEDICINE_SUCCESS,
    payload,
  };
}

export function saveTeleDataFailure(error) {
  return {
    type: TelemedicineConstants.SAVE_TELEMEDICINE_FAILURE,
    error,
  };
}

export function clear() {
  return {
    type: TelemedicineConstants.CLEAR_TELEMEDICINE_REQUEST,
  };
}

export function clearSuccess() {
  return {
    type: TelemedicineConstants.CLEAR_TELEMEDICINE_SUCCESS,
  };
}
