import { HieBookingsConstants } from '@constants';

const initialState = {
  data: { visits: [] },
  dataHistory: { visits: [] },
  total: 0,
  totalHie: 0,
  loading: false,
  loadingHie: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HieBookingsConstants.GET_HIE_APPOINTMENT_REQUEST:
      return {
        ...state,
        loadingHie: true,
        error: null,
      };
    case HieBookingsConstants.GET_HIE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loadingHie: false,
        totalHie: action.payload.totalVisits ?? 0,
        error: null,
      };
    case HieBookingsConstants.GET_HIE_APPOINTMENT_FAILURE:
      return {
        ...state,
        data: { visits: [] },
        loadingHie: false,
        totalHie: 0,
        error: action.error,
      };
    case HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_SUCCESS:
      return {
        ...state,
        dataHistory: action.payload,
        loading: false,
        total: action.payload.totalVisits ?? 0,
        error: null,
      };
    case HieBookingsConstants.GET_HIE_HISTORY_APPOINTMENT_FAILURE:
      return {
        ...state,
        dataHistory: { visits: [] },
        loading: false,
        total: 0,
        error: action.error,
      };
    case HieBookingsConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HieBookingsConstants.CLEAR_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
