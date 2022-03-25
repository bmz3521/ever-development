export const STEP_ONE = 'PHONE_STEP_ONE';
export const STEP_TWO = 'PHONE_STEP_TWO';
export const STEP_THREE = 'PHONE_STEP_THREE';

export const ON_CHANGE_VALUE = 'ON_CHANGE_VALUE';
export const DEFAULT_TIME_INTERVAL = 30;

export const initialState = {
  step: STEP_ONE,
  phoneNumber: '',
  otpCode: '',
  idCard: '',
  name: '',
  lastName: '',
  value: 'TH',
  countryCode: '+66',
  items: [],
  otpToken: '',
  isSignIn: true,
  error: '',
  errorModal: false,
};

export const TITLE = {
  PHONE_STEP_ONE_SIGNIN: 'OTP_CONFIRM_PHONE_NO_SIGNIN',
  PHONE_STEP_ONE_SIGNUP: 'OTP_CONFIRM_PHONE_NO_SIGNUP',
  PHONE_STEP_TWO_SIGNIN: 'OTP_CONFIRM_CODE',
  PHONE_STEP_TWO_SIGNUP: 'OTP_CONFIRM_CODE',
  PHONE_STEP_THREE_SIGNUP: 'OTP_PERSONAL_INFO',
  PHONE_STEP_THREE_SIGNIN: 'OTP_PERSONAL_INFO',
};

export const FOOTER = {
  PHONE_STEP_ONE: 'OTP_OTHER_METHODS',
  PHONE_STEP_TWO: 'OTP_EDIT_PHONE_NO',
};
