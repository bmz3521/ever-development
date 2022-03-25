import { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { AuthActions } from '@actions';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrganiztion } from '@services/organizationService';
import * as yup from 'yup';
import i18next from 'i18next';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const useHooks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [listOrg, setListOrg] = useState([]);
  const registerInitials = useSelector(state => state.register);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    /** NOTE clear data if come from SignIn screen */
    dispatch(AuthActions.resetRegisData());
    dispatch(AuthActions.clearInfoForm());
    getOrganizations();
  }, []);

  const schema = yup.object({
    firstname: yup.string().required(i18next.t('USERREG_FILL_FULLNAME')),
    lastname: yup.string().required(),
    number: yup
      .string()
      .min(10, i18next.t('USERREG_ERROR_PHONENUM'))
      .matches(phoneRegExp, i18next.t('USERREG_ERROR_PHONENUM'))
      .required(i18next.t('USERREG_FILL_PHONENUM')),
    email: yup
      .string()
      .required(i18next.t('USERREG_FILL_IDNUM2'))
      .min(13, i18next.t('USERREG_ERROR_IDNUM')),
    ...(auth.isThirdPartyAuth?.isAuth
      ? {}
      : {
          password: yup
            .string()
            .min(6, i18next.t('USERREG_ERROR_SIXPASSWORD'))
            .required(i18next.t('USERREG_PASSWORD')),
          confirmpassword: yup
            .string()
            .oneOf([yup.ref('password')], i18next.t('USERREG_ERROR_PASSWORD'))
            .required(i18next.t('USERREG_CONFIRM_PASSWORD')),
        }),
    referral: yup.string(),
    organizationId: yup.string(),
    birthDate: yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      email: registerInitials?.email,
      password: registerInitials?.password,
      confirmpassword: registerInitials?.confirmpassword,
      firstname: registerInitials?.firstname,
      number: registerInitials?.number,
      lastname: registerInitials?.lastname,
      gender: registerInitials?.gender,
      organizationId: registerInitials.organizationId,
      referral: registerInitials?.referral,
      birthDate: registerInitials.birthDate,
    },
    onSubmit: async values => {
      dispatch(
        AuthActions.setInfoForm({
          email: values.email,
          password: values.password,
          confirmpassword: values.confirmpassword,
          firstname: values.firstname,
          number: values.number,
          lastname: values.lastname,
          gender: values.gender,
          organizationId: values.organizationId,
          referral: values.referral,
          birthDate: values.birthDate,
        }),
      );
      navigation.navigate('AuthStack', { screen: 'AddressForm' });
    },
    validationSchema: schema,
  });

  const refErrorHandler = useCallback(() => {
    const { referral, email } = route?.params?.errors ?? {};
    if (referral) {
      formik.setFieldError('referral', i18next.t('USERREG_INVALID_REF'));
      Alert.alert(i18next.t('USERREG_INVALID_REF'));
      navigation.setParams({ errors: {} });
    } else if (email) {
      formik.setFieldTouched('email', true, false);
      formik.setFieldValue('email', '', true);
      navigation.setParams({ errors: {} });
    }
  }, [route?.params?.errors]);

  useEffect(() => {
    refErrorHandler();
  }, [route?.params]);

  const genderType = [
    {
      value: 'MALE',
      label: i18next.t('USERREG_MALE'),
      check: formik?.values.gender === 'MALE',
    },
    {
      value: 'FEMALE',
      label: i18next.t('USERREG_FEMALE'),
      check: formik?.values.gender === 'FEMALE',
    },
  ];

  const getOrganizations = async () => {
    try {
      const response = await getListOrganiztion();
      if (response) {
        const finalData = response.flatMap(val => {
          if (!`${val.name}`.toLocaleLowerCase('en').match(/ever/g)) {
            return {
              label:
                i18next.language === 'th'
                  ? val?.nameTh ?? val?.name
                  : val?.name ?? val?.nameTh,
              value: val.id,
            };
          } else {
            return {
              label:
                (i18next.language === 'th'
                  ? val?.nameTh ?? val?.name
                  : val?.name ?? val?.nameTh) + ` ( Default )`,
              value: val.id,
            };
          }
        });
        setListOrg(finalData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const listOrganizations = useMemo(() => {
    return listOrg.map(item => {
      return {
        ...item,
        check: `${item.label}`.toLocaleLowerCase('en').match(/ever/g)
          ? true
          : item.value == formik.values.organizationId,
        disable: `${item.label}`.toLocaleLowerCase('en').match(/ever/g)
          ? true
          : false,
      };
    });
  }, [formik.values.organizationId, listOrg]);

  const selectDateHandler = useCallback(date => {
    formik.setFieldValue('birthDate', date, false);
  }, []);

  const selectOrganization = title => {
    navigation.navigate('ListingData', {
      callBack: data => formik.setFieldValue('organizationId', data, false),
      title,
      selected: true,
      data: listOrganizations,
      pageCallback: 'AddressForm',
    });
  };

  const selectGender = (callBack, title) => {
    navigation.navigate('ListingData', {
      callBack,
      title,
      data: genderType,
      selected: true,
      pageCallback: 'InformationForm',
    });
  };

  return {
    actions: {
      selectGender,
      selectOrganization,
      selectDateHandler,
    },
    isThirdParty: auth.isThirdPartyAuth?.isAuth,
    listOrganizations,
    formik,
  };
};

export { useHooks };
