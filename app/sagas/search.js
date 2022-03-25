import { call, put, takeLatest } from 'redux-saga/effects';
import { SearchConstants } from '@constants';

function* saveSearchInfo({
  data,
  selectedCountry,
  selectedProcedure,
  callback,
}) {
  try {
    yield put(() => data);
    yield put(() => selectedCountry);
    yield put(() => selectedProcedure);
    if (typeof callback === 'function') {
      yield call(callback, { success: true });
    }
  } catch (e) {
    console.log('error saveSearchInfo', e);
    if (typeof callback === 'function') {
      yield call(callback, { success: false });
    }
  }
}

// Individual exports for testing
export default function* watchPayment() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SearchConstants.SAVE_SEARCH, saveSearchInfo);
}
