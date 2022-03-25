import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.pressure);
  const summary = useSelector(state => state.monitoring.summary);

  const [pressure, setPressure] = useState([]);
  const [defaultPressure, setDefaultPressure] = useState({
    defaultLow: 60,
    defaultHigh: 140,
  });
  const [highValues, setHighValues] = useState([{ x: 0, y: 0 }]);
  const [lowValues, setLowValues] = useState([{ x: 0, y: 0 }]);
  const [lowestOfHigh, setLowestOfHigh] = useState(0);
  const [highestOfHigh, setHighestOfHigh] = useState(0);
  const [lowestOfLow, setLowestOfLow] = useState(0);
  const [highestOfLow, setHighestOfLow] = useState(0);
  const [averageOfHigh, setAverageOfHigh] = useState(0);
  const [averageOfLow, setAverageOfLow] = useState(0);
  const [defaultTopHigh, setDefaultTopHigh] = useState(140);
  const [defaultTopLow, setDefaultTopLow] = useState(90);
  const [defaultBottomHigh, setDefaultBottomHigh] = useState(90);
  const [defaultBottomLow, setDefaultBottomLow] = useState(60);
  const [statistics, setStatistics] = useState({
    above: 0,
    normal: 0,
    below: 0,
  });

  useEffect(() => {
    fetchMonitoringReports();
  }, []);

  const fetchMonitoringReports = async () => {
    const myPressure = [...monitoringData];

    if (myPressure.length > 0) {
      // Store glucose values in chronological order
      let highInChro = [];
      let lowInChro = [];

      myPressure
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          let highValue;

          if (item.detail.high > 200) {
            highValue = 200;
          } else {
            highValue = item.detail.high;
          }

          highInChro.push({
            x: index + 1,
            y: highValue,
          });
          lowInChro.push({
            x: index + 1,
            y: item.detail.low,
          });
        });

      setPressure(myPressure);

      setStatistics({
        above: summary?.pressure?.statistics.above || 0,
        normal: summary?.pressure?.statistics.normal || 0,
        below: summary?.pressure?.statistics.below || 0,
      });
      setHighValues(highInChro);
      setLowValues(lowInChro);
      setAverageOfHigh(summary?.pressure?.averageOfHigh || 0);
      setAverageOfLow(summary?.pressure?.averageOfLow || 0);
      setHighestOfHigh(summary?.pressure?.systolicHigh || 0);
      setLowestOfHigh(summary?.pressure?.systolicLow || 0);
      setHighestOfLow(summary?.pressure?.diastolicHigh || 0);
      setLowestOfLow(summary?.pressure?.diastolicLow || 0);
    } else {
      setHighValues([{ x: 0, y: 0 }]);
      setLowValues([{ x: 0, y: 0 }]);
    }
  };

  return {
    pressure,
    defaultPressure,
    highValues,
    lowValues,
    lowestOfHigh,
    highestOfHigh,
    lowestOfLow,
    highestOfLow,
    averageOfHigh,
    averageOfLow,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
    statistics,
  };
};

export { useHooks };
