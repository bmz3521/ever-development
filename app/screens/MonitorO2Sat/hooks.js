import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.oxygen);
  const summary = useSelector(state => state.monitoring.summary);

  const [oxygens, setOxygens] = useState([]);
  const [defaultOxygen, setDefaultOxygen] = useState({
    defaultLow: 90,
    defaultDangerous: 95,
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
    const myO2 = [...monitoringData];

    if (myO2.length > 0) {
      // Store temperature values in chronological order
      let valueInChro = [];
      myO2
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          let value;

          if (item.detail.percent < 80) {
            value = 80;
          } else if (item.detail.percent > 100) {
            value = 100;
          } else {
            value = item.detail.percent;
          }
          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

      setOxygens(myO2);
      setStatistics({
        above: summary?.oxygen?.statistics.above || 0,
        normal: summary?.oxygen?.statistics.normal || 0,
        below: summary?.oxygen?.statistics.below || 0,
      });
      setValues(valueInChro);
      setAverage(summary?.oxygen?.average || 0);
      setHighest(summary?.oxygen?.highest || 0);
      setLowest(summary?.oxygen?.lowest || 0);
    } else {
      setValues([{ x: 0, y: 0 }]);
    }
    // Store default
    setDefaultOxygen({
      defaultLow: 90,
      defaultDangerous: 95,
    });
  };

  return {
    oxygens,
    defaultOxygen,
    values,
    lowest,
    highest,
    average,
    statistics,
  };
};

export { useHooks };
