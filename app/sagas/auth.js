import { call, put, takeLatest } from 'redux-saga/effects';
import Intercom from '@intercom/intercom-react-native';
import {
  AuthActions,
  BookingActions,
  UserActions,
  MonitoringActions,
  HieAppointmentActions,
  TelemedicineActions,
} from '@actions';
import { AuthConstants } from '@constants';
import { updateUserSetting, getUserSetting } from '@services/appUserService';
import {
  login as loginAPI,
  register as RegisterAPI,
  logout as logoutAPI,
  userInfos as userInfosAPI,
  loginWithThirdParty as loginThirdPartyAPI,
  logoutForThirdParty,
} from '@services/authService';
import { fcmHandleLogin, fcmHandleRegsiter } from '@services/fcmService';
import { handleUploadImage } from '@services/uploadKycImgService';
import {
  getOrganizations,
  updateUserInfo,
  createAddress,
  editAddress,
  updateUserInfoFirstTimeThirdParty as updateUserInfoThirdPartyAPI,
} from '@services/userInfoService';
import { referralHandler } from '@services/referralService';
import { createSubmissionOrg } from '@services/submissionService';
import i18next from 'i18next';

function* register({
  data,
  infoData,
  addressData,
  kycData,
  referral,
  language,
  orgId,
}) {
  try {
    yield call(referralHandler, { data, referral });
    const result = yield call(RegisterAPI, data);
    yield call(updateUserInfo, infoData, result.responseUserInfo?.id);
    yield call(createAddress, addressData, result.responseUserInfo?.id);
    yield call(createSubmissionOrg, orgId);
    yield call(updateUserSetting, { appUserId: result.response?.id, language });
    yield call(handleUploadImage, kycData, infoData, result.response?.id);
    yield call(fcmHandleRegsiter);
    yield put(AuthActions.registerSuccess(result.response));
  } catch (e) {
    yield put(AuthActions.registerFailure(e));
  }
}

function* login({ credential }) {
  try {
    const result = yield call(loginAPI, credential);
    const userInfos = yield call(userInfosAPI, result);
    const getOrg = yield call(getOrganizations, result);
    const userSetting = yield call(getUserSetting, result.userId);
    if (userSetting.language && i18next.language !== userSetting.language)
      i18next.changeLanguage(userSetting.language);
    yield call(fcmHandleLogin);
    yield put(
      UserActions.getUserSuccess({
        ...(userInfos ?? {}),
        organizations: getOrg ?? [],
      }),
    );
    yield put(UserActions.updateUserSettingLocal(userSetting ?? {}));
    yield put(AuthActions.loginSuccess());
  } catch (e) {
    yield put(AuthActions.loginFailure(e));
  }
}

function* updateUserInfoForThirdParty({
  infoData,
  addressData,
  kycData,
  referral,
  language,
  orgId,
}) {
  try {
    yield call(referralHandler, { infoData, referral });
    yield call(
      editAddress,
      addressData,
      infoData?.userInfoId,
      infoData?.addressId,
    );
    const result = yield call(updateUserInfo, infoData, infoData?.userInfoId);
    yield call(handleUploadImage, kycData, infoData, infoData?.userId);
    yield call(fcmHandleRegsiter);
    yield call(createSubmissionOrg, orgId);
    yield put(AuthActions.updateInfoForThirdPartySuccess(result));
    yield put(AuthActions.loginWithThirdPartySuccess(true));
    yield put(UserActions.getUserThirdPartySuccess(result));
  } catch (e) {
    yield put(AuthActions.updateInfoForThirdPartyFailure(e));
  }
}

function* loginWithThirdParty({ credential }) {
  try {
    const result = yield call(loginThirdPartyAPI, credential);
    let userInfos = yield call(userInfosAPI, result);

    /** NOTE Set firstname lastname and image for first-time login */
    userInfos = yield call(updateUserInfoThirdPartyAPI, userInfos, credential);

    const getOrg = yield call(getOrganizations, result);
    yield call(fcmHandleLogin);
    yield put(
      UserActions.getUserThirdPartySuccess({
        ...(userInfos ?? {}),
        organizations: getOrg ?? [],
      }),
    );
    yield put(AuthActions.loginWithThirdPartySuccess(credential.provider));
  } catch (e) {
    yield put(AuthActions.loginWithThirdPartyFailure(e));
  }
}

function* logout({ callback, fcmToken, provider }) {
  try {
    yield call(logoutAPI, { fcmToken });
    yield put(AuthActions.logoutSuccess());
    yield put(UserActions.clearSuccess());
    yield put(BookingActions.clearSuccess());
    yield put(MonitoringActions.clearSuccess());
    yield put(HieAppointmentActions.clearSuccess());
    yield put(TelemedicineActions.clearSuccess());
    Intercom.logout();
    /** TODO logout for firebaseAuth */
    if (provider) {
      yield call(logoutForThirdParty, provider);
    }
    if (typeof callback === 'function') {
      yield call(callback, { success: true });
    }
  } catch (e) {
    yield put(AuthActions.logoutFailure(e));
  }
}

// Individual exports for testing
export default function* watchAuthSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(AuthConstants.LOGIN_REQUEST, login);
  yield takeLatest(
    AuthConstants.LOGIN_THIRD_PARTY_REQUEST,
    loginWithThirdParty,
  );
  yield takeLatest(
    AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_REQUEST,
    updateUserInfoForThirdParty,
  );
  yield takeLatest(AuthConstants.REGISTER_REQUEST, register);
  yield takeLatest(AuthConstants.LOGOUT_REQUEST, logout);
}
