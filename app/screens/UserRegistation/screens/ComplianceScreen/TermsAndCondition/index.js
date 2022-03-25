import React from 'react';
import { ComplianceBody } from '@components';

const TermsAndCondition = ({ navigation }) => {
  const onApproveHandler = () => {
    navigation.navigate('AuthStack', {
      screen: 'PrivacyPolicy',
    });
  };

  const onRejecthandler = () => {
    navigation.goBack();
  };
  return (
    <ComplianceBody
      titlei18Key={'USERREG_TERMS'}
      onRejecthandler={onRejecthandler}
      onApproveHandler={onApproveHandler}
      canReject
      footeri18Key={'USERREG_ACCEPT_TERMS'}
      ctaTitlei18Key={'NEXT_BUTTON'}
      type={'TERMS'}
    />
  );
};

export default TermsAndCondition;
