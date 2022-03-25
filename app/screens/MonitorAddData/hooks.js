import { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { MonitoringActions } from '@actions';
import { sendMonitoringData } from '@services/monitoringService';

const useHooks = ({ user, route }) => {
  const {
    above,
    below,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
  } = route.params;

  const dispatch = useDispatch();

  const [reason, setReason] = useState(null);
  const [reasonInput, setReasonInput] = useState(null);
  const [activity, setActivity] = useState(null);
  const [activityInput, setActivityInput] = useState(null);
  const [, setWarning] = useState(false);
  const [modalAbove, setModalAbove] = useState(false);
  const [modalBelow, setModalBelow] = useState(false);
  const [saveResult, setSaveResult] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateState = async typeId => {
    try {
      Promise.all([
        dispatch(
          MonitoringActions.getSummary({
            userInfo: user.data.id,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: typeId,
            page: 1,
          }),
        ),
      ]);
    } catch (error) {
      console.log(error, 'Failed to reload data.');
    }
  };

  const addGlucoseReport = async (data, { resetForm }) => {
    if (data.value < below && reason === null) {
      console.log('ต่ำกว่าเกณฑ์');
      return setModalBelow(true);
    } else if (data.value > above && reason === null) {
      console.log('สูงกว่าเกณฑ์');
      return setModalAbove(true);
    }

    let converted = parseInt(data.value);

    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          glucose: converted,
          reason: reason,
        },
        appUserId: user.data.userId,
        monitoringTypeId: 3,
      });

      console.log('Send ok....');
      await updateState(3);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const addPressureReport = async (data, { resetForm }) => {
    if (
      (data.below < defaultBottomLow || data.above < defaultTopLow) &&
      reason === null
    ) {
      console.log('ต่ำกว่าเกณฑ์');
      return setModalBelow(true);
    } else if (
      (data.below > defaultBottomHigh || data.above > defaultTopHigh) &&
      reason === null
    ) {
      console.log('สูงกว่าเกณฑ์');
      return setModalAbove(true);
    }

    let convertedAbove = parseInt(data.above);
    let convertedBelow = parseInt(data.below);

    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          high: convertedAbove,
          low: convertedBelow,
          reason: reason,
        },
        appUserId: user.data.userId,
        monitoringTypeId: 4,
      });

      console.log('Send ok....');
      await updateState(4);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const addBmiReport = async (data, { resetForm }) => {
    let weight = parseFloat(data.weight);
    let height = parseFloat(data.height);

    const bmi = (weight / (height * height)) * 10000;
    const stringBmi = bmi.toFixed(2);

    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          weight: weight,
          height: height,
          bmi: parseFloat(stringBmi),
        },
        appUserId: user.data.userId,
        monitoringTypeId: 5,
      });

      console.log('Send ok....');
      await updateState(5);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const addTemperatureReport = async (data, { resetForm }) => {
    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          celsius: parseFloat(data.value),
        },
        appUserId: user.data.userId,
        monitoringTypeId: 6,
      });

      console.log('Send ok....');
      await updateState(6);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const addO2Report = async (data, { resetForm }) => {
    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          percent: parseInt(data.value),
        },
        appUserId: user.data.userId,
        monitoringTypeId: 7,
      });

      console.log('Send ok....');
      await updateState(7);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const addHeartRateReport = async (data, { resetForm }) => {
    try {
      setLoading(true);
      await sendMonitoringData({
        detail: {
          timeStamp: moment().format(),
          period: activity,
          times: parseInt(data.value),
        },
        appUserId: user.data.userId,
        monitoringTypeId: 8,
      });

      console.log('Send ok....');
      await updateState(8);
      setSaveSuccess(true);
      setSaveResult(true);
    } catch (error) {
      console.log('Error From MonitorAddData', error);
      console.log('send Failed....');
      setSaveResult(true);
    } finally {
      setLoading(false);
    }
  };

  const selectActivity = ac => {
    if (activityInput !== '' && activityInput !== null) {
      setActivity(activityInput);
    } else {
      setActivity(ac);
    }

    setActivityInput(null);
    setWarning(false);
  };

  const selectReason = r => {
    if (reasonInput !== '' && reasonInput !== null) {
      setReason(reasonInput);
    } else {
      setReason(r);
    }

    setReasonInput(null);
  };

  return {
    reason,
    reasonInput,
    activity,
    activityInput,
    modalAbove,
    setModalAbove,
    modalBelow,
    setModalBelow,
    setWarning,
    saveResult,
    setSaveResult,
    saveSuccess,
    loading,
    events: {
      addGlucoseReport,
      addPressureReport,
      addBmiReport,
      addTemperatureReport,
      addO2Report,
      addHeartRateReport,
      selectActivity,
      selectReason,
    },
  };
};

export { useHooks };
