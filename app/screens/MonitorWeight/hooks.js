import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.weight);
  const summary = useSelector(state => state.monitoring.summary);

  const [bmis, setBmis] = useState([]);
  const [height, setHeight] = useState(0);
  const [defaultBmi, setDefaultBmi] = useState({
    defaultLow: 18.5,
    defaultHigh: 22.99,
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
    const myBmi = [...monitoringData];

    if (myBmi.length > 0) {
      // console.log(myBmi[myBmi.length - 1]);

      // extract height from the first element
      const extractedHeight = myBmi[0].detail.height;

      // Store glucose values in chronological order
      let valueInChro = [];
      myBmi
        .sort((a, b) => a.id - b.id)
        .map((item, index) =>
          valueInChro.push({
            x: index + 1,
            y: item.detail.bmi,
          }),
        );

      setHeight(extractedHeight);
      setBmis(myBmi);
      setStatistics({
        above: summary?.bmi?.statistics.above || 0,
        normal: summary?.bmi?.statistics.normal || 0,
        below: summary?.bmi?.statistics.below || 0,
      });
      setValues(valueInChro);
      setAverage(summary?.bmi?.average || 0);
      setHighest(summary?.bmi?.highest || 0);
      setLowest(summary?.bmi?.lowest || 0);
    } else {
      setValues([{ x: 0, y: 0 }]);
    }

    // Store default
    setDefaultBmi({
      defaultLow: 18.5,
      defaultHigh: 22.99,
    });
  };

  return {
    bmis,
    height,
    defaultBmi,
    values,
    lowest,
    highest,
    average,
    statistics,
  };
};

export { useHooks };
