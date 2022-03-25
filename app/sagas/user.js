import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserActions } from '@actions';
import { UserConstants } from '@constants';
import {
  getOrganizations,
  updateUserInfo,
  editAddress,
} from '@services/userInfoService';
import {
  updateUserSetting as updateSettingAPI,
  getUserSetting as getSettingAPI,
} from '@services/appUserService';

function* getUpdateInfo({ data, id, callback }) {
  try {
    const payload = yield call(updateUserInfo, data, id);
    yield put(UserActions.getUserSuccess(payload));
    if (typeof callback === 'function') {
      yield call(callback, { success: true });
    }
  } catch (e) {
    console.log('error getUpdateInfo', e);
    if (typeof callback === 'function') {
      yield call(callback, { success: false });
    }
  }
}

function* getUpdateAddressesInfo({ data, id, addressId, callback }) {
  try {
    const payload = yield call(editAddress, data, id, addressId);
    yield put(UserActions.getUpdateAddressInfoSuccess(payload));
    if (typeof callback === 'function') {
      yield call(callback, { success: true });
    }
  } catch (e) {
    console.log('error getUpdateInfo', e);
    if (typeof callback === 'function') {
      yield call(callback, { success: false });
    }
  }
}

function* updateOrganizaitonUserInfo({ userId }) {
  try {
    const getOrg = yield call(getOrganizations, { userId });
    yield put({
      type: UserConstants.UPDATE_USER_ORG_SUCCESS,
      data: getOrg,
    });
  } catch (e) {
    yield put({
      type: UserConstants.UPDATE_USER_ORG_FAILURE,
      error: e.message,
    });
  }
}

function* updateUserSetting({ payload }) {
  try {
    const response = yield call(updateSettingAPI, payload);
    yield put({
      type: UserConstants.UPDATE_USER_SETTING_SUCCESS,
      data: response,
    });
  } catch (e) {
    yield put({
      type: UserConstants.UPDATE_USER_SETTING_FAILURE,
    });
  }
}

function* getuserSetting(userId) {
  try {
    const response = yield call(getSettingAPI, { userId });
    yield put({
      type: UserConstants.UPDATE_USER_SETTING_SUCCESS,
      data: response,
    });
  } catch (e) {
    yield put({
      type: UserConstants.UPDATE_USER_SETTING_FAILURE,
    });
  }
}

// Individual exports for testing
export default function* watchUserInfoSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(UserConstants.GET_UPDATE_INFO_REQUEST, getUpdateInfo);
  yield takeLatest(
    UserConstants.GET_UPDATE_ADDRESS_INFO_REQUEST,
    getUpdateAddressesInfo,
  );
  yield takeEvery(
    UserConstants.UPDATE_USER_ORG_REQUEST,
    updateOrganizaitonUserInfo,
  );
  yield takeEvery(UserConstants.UPDATE_USER_SETTING_REQUEST, updateUserSetting);
  yield takeLatest(UserConstants.GET_USER_SETTING_REQUEST, getuserSetting);
}
