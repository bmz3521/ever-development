import React from 'react';
import { ReportErrMsg } from './styles';
function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <ReportErrMsg>{error}</ReportErrMsg>;
}

export default ErrorMessage;
