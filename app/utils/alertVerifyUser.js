import { Alert } from 'react-native';
import i18next from 'i18next';

export function alertThirdPartyVerify(onConfirm, onCancel = () => {}) {
  return Alert.alert(
    i18next.t('SIGNIN_THIRDMODAL_EKYC_TITLE'),
    i18next.t('SIGNIN_THIRDMODAL_EKYC_BODY'),
    [
      {
        text: i18next.t('CONFIRM_BUTTON'),
        onPress: onConfirm,
        style: 'default',
      },
      {
        text: i18next.t('CANCEL_BUTTON'),
        onPress: onCancel,
        style: 'destructive',
      },
    ],
  );
}

const IsNumeric = input => {
  var RE = /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
  return RE.test(input);
};

export const checkCIdVerify = (id = '') => {
  if (!IsNumeric(id)) return false;
  if (id.substring(0, 1) == 0) return false;
  if (id.length != 13) return false;
  // let i,sum;
  // for(i=0,sum=0; i < 12; i++)
  //     sum += parseFloat(id.charAt(i))*(13-i);
  // if((11-sum%11)%10!=parseFloat(id.charAt(12))) return false;
  return true;
};

export const checkVerifyArray = (orgArray = []) => {
  return (
    orgArray.filter(
      item => !`${item.name}`.toLocaleLowerCase('en').match(/ever/g),
    ).length > 0
  );
};

export function alertCIdVerify(onPress) {
  Alert.alert(i18next.t('MODAL_WARNING'), i18next.t('MODAL_NOT_VERIFIED'), [
    {
      text: i18next.t('CONFIRM_BUTTON'),
      onPress: onPress,
    },
  ]);
}
