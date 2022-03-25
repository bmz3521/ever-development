import { call, put, takeEvery } from 'redux-saga/effects';
import { MonitoringActions } from '@actions';
import { MonitoringConstants } from '@constants';

import { getMonitoringData as getAPI } from '@services/monitoringService';
import { getMonitoringSummary as getSummaryAPI } from '@services/userInfoService';

// Saga functions

function* getMonitoring({ userId, typeId, page }) {
  try {
    const payload = yield call(getAPI, { userId, typeId, page });
    yield put(MonitoringActions.getMonitoringSuccess({ payload, typeId }));
  } catch (e) {
    yield put(MonitoringActions.getMonitoringFailure(e.response));
  }
}

function* getSummary({ userInfo }) {
  try {
    const summary = yield call(getSummaryAPI, { userInfo });
    yield put(MonitoringActions.getSummarySuccess(summary));
  } catch (e) {
    yield put(MonitoringActions.getSummaryFailure(e.response));
  }
}

export default function* watchMonitoringSaga() {
  yield takeEvery(MonitoringConstants.GET_MONITORING_REQUEST, getMonitoring);
  yield takeEvery(MonitoringConstants.GET_SUMMARY_REQUEST, getSummary);
}
