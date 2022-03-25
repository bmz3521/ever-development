import { MonitoringConstants } from '@constants';

export function getMonitoring({ userId, typeId, page }) {
  return {
    type: MonitoringConstants.GET_MONITORING_REQUEST,
    userId,
    typeId,
    page,
  };
}

export function getMonitoringSuccess({ payload, typeId }) {
  return {
    type: MonitoringConstants.GET_MONITORING_SUCCESS,
    payload,
    typeId,
  };
}

export function getMonitoringFailure(error) {
  return {
    type: MonitoringConstants.GET_MONITORING_FAILURE,
    error,
  };
}

export function getSummary({ userInfo }) {
  return {
    type: MonitoringConstants.GET_SUMMARY_REQUEST,
    userInfo,
  };
}

export function getSummarySuccess(payload) {
  return {
    type: MonitoringConstants.GET_SUMMARY_SUCCESS,
    payload,
  };
}

export function getSummaryFailure(error) {
  return {
    type: MonitoringConstants.GET_SUMMARY_FAILURE,
    error,
  };
}

export function clear(callback) {
  return {
    type: MonitoringConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: MonitoringConstants.CLEAR_SUCCESS,
  };
}
