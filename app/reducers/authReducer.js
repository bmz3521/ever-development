import { AuthConstants } from '@constants';

const initialState = {
  isAuthenticated: null,
  isThirdPartyAuth: {
    isAuth: false,
    provider: false,
  },
  loading: false,
  error: null,
  successRegister: null,
  registerError: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthConstants.LOGIN_THIRD_PARTY_REQUEST:
      return {
        ...state,
        isThirdPartyAuth: {
          provider: false,
          isAuth: false,
        },
        isAuthenticated: null,
        loading: true,
        error: null,
      };
    case AuthConstants.LOGIN_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        isThirdPartyAuth: {
          provider: action.data,
          isAuth: true,
        },
        isAuthenticated: true,
        loading: false,
      };
    case AuthConstants.LOGIN_THIRD_PARTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_REQUEST:
      return {
        ...state,
        loading: true,
        successRegister: null,
        registerError: null,
      };
    case AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        successRegister: action.data,
        loading: false,
        error: null,
        registerError: null,
      };
    case AuthConstants.UPDATE_USER_INFO_THIRD_PARTY_FAILURE:
      return {
        ...state,
        loading: false,
        successRegister: null,
        registerError: action.error,
      };
    case AuthConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        successRegister: null,
        registerError: null,
      };
    case AuthConstants.REGISTER_SUCCESS:
      return {
        ...state,
        successRegister: action.data,
        loading: false,
        error: null,
        registerError: null,
      };
    case AuthConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        successRegister: null,
        registerError: action.error,
      };
    case AuthConstants.LOGIN_REQUEST:
      return {
        ...state,
        isThirdPartyAuth: {
          provider: false,
          isAuth: false,
        },
        isAuthenticated: null,
        loading: true,
        error: null,
      };
    case AuthConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AuthConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AuthConstants.RESET_REGISTER_DATA:
      return {
        ...state,
        loading: false,
        error: null,
        successRegister: null,
        registerError: null,
      };
    case AuthConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action,
      };
    case AuthConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isThirdPartyAuth: {
          provider: false,
          isAuth: false,
        },
        loading: false,
      };
    default:
      return state;
  }
};
