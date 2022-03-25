import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.temperature);
  const summary = useSelector(state => state.monitoring.summary);

  const [bodyTemp, setBodyTemp] = useState([]);
  const [defaultBodyTemp, setDefaultBodyTemp] = useState({
    defaultLow: 35.0,
    defaultHigh: 37.8,
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
    const myBodyTemp = [...monitoringData];

    if (myBodyTemp.length > 0) {
      // Store bodyTemp values in chronological order
      let valueInChro = [];
      myBodyTemp
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          let value;

          if (item.detail.celsius < 30) {
            value = 30;
          } else if (item.detail.celsius > 40) {
            value = 40;
          } else {
            value = item.detail.celsius;
          }
          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

      setBodyTemp(myBodyTemp);
      setStatistics({
        above: summary?.temperature?.statistics.above || 0,
        normal: summary?.temperature?.statistics.normal || 0,
        below: summary?.temperature?.statistics.below || 0,
      });
      setValues(valueInChro);
      setAverage(summary?.temperature?.average || 0);
      setHighest(summary?.temperature?.highest || 0);
      setLowest(summary?.temperature?.lowest || 0);
    } else {
      setValues([{ x: 0, y: 0 }]);
    }
  };

  return {
    bodyTemp,
    defaultBodyTemp,
    values,
    lowest,
    highest,
    average,
    statistics,
  };
};

export { useHooks };
