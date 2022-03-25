import { ClinicConstants } from '@constants';

export function getClinic() {
  return {
    type: ClinicConstants.GET_CLINIC_REQUEST,
  };
}

export function getClinicSuccess(payload) {
  return {
    type: ClinicConstants.GET_CLINIC_SUCCESS,
    payload,
  };
}

export function getClinicFailure(error) {
  return {
    type: ClinicConstants.GET_CLINIC_FAILURE,
    error,
  };
}

export function clear(callback) {
  return {
    type: ClinicConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: ClinicConstants.CLEAR_SUCCESS,
  };
}
