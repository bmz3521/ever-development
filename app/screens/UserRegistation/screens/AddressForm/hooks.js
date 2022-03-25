import { AuthActions } from '@actions';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import i18next from 'i18next';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const useHooks = ({ navigation, initailValues }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    addressInfo: yup.object({
      no: yup.string().required(i18next.t('USERREG_HOUSENUM')),
      postalCode: yup
        .string()
        .min(5, i18next.t('USERREG_ERROR_POSTAL'))
        .required(i18next.t('USERREG_FILL_POSTAL')),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: initailValues?.email,
      password: initailValues?.password,
      confirmpassword: initailValues?.confirmpassword,
      firstname: initailValues?.firstname,
      number: initailValues?.number,
      lastname: initailValues?.lastname,
      gender: initailValues?.gender,
      organizationId: initailValues.organizationId,
      birthDate: initailValues.birthDate,
      referral: initailValues?.referral,
      addressInfo: {
        no: initailValues.addressInfo?.no,
        village: initailValues.addressInfo?.village ?? '',
        soi: initailValues.addressInfo?.soi ?? '',
        road: initailValues.addressInfo?.road ?? '',
        district: initailValues.addressInfo?.district,
        postalCode: initailValues.addressInfo?.postalCode,
        province: initailValues.addressInfo?.province,
        subDistrict: initailValues.addressInfo?.subDistrict,
      },
    },
    onSubmit: values => {
      dispatch(AuthActions.setInfoForm(values));
      navigation.navigate('AuthStack', { screen: 'PlaceHolderImage' });
    },
    validationSchema: schema,
  });

  const selectAddress = () => {
    navigation.navigate('AuthStack', {
      screen: 'ActiveDataProvince',
      params: {
        callBack: data => {
          data.postalCode = `${data.postalCode}`;
          formik.setFieldValue('addressInfo', {
            ...formik.values.addressInfo,
            ...data,
          });
        },
        selected: {
          province: formik.values.addressInfo.province,
          subDistrict: formik.values.addressInfo.subDistrict,
          district: formik.values.addressInfo.district,
        },
        pageCallback: 'AddressForm',
      },
    });
  };

  return {
    actions: {
      selectAddress,
    },
    formik,
  };
};

export { useHooks };
