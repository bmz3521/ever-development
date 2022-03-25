import { PaymentConstants } from '@constants';

export function saveCustomerInfo({ data, selectType, customerId, callback }) {
  return {
    type: PaymentConstants.SAVE_PAYMENT_CREDIT_CARD,
    data,
    selectType,
    customerId,
    callback,
  };
}
