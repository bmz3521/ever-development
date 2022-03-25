import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import BookingReducer from './bookingReducer';
import UserReducer from './userReducer';
import MonitoringReducer from './monitoringReducer';
import HieAppointmentReducer from './hieAppointmentReducer';
import RegisterReducer from './registerReducer';
import SavelistReducer from './savelistReducer';

const appReducer = combineReducers({
  auth: AuthReducer,
  booking: BookingReducer,
  hieAppointment: HieAppointmentReducer,
  monitoring: MonitoringReducer,
  user: UserReducer,
  register: RegisterReducer,
  savelist: SavelistReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
