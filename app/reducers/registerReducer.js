import { AuthConstants } from '@constants';

const initialState = {
  email: '',
  password: '',
  confirmpassword: '',
  firstname: '',
  number: '',
  lastname: '',
  gender: '',
  organizationId: '',
  referral: '',
  birthDate: '',
  photoImage: {},
  photoIdCard: {},
  addressInfo: {
    no: '',
    village: '',
    soi: '',
    road: '',
    district: '',
    postalCode: '',
    province: '',
    subDistrict: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AuthConstants.SEND_INFO_FORM:
      return {
        ...state,
        ...action.data,
      };
    case AuthConstants.CLEAR_INFO_FORM:
      return initialState;
    default:
      return state;
  }
};
