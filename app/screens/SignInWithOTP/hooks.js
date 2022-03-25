import { useFormik } from 'formik';
import React, { useReducer, useState, useEffect } from 'react';
import * as yup from 'yup';
import * as Constants from './constants';
import i18next from 'i18next';
import COUNTRY_CODE from 'app/assets/country_code.json';
import { AuthActions } from '@actions';
import { verifyMobileNumberViaOtp, registerPhone } from '@services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useChatContext } from 'app/hooks/useGetStream';

import ConutryFlag from './components/ConutryFlag';

const reducerOTP = (state, action) => {
  switch (action.type) {
    case Constants.ON_CHANGE_VALUE:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

let resendInterval;
const useHooks = ({ navigation }) => {
  const reduxDispatch = useDispatch();
  const { StreamChat } = useChatContext();
  const authReducer = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [stateData, dispatch] = useReducer(reducerOTP, Constants.initialState);
  const [timer, setTimer] = useState(Constants.DEFAULT_TIME_INTERVAL);
  const [openModal, setOpenModal] = useState(true);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  useEffect(() => {
    if (authReducer.isAuthenticated) {
      /** NOTE Login with streamChat */
      StreamChat.login(user.data);
      navigation.navigate('Home');
    }
  }, [authReducer.isAuthenticated]);

  const onStartTimerHandler = () => {
    if (resendInterval) {
      clearInterval(resendInterval);
    }
    resendInterval = setInterval(() => {
      setTimer(prev => {
        if (prev - 1 <= 0) {
          clearInterval(resendInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onResendOTPHandler = async () => {
    //** NOTE do some request (resend OTP)*/
    try {
      const reqOTP = await registerPhone({
        mobileNumber: `${stateData.countryCode}${stateData.phoneNumber}`,
        cId: stateData.idCard,
      });
      console.log('result resend reqOTP ====>', reqOTP);
      if (reqOTP?.data?.token) {
        onChangeValueHandler('otpToken', reqOTP?.data?.token);
        onChangeValueHandler('error', '');
        setTimer(Constants.DEFAULT_TIME_INTERVAL);
        onStartTimerHandler();
      }
    } catch (e) {
      onChangeValueHandler(
        'error',
        e.message ?? 'Something went wrong. Try again.',
      );
    }
  };

  useEffect(() => {
    if (stateData.otpCode?.length === 6) {
      console.log('otpCode ==>', stateData.otpCode);
      onOTPCheckHandler(stateData.otpCode);
    }
  }, [stateData.otpCode]);

  useEffect(() => {
    const finalItem = Array.isArray(COUNTRY_CODE)
      ? COUNTRY_CODE.map(item => ({
          label: item.code,
          code: item.dial_code,
          countryName: item.name,
          value: item.code,
          icon: () => <ConutryFlag code={item.code} />,
        }))
      : [];
    onChangeValueHandler('items', finalItem);
    return () => {
      if (resendInterval) {
        clearInterval(resendInterval);
      }
    };
  }, []);

  const schemaPhoneCid = yup.object({
    idCard: yup
      .string()
      .required(i18next.t('USERREG_FILL_IDNUM2'))
      .min(13, i18next.t('USERREG_ERROR_IDNUM')),
    phoneNumber: yup
      .string()
      .min(10, i18next.t('USERREG_ERROR_PHONENUM'))
      .matches(phoneRegExp, i18next.t('USERREG_ERROR_PHONENUM'))
      .required(i18next.t('USERREG_FILL_PHONENUM')),
  });

  const schemaInformation = yup.object({
    name: yup.string().required(),
    lastName: yup.string().required(i18next.t('USERREG_FILL_FULLNAME')),
  });

  const onChangeValueHandler = (key, text) => {
    dispatch({
      type: Constants.ON_CHANGE_VALUE,
      key: key,
      value: text,
    });
  };

  const onSubmitPhoneCid = async item => {
    try {
      /** NOTE do some request (request OTP form server)*/
      const reqOTP = await registerPhone({
        mobileNumber: `${stateData.countryCode}${item.phoneNumber}`,
        cId: item.idCard,
      });
      console.log('result reqOTP ====>', reqOTP);
      if (reqOTP?.data?.token) {
        onChangeValueHandler('otpToken', reqOTP?.data?.token);
        onChangeValueHandler('phoneNumber', item.phoneNumber);
        onChangeValueHandler('idCard', item.idCard);
        onChangeValueHandler('error', '');
        onChangeValueHandler('step', Constants.STEP_TWO);
        onStartTimerHandler();
      }
    } catch (e) {
      onChangeValueHandler(
        'error',
        e.message ?? 'Something went wrong. Try again.',
      );
    }
  };

  const onSignInWithInformation = async item => {
    /** NOTE do some request (update userInfomation)*/
    if (item) {
      reduxDispatch(
        AuthActions.loginWithThirdParty({
          provider: 'mobile',
          profile: {
            moibleNumber: stateData.phoneNumber,
            cId: stateData.idCard,
            firstname: item.name,
            lastname: item.lastName,
          },
        }),
      );
    } else {
      reduxDispatch(
        AuthActions.loginWithThirdParty({
          provider: 'mobile',
          profile: {
            moibleNumber: stateData.phoneNumber,
            cId: stateData.idCard,
          },
        }),
      );
    }
  };

  const onOTPCheckHandler = async otpCode => {
    /** NOTE do some request (send OTP and token to check)*/
    try {
      if (otpCode && stateData.otpToken) {
        const verifyOtp = await verifyMobileNumberViaOtp({
          otp: otpCode,
          otpToken: stateData.otpToken,
        });
        console.log('result verifyOtp  ===>', verifyOtp);
        if (verifyOtp.status === 'success') {
          onChangeValueHandler('otpCode', '');
          if (!stateData.isSignIn) {
            onChangeValueHandler('step', Constants.STEP_THREE);
            return;
          }
          onSignInWithInformation();
        }
      }
    } catch (e) {
      onChangeValueHandler('error', 'Invalid OTP Code!');
      onChangeValueHandler('errorModal', true);
    }
  };

  const onFooterButtonClick = async () => {
    if (stateData.step === Constants.STEP_ONE) {
      navigation.goBack();
    } else if (stateData.step === Constants.STEP_TWO) {
      if (resendInterval) {
        clearInterval(resendInterval);
      }
      setTimer(Constants.DEFAULT_TIME_INTERVAL);
      onChangeValueHandler('step', Constants.STEP_ONE);
    }
  };

  const formikPhoneCid = useFormik({
    initialValues: {
      idCard: stateData.idCard,
      phoneNumber: stateData.phoneNumber,
    },
    onSubmit: onSubmitPhoneCid,
    validationSchema: schemaPhoneCid,
  });

  const formikInformation = useFormik({
    initialValues: {
      name: stateData.name,
      lastName: stateData.lastName,
    },
    onSubmit: onSignInWithInformation,
    validationSchema: schemaInformation,
  });

  return {
    formikPhoneCid,
    formikInformation,
    onChangeValueHandler,
    onResendOTPHandler,
    onFooterButtonClick,
    dispatch,
    stateData,
    setTimer,
    timer,
    loading: authReducer.loading,
    error: authReducer.eror,
    modalEvents: {
      setOpenModal,
      openModal,
    },
  };
};

export { useHooks };
