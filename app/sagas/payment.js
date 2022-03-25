import { call, put, takeLatest } from 'redux-saga/effects';
// import { UserAPI } from '@api';
import { PaymentActions } from '@actions';
import { PaymentConstants } from '@constants';

function* saveCustomerInfo({ data, selectType, customerId, callback }) {
  try {
    yield put(() => data);
    yield put(() => selectType);
    yield put(() => customerId);
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

// Individual exports for testing
export default function* watchPayment() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(PaymentConstants.SAVE_PAYMENT_CREDIT_CARD, saveCustomerInfo);
}
