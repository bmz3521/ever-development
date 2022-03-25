// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
// Imports: Redux Sagas
import watchAuth from './auth';
import watchBooking from './booking';
import watchMonitoring from './monitoring';
import watchHieAppointments from './hieAppointments';
import watchUserInfoSaga from './user';
import watchTelemedicine from './telemedicine';
import watchClinic from './clinic';
import watchPayment from './payment';
import watchSavelist from './savelist';
import watchSearch from './search';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchBooking),
    fork(watchMonitoring),
    fork(watchUserInfoSaga),
    fork(watchHieAppointments),
    fork(watchTelemedicine),
    fork(watchClinic),
    fork(watchPayment),
    fork(watchSavelist),
    fork(watchSearch),
  ]);
}
