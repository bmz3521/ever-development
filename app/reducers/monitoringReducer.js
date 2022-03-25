import { MonitoringConstants } from '@constants';

const initialState = {
  glucose: [],
  pressure: [],
  weight: [],
  temperature: [],
  oxygen: [],
  heart: [],
  summary: {},
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MonitoringConstants.GET_MONITORING_REQUEST:
    case MonitoringConstants.GET_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MonitoringConstants.GET_MONITORING_SUCCESS:
      return {
        ...state,
        glucose: action.typeId === 3 ? action.payload.data : state.glucose,
        pressure: action.typeId === 4 ? action.payload?.data : state.pressure,
        weight: action.typeId === 5 ? action.payload?.data : state.weight,
        temperature:
          action.typeId === 6 ? action.payload?.data : state.temperature,
        oxygen: action.typeId === 7 ? action.payload?.data : state.oxygen,
        heart: action.typeId === 8 ? action.payload?.data : state.heart,
        loading: false,
        error: null,
      };
    case MonitoringConstants.GET_MONITORING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case MonitoringConstants.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
      };
    case MonitoringConstants.GET_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case MonitoringConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MonitoringConstants.CLEAR_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
