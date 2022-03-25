import { call, put, takeLatest } from 'redux-saga/effects';

import { SavelistActions } from '@actions';
import { SavelistConstants } from '@constants';

import {
  createSavelist as createSavelistAPI,
  getSavelist as getSavelistAPI,
  addItemSavelist as addItemSavelistAPI,
  deleteItemSavelist as deleteItemSavelistAPI,
} from '@services/savelistService';

function* getSavelist({ userId, clinicId }) {
  try {
    const result = yield call(getSavelistAPI, { userId, clinicId });
    yield put(SavelistActions.getSavelistSuccess(result));
  } catch (e) {
    yield put(SavelistActions.getSavelistFailure(e.response));
  }
}

function* createSavelist({ userId, name }) {
  try {
    const summary = yield call(createSavelistAPI, { userId, name });
    yield put(SavelistActions.createSavelistSuccess(summary));
  } catch (e) {
    yield put(SavelistActions.createSavelistFailure(e.response));
  }
}

function* addItemSavelist({ savelistId, clinicId }) {
  try {
    const result = yield call(addItemSavelistAPI, { savelistId, clinicId });
    yield put(SavelistActions.addItemSavelistSuccess(result));
  } catch (e) {
    yield put(SavelistActions.addItemSavelistFailure(e.response));
  }
}

function* deleteItemSavelist({ savelistId, clinicId }) {
  try {
    const result = yield call(deleteItemSavelistAPI, { savelistId, clinicId });
    yield put(SavelistActions.deleteItemSavelistSuccess(result));
  } catch (e) {
    yield put(SavelistActions.deleteItemSavelistFailure(e.response));
  }
}

export default function* watchSavelistSaga() {
  // Take Last Action Only
  yield takeLatest(SavelistConstants.CREATE_SAVELIST_REQUEST, createSavelist);
  yield takeLatest(SavelistConstants.GET_SAVELIST_REQUEST, getSavelist);
  yield takeLatest(
    SavelistConstants.ADD_ITEM_SAVELIST_REQUEST,
    addItemSavelist,
  );
  yield takeLatest(
    SavelistConstants.DELETE_ITEM_SAVELIST_REQUEST,
    deleteItemSavelist,
  );
}
