import { UserConstants } from '@constants';

/* GET USER */
export function getUser() {
  return {
    type: UserConstants.GET_USER_REQUEST,
  };
}
export function getUserSuccess(result) {
  return {
    type: UserConstants.GET_USER_SUCCESS,
    result,
  };
}
export function clear(callback) {
  return {
    type: UserConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: UserConstants.CLEAR_SUCCESS,
  };
}

export function setVerifyStatus({ data }) {
  return {
    type: UserConstants.CHANGE_VERIFY_STATUS,
    data,
  };
}

export function getUpdateInfo({ data, id, callback }) {
  return {
    type: UserConstants.GET_UPDATE_INFO_REQUEST,
    data,
    id,
    callback,
  };
}

export function getUpdateAddressInfo({ data, id, addressId, callback }) {
  return {
    type: UserConstants.GET_UPDATE_ADDRESS_INFO_REQUEST,
    data,
    id,
    addressId,
    callback,
  };
}

export function getUpdateAddressInfoSuccess(result) {
  return {
    type: UserConstants.GET_UPDATE_ADDRESS_INFO_SUCCESS,
    result,
  };
}

export function getUpdateUserOrganization(userId) {
  return {
    type: UserConstants.UPDATE_USER_ORG_REQUEST,
    userId,
  };
}

export function getUserSetting(userId) {
  return {
    type: UserConstants.GET_USER_SETTING_REQUEST,
    userId,
  };
}

export function updateUserSettingLocal(data) {
  return {
    type: UserConstants.UPDATE_USER_SETTING_LOCAL,
    data,
  };
}

export function updateUserSetting(payload) {
  return {
    type: UserConstants.UPDATE_USER_SETTING_REQUEST,
    payload,
  };
}

export function getUserThirdPartySuccess(result) {
  return {
    type: UserConstants.GET_USER_THIRD_PARTY_SUCCESS,
    result,
  };
}

export function updateUserVerifyStatus(status) {
  return {
    type: UserConstants.UPDATE_VERIFY_USER,
    status,
  };
}
