import { BookingConstants } from '@constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BookingConstants.CREATE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BookingConstants.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case BookingConstants.CREATE_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case BookingConstants.GET_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BookingConstants.GET_BOOKING_SUCCESS:
      return {
        ...state,
        data: action.result,
        loading: false,
      };
    case BookingConstants.GET_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case BookingConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BookingConstants.CLEAR_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
