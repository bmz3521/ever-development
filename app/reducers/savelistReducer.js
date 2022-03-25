import { SavelistConstants } from '@constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SavelistConstants.CREATE_SAVELIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SavelistConstants.CREATE_SAVELIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SavelistConstants.CREATE_SAVELIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SavelistConstants.GET_SAVELIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SavelistConstants.GET_SAVELIST_SUCCESS:
      return {
        ...state,
        data: action.result,
        loading: false,
      };
    case SavelistConstants.GET_SAVELIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SavelistConstants.ADD_ITEM_SAVELIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SavelistConstants.ADD_ITEM_SAVELIST_SUCCESS:
      return {
        ...state,
        // data: action.result,
        loading: false,
      };
    case SavelistConstants.ADD_ITEM_SAVELIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SavelistConstants.DELETE_ITEM_SAVELIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SavelistConstants.DELETE_ITEM_SAVELIST_SUCCESS:
      return {
        ...state,
        // data: action.result,
        loading: false,
      };
    case SavelistConstants.DELETE_ITEM_SAVELIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SavelistConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SavelistConstants.CLEAR_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
