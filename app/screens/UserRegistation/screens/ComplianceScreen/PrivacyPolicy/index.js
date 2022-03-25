import React from 'react';
import { ComplianceBody } from '@components';

const PrivacyPolicy = ({ navigation }) => {
  const onApproveHandler = () => {
    navigation.replace('AuthStack', {
      screen: 'InformationForm',
    });
  };

  const onRejecthandler = () => {
    navigation.goBack();
  };
  return (
    <ComplianceBody
      titlei18Key={'USERREG_PNP_TITLE'}
      onRejecthandler={onRejecthandler}
      onApproveHandler={onApproveHandler}
      canReject
      footeri18Key={'USERREG_PNP_CTA'}
      ctaTitlei18Key={'USERREG_SIGNIN'}
      type={'POLICY'}
    />
  );
};

export default PrivacyPolicy;
