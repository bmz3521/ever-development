import { call, put, takeLatest } from 'redux-saga/effects';
import { TelemedicineActions } from '@actions';
import { TelemedicineConstants } from '@constants';

function* getTeleData() {
  try {
    yield put(TelemedicineActions.getTeleDataSuccess());
  } catch (e) {
    yield put(TelemedicineActions.getTeleDataFailure('Cannot get tele data'));
  }
}

function* saveTeleData(payload) {
  try {
    yield put(TelemedicineActions.saveTeleDataSuccess(payload));
  } catch (e) {
    yield put(TelemedicineActions.saveTeleDataFailure('Cannot save tele data'));
  }
}

function* clearTeleData() {
  try {
    yield put(TelemedicineActions.clearSuccess());
  } catch (e) {
    yield put(
      TelemedicineActions.saveTeleDataFailure('Cannot clear tele data'),
    );
  }
}

export default function* watchMonitoringSaga() {
  yield takeLatest(TelemedicineConstants.GET_TELEMEDICINE_REQUEST, getTeleData);
  yield takeLatest(
    TelemedicineConstants.SAVE_TELEMEDICINE_REQUEST,
    saveTeleData,
  );
  yield takeLatest(
    TelemedicineConstants.CLEAR_TELEMEDICINE_REQUEST,
    clearTeleData,
  );
}
