import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.heart);
  const summary = useSelector(state => state.monitoring.summary);

  const [heartRates, setHeartRates] = useState([]);
  const [defaultHeartRate, setDefaultHeartRate] = useState({
    defaultLow: 60,
    defaultHigh: 100,
  });
  const [values, setValues] = useState([{ x: 0, y: 0 }]);
  const [lowest, setLowest] = useState(0);
  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);
  const [statistics, setStatistics] = useState({
    above: 0,
    normal: 0,
    below: 0,
  });

  useEffect(() => {
    fetchMonitoringReports();
  }, []);

  const fetchMonitoringReports = async () => {
    const myHeart = [...monitoringData];

    if (myHeart.length > 0) {
      // Store glucose values in chronological order

      let valueInChro = [];
      myHeart
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          let value;

          if (item.detail.times > 140) {
            value = 140;
          } else {
            value = item.detail.times;
          }

          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

      setHeartRates(myHeart);
      setStatistics({
        above: summary?.heartRate?.statistics.above || 0,
        normal: summary?.heartRate?.statistics.normal || 0,
        below: summary?.heartRate?.statistics.below || 0,
      });
      setValues(valueInChro);
      setAverage(summary?.heartRate?.average || 0);
      setHighest(summary?.heartRate?.highest || 0);
      setLowest(summary?.heartRate?.lowest || 0);
    } else {
      setValues([{ x: 0, y: 0 }]);
    }

    // Store default
    setDefaultHeartRate({
      defaultLow: 60,
      defaultHigh: 100,
    });
  };

  return {
    heartRates,
    defaultHeartRate,
    values,
    lowest,
    highest,
    average,
    statistics,
  };
};

export { useHooks };
