import { useEffect } from 'react';
import { AuthActions } from '@actions';
import { useSelector, useDispatch } from 'react-redux';
import i18next from 'i18next';

const typeOferror = (message = '') => ({
  ValidationError: i18next.t('USERREG_ERROR_IDCARD'),
  ReferralError: message,
  OtherError: i18next.t('USERREG_ERROR_REG'),
});

const useHooks = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const register = useSelector(state => state.register);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.registerError) {
      const { message } = auth.registerError?.err?.data ?? {};
      const errorName = auth.registerError?.err?.name ?? 'OtherError';
      const errorMsg = typeOferror(message)[errorName];
      dispatch(AuthActions.resetRegisData());
      navigation.navigate('AuthStack', {
        screen: 'StatusModal',
        params: { error: true, message: errorMsg, typeHandler: errorName },
      });
    }
    if (auth.successRegister) {
      navigation.navigate('AuthStack', {
        screen: 'StatusModal',
        params: { error: false, typeHandler: 'Success' },
      });
    }
  }, [auth.registerError, auth.successRegister]);

  const registerWithEmailAndPassword = (
    payload,
    infoData,
    addressData,
    orgId,
    kycData,
    referral,
    language,
  ) => {
    dispatch(
      AuthActions.register({
        data: payload,
        infoData,
        addressData,
        kycData,
        referral,
        language,
        orgId,
      }),
    );
  };

  const registereKYCForThirdParty = async (
    infoData,
    addressData,
    orgId,
    kycData,
    referral,
    language,
  ) => {
    if (user.data.userId) {
      dispatch(
        AuthActions.updateInfoForThirdParty({
          infoData: {
            ...infoData,
            userId: user.data.userId,
            userInfoId: user.data.id,
            addressId:
              Array.isArray(user.data.addresses) &&
              user.data.addresses.length > 0
                ? user.data.addresses[0].id
                : null,
          },
          addressData,
          kycData,
          referral,
          language,
          orgId,
        }),
      );
    }
  };

  const editImageHandler = takeIdCard => {
    navigation.navigate('AuthStack', {
      screen: 'CameraIdCard',
      params: { takeIdCard: takeIdCard, edit: true },
    });
  };

  // NOTE Register function
  const registerUser = async () => {
    let registerData = {
      email: register.email,
      password: register.password,
    };
    const birthDate = new Date(register.birthDate);
    const userInfoData = {
      cId: register.email,
      birthDate: birthDate.toISOString(),
      firstname: register.firstname,
      lastname: register.lastname,
      gender: register.gender,
      mobileNumber: register.number,
    };
    const kycData = {
      photo: register.photoImage,
      photoIdCard: register.photoIdCard,
    };

    if (auth.isThirdPartyAuth?.isAuth) {
      registereKYCForThirdParty(
        userInfoData,
        register.addressInfo,
        register.organizationId,
        kycData,
        register.referral,
        user?.userSetting?.language ?? 'th',
      );
    } else {
      registerWithEmailAndPassword(
        registerData,
        userInfoData,
        register.addressInfo,
        register.organizationId,
        kycData,
        register.referral,
        user?.userSetting?.language ?? 'th',
      );
    }
  };

  return {
    actions: {
      registerUser,
      editImageHandler,
    },
    hookData: {
      uploaded: register.photoImage?.uri,
      uploadedIdCard: register.photoIdCard?.uri,
    },
    auth,
    loading: auth.loading,
  };
};

export { useHooks };
