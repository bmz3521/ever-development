import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import BookingReducer from './bookingReducer';
import UserReducer from './userReducer';
import MonitoringReducer from './monitoringReducer';
import HieAppointmentReducer from './hieAppointmentReducer';
import TelemedicineReducer from './telemedicineReducer';
import clinicReducer from './clinicReducer';
import RegisterReducer from './registerReducer';
import PaymentReducer from './payment';
import SavelistReducer from './savelistReducer';
import SearchReducer from './searchReducer';

export default combineReducers({
  auth: AuthReducer,
  booking: BookingReducer,
  hieAppointment: HieAppointmentReducer,
  monitoring: MonitoringReducer,
  telemedicine: TelemedicineReducer,
  user: UserReducer,
  clinic: clinicReducer,
  register: RegisterReducer,
  payment: PaymentReducer,
  savelist: SavelistReducer,
  search: SearchReducer,
});
