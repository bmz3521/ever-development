import { TelemedicineConstants } from '@constants';

const initialState = {
  data: {},
  booking: null,
  firebase: null,
  twilio: null,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TelemedicineConstants.SET_TELEMEDICINE:
      return {
        ...state,
        data: { ...state.data, ...action.data },
      };
    case TelemedicineConstants.GET_TELEMEDICINE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TelemedicineConstants.GET_TELEMEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TelemedicineConstants.GET_TELEMEDICINE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case TelemedicineConstants.SAVE_TELEMEDICINE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TelemedicineConstants.SAVE_TELEMEDICINE_SUCCESS:
      return {
        ...state,
        booking: action.payload.payload.booking,
        firebase: action.payload.payload.firebase,
        twilio: action.payload.payload.twilio,
        loading: false,
        error: null,
      };
    case TelemedicineConstants.SAVE_TELEMEDICINE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case TelemedicineConstants.CLEAR_TELEMEDICINE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TelemedicineConstants.CLEAR_TELEMEDICINE_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
