import { ClinicConstants } from '@constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ClinicConstants.GET_CLINIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ClinicConstants.GET_CLINIC_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case ClinicConstants.GET_CLINIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ClinicConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ClinicConstants.CLEAR_SUCCESS:
      return {
        initialState,
      };
    default:
      return state;
  }
};
