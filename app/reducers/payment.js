import { PaymentConstants } from '@constants';

const initialState = {
  data: {},
  selectType: 1,
  customerId: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PaymentConstants.SAVE_PAYMENT_CREDIT_CARD:
      return {
        data: action.data,
        selectType: action.selectType,
        customerId: action.customerId,
      };
    default:
      return state;
  }
};
