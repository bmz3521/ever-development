import { AuthActions } from '@actions';
import { useDispatch } from 'react-redux';

const useHooks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { typeHandler } = route?.params;

  const handleSuccessModal = () => {
    dispatch(AuthActions.clearInfoForm());
    dispatch(AuthActions.resetRegisData());
    navigation.navigate('AuthStack', { screen: 'SignIn' });
  };

  const handleOtherError = () => {
    dispatch(AuthActions.resetRegisData());
    navigation.navigate('AuthStack', {
      screen: 'InformationForm',
    });
  };

  const handleRefError = () => {
    dispatch(AuthActions.resetRegisData());
    navigation.navigate('AuthStack', {
      screen: 'InformationForm',
      params: {
        errors: {
          referral: true,
        },
      },
    });
  };

  const handleValidationError = () => {
    dispatch(AuthActions.resetRegisData());
    navigation.navigate('AuthStack', {
      screen: 'InformationForm',
      params: {
        errors: {
          email: true,
        },
      },
    });
  };

  const TYPE_ERROR = {
    ValidationError: handleValidationError,
    ReferralError: handleRefError,
    OtherError: handleOtherError,
    Success: handleSuccessModal,
  };

  return {
    actions: {
      handleModal: TYPE_ERROR[typeHandler] ?? handleSuccessModal,
    },
  };
};

export { useHooks };
