import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import i18next from 'i18next';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default useHooks = ({ navigation, route }) => {
  const { clinic, quotation, type, clinicPackage } = route.params;
  const [files, setFiles] = useState([]);

  const schema = yup.object({
    firstName: yup.string().trim(),
    // .required('first name is required'),
    lastName: yup.string().trim(),
    // .required('last name is required'),
    email: yup
      .string()
      .trim()
      .email('email is invalid')
      .required('email is required'),
    message: yup
      .string()
      .trim()
      .required('message is required'),
    phoneNo: yup
      .string()
      .min(10, 'phone number is invalid')
      .matches(phoneRegExp, 'phone number is invalid'),
    // .required('phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      message: '',
    },
    onSubmit: () => {},
    validationSchema: schema,
  });

  const formData = {
    firstName: formik.values.firstName,
    lastName: formik.values.lastName,
    email: formik.values.email,
    phoneNo: formik.values.phoneNo,
    messages: formik.values.messages,
  };

  const onResetMessage = () => {
    formik.setFieldValue('message', '');
  };

  // const onConfirm = useCallback(() => {
  //   navigation.navigate('BookingOverview', {
  //     clinic: clinic,
  //     quotation: quotation,
  //     inquiry: { ...formik.values, files: [] },
  //     type: 'procedure',
  //   });
  // }, [navigation, clinic, quotation, formData]);

  // const onConfirmPackage = useCallback(() => {
  //   navigation.navigate('BookingOverview', {
  //     clinic: clinic,
  //     clinicPackage: clinicPackage,
  //     quotation: quotation,
  //     inquiry: { ...formik.values, files: [] },
  //     type: 'clinicPackage',
  //   });
  // }, [navigation, clinic, clinicPackage, quotation, formData]);

  const onConfirmOMA = useCallback(() => {
    let newData;
    switch (type) {
      case 'procedure':
        newData = {
          clinic: clinic,
          quotation: quotation,
          inquiry: { ...formik.values, files: files },
          type: 'procedure',
        };
        break;
      case 'clinicPackage':
        newData = {
          clinic: clinic,
          clinicPackage: clinicPackage,
          quotation: quotation,
          inquiry: { ...formik.values, files: files },
          type: 'clinicPackage',
        };
        break;
      default:
        break;
    }

    navigation.navigate('BookingOverview', newData);
  });

  return {
    actions: {
      // onConfirm,
      onResetMessage,
      // onConfirmPackage,
      onConfirmOMA,
    },
    formik,
    type,
  };
};
