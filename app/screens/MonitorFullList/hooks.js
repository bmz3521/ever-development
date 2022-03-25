import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MonitoringActions } from '@actions';
import {
  getMonitoringData,
  deleteMonitoringData,
} from '@services/monitoringService';

const useHooks = ({ report, typeId }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [glucose, setGlucose] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [oxygen, setOxygen] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [heartRate, setHeartRate] = useState([]);
  const [defaultGlucose, setDefaultGlucose] = useState({
    defaultLow: 70,
    defaultHigh: 130,
  });
  const [defaultTopHigh, setDefaultTopHigh] = useState(140);
  const [defaultTopLow, setDefaultTopLow] = useState(90);
  const [defaultBottomHigh, setDefaultBottomHigh] = useState(90);
  const [defaultBottomLow, setDefaultBottomLow] = useState(60);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (report === 'น้ำตาลในเลือด') {
      fetchGlucoseReports();
    } else if (report === 'ความดันโลหิต') {
      fetchPressureReports();
    } else if (report === 'อุณหภูมิ') {
      fetchTemperatureReports();
    } else if (report === 'ออกซิเจน') {
      fetchOxygenReports();
    } else if (report === 'ดัชนีมวลกาย') {
      fetchBmiReports();
    } else if (report === 'หัวใจ') {
      fetchHeartReports();
    }
  }, []);

  const onDelete = async deleteId => {
    try {
      await deleteMonitoringData({
        itemId: deleteId,
      });

      dispatch(
        MonitoringActions.getSummary({
          userInfo: user.data.id,
        }),
      );

      // update the local state & reducer
      if (report === 'น้ำตาลในเลือด') {
        setGlucose(glucose.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      } else if (report === 'ความดันโลหิต') {
        setPressure(pressure.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      } else if (report === 'อุณหภูมิ') {
        setTemperature(temperature.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      } else if (report === 'ออกซิเจน') {
        setOxygen(oxygen.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      } else if (report === 'ดัชนีมวลกาย') {
        setBmi(bmi.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      } else if (report === 'หัวใจ') {
        setHeartRate(heartRate.filter(item => item.id !== deleteId));
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId,
            page: 1,
          }),
        );
      }
    } catch (err) {
      console.log('Cannot delete the item: ', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (report === 'น้ำตาลในเลือด') {
      await fetchGlucoseReports();
    } else if (report === 'ความดันโลหิต') {
      await fetchPressureReports();
    } else if (report === 'อุณหภูมิ') {
      await fetchTemperatureReports();
    } else if (report === 'ออกซิเจน') {
      await fetchOxygenReports();
    } else if (report === 'ดัชนีมวลกาย') {
      await fetchBmiReports();
    } else if (report === 'หัวใจ') {
      await fetchHeartReports();
    }
    setRefreshing(false);
  };

  const fetchGlucoseReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 3,
        page: page,
      });
      console.log('Called....');
      console.log(response);

      // append more data
      if (response.data.length) {
        const more = glucose.concat(response.data);
        setPage(prev => prev + 1);
        setGlucose(more);
        setDefaultGlucose({
          defaultLow: 70,
          defaultHigh: 130,
        });
      }
    } catch (error) {
      console.log(error, 'error fetching Glucose data.');
    }
  };

  const fetchPressureReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 4,
        page: page,
      });

      // append more data
      if (response.data.length) {
        const more = pressure.concat(response.data);
        setPage(prev => prev + 1);
        setPressure(more);
        setDefaultTopHigh(140);
        setDefaultTopLow(90);
        setDefaultBottomHigh(90);
        setDefaultBottomLow(60);
      }
    } catch (error) {
      console.log(error, 'error fetching Pressure data.');
    }
  };

  const fetchTemperatureReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 6,
        page: page,
      });

      // append more data
      if (response.data.length) {
        const more = temperature.concat(response.data);
        setPage(prev => prev + 1);
        setTemperature(more);
      }
    } catch (error) {
      console.log(error, 'error fetching Temp data.');
    }
  };

  const fetchOxygenReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 7,
        page: page,
      });

      // append more data
      if (response.data.length) {
        const more = oxygen.concat(response.data);
        setPage(prev => prev + 1);
        setOxygen(more);
      }
    } catch (error) {
      console.log(error, 'error fetching oxygen data.');
    }
  };

  const fetchBmiReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 5,
        page: page,
      });

      // append more data
      if (response.data.length) {
        const more = bmi.concat(response.data);
        setPage(prev => prev + 1);
        setBmi(more);
      }
    } catch (error) {
      console.log(error, 'error fetching bmi data.');
    }
  };

  const fetchHeartReports = async () => {
    try {
      const response = await getMonitoringData({
        userId: user.data.userId,
        typeId: 8,
        page: page,
      });

      // append more data
      if (response.data.length) {
        const more = heartRate.concat(response.data);
        setPage(prev => prev + 1);
        setHeartRate(more);
      }
    } catch (error) {
      console.log(error, 'error fetching heart rate data.');
    }
  };

  return {
    glucose,
    pressure,
    temperature,
    oxygen,
    bmi,
    heartRate,
    defaultGlucose,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
    refreshing,
    events: {
      fetchGlucoseReports,
      fetchPressureReports,
      fetchTemperatureReports,
      fetchOxygenReports,
      fetchBmiReports,
      fetchHeartReports,
      onDelete,
      onRefresh,
    },
  };
};

export { useHooks };
