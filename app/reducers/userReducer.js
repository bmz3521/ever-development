import { UserConstants } from '@constants';

const initialState = {
  data: null,
  loading: false,
  error: null,
  userSetting: {
    isSuccess: false,
    loading: false,
    language: 'th',
    notification: true,
    helpCenter: true,
  },
};

export default (state = initialState, action = {}) => {
  let newData = {};
  switch (action.type) {
    case UserConstants.GET_USER_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UserConstants.GET_USER_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...(action.result ?? {}) },
        loading: false,
      };
    case UserConstants.GET_USER_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...(action.result ? action.result : {}) },
        loading: false,
      };
    case UserConstants.CHANGE_VERIFY_STATUS:
      if (state.data) {
        newData = state.data;
        newData.verifyId = JSON.parse(action.data);
      }
      return {
        ...state,
        data: newData,
      };
    case UserConstants.GET_UPDATE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.GET_UPDATE_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          addresses:
            Array.isArray(state.data.addresses) &&
            state.data.addresses.length > 0
              ? state.data.addresses.map(item =>
                  item.id === action.result.id ? action.result : item,
                )
              : [action.result],
        },
      };
    case UserConstants.CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserConstants.CLEAR_SUCCESS:
      return {
        ...state,
        data: null,
        loading: false,
      };
    case UserConstants.UPDATE_USER_ORG_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          organizations: Array.isArray(action.data)
            ? action.data
            : state.data?.organizations,
        },
        loading: false,
      };
    }
    case UserConstants.UPDATE_USER_SETTING_REQUEST ||
      UserConstants.GET_USER_SETTING_REQUEST: {
      return {
        ...state,
        userSetting: {
          ...state.userSetting,
          isSuccess: false,
          loading: true,
        },
      };
    }
    case UserConstants.UPDATE_USER_SETTING_LOCAL: {
      return {
        ...state,
        userSetting: {
          ...state.userSetting,
          ...action.data,
        },
      };
    }
    case UserConstants.UPDATE_USER_SETTING_FAILURE: {
      return {
        ...state,
        userSetting: {
          ...state.userSetting,
          isSuccess: false,
          loading: false,
        },
      };
    }
    case UserConstants.UPDATE_USER_SETTING_SUCCESS: {
      return {
        ...state,
        userSetting: {
          ...action.data,
          isSuccess: true,
          loading: false,
        },
      };
    }
    case UserConstants.UPDATE_VERIFY_USER: {
      return {
        ...state,
        data: {
          ...state.data,
          verifyId: JSON.parse(action.status),
        },
      };
    }
    default:
      return state;
  }
};
