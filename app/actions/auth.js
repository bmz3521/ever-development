import { AuthConstants } from '@constants';

/* Register */
export function register({
  data,
  infoData,
  addressData,
  kycData,
  referral,
  language,
  orgId,
}) {
  return {
    type: AuthConstants.REGISTER_REQUEST,
    data,
    infoData,
    addressData,
    kycData,
    referral,
    language,
    orgId,
  };
}
export function registerSuccess(result) {
  return {
    type: AuthConstants.REGISTER_SUCCESS,
    data: result,
  };
}

export function registerFailure(error) {
  return {
    type: AuthConstants.REGISTER_FAILURE,
    error,
  };
}

/* Login */
export function login(credential) {
  return {
    type: AuthConstants.LOGIN_REQUEST,
    credential,
  };
}

export function loginSuccess() {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
  };
}

export function loginFailure(error) {
  return {
    type: AuthConstants.LOGIN_FAILURE,
    error,
  };
}

export function loginWithThirdParty(credential) {
  return {
    type: AuthConstants.LOGIN_THIRD_PARTY_REQUEST,
    credential,
  };
}

export function loginWithThirdPartySuccess(data) {
  return {
    type: AuthConstants.LOGIN_THIRD_PARTY_SUCCESS,
    data,
  };
}

export function loginWithThirdPartyFailure(error) {
  return {
    type: AuthConstants.LOGIN_THIRD_PARTY_FAILURE,
    error,
  };
}

export function updateInfoForThirdParty({
  infoData,
  addressData,
  kycData,
  referral,
  language,
  orgId,
}) {
  return {
    type: AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_REQUEST,
    infoData,
    addressData,
    kycData,
    referral,
    language,
    orgId,
  };
}

export function updateInfoForThirdPartySuccess(data) {
  return {
    type: AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_SUCCESS,
    data,
  };
}

export function updateInfoForThirdPartyFailure(error) {
  return {
    type: AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_FAILURE,
    error,
  };
}

/* Logout */
export function logout({ callback, fcmToken, provider }) {
  return {
    type: AuthConstants.LOGOUT_REQUEST,
    callback,
    fcmToken,
    provider,
  };
}
export function logoutFailure(error) {
  return {
    type: AuthConstants.LOGOUT_FAILURE,
    error,
  };
}
export function logoutSuccess() {
  return {
    type: AuthConstants.LOGOUT_SUCCESS,
  };
}

export function resetRegisData() {
  return {
    type: AuthConstants.RESET_REGISTER_DATA,
  };
}

export function setInfoForm(data) {
  return {
    data,
    type: AuthConstants.SEND_INFO_FORM,
  };
}

export function clearInfoForm() {
  return {
    type: AuthConstants.CLEAR_INFO_FORM,
  };
}
