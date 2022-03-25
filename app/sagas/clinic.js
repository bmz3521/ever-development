import { call, put, takeLatest } from 'redux-saga/effects';
import { ClinicActions } from '@actions';
import { ClinicConstants } from '@constants';

import { getClinics } from '@services/clinicService';

// Saga functions

function* getClinic() {
  try {
    const payload = yield call(getClinics);

    yield put(ClinicActions.getClinicSuccess(payload));
  } catch (e) {
    console.log('e....');
    console.log(e.response);

    yield put(ClinicActions.getClinicFailure(e.response));
  }
}

export default function* watchClinicSaga() {
  yield takeLatest(ClinicConstants.GET_CLINIC_REQUEST, getClinic);
}
