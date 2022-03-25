import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const monitoringData = useSelector(state => state.monitoring.glucose);
  const summary = useSelector(state => state.monitoring.summary);

  const [glucose, setGlucose] = useState([]);
  const [defaultGlucose, setDefaultGlucose] = useState({
    defaultLow: 70,
    defaultHigh: 130,
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
    const myGlucose = [...monitoringData];

    if (myGlucose.length > 0) {
      // Store glucose values in chronological order
      let valueInChro = [];
      myGlucose
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          let value;

          if (item.detail.glucose < 50) {
            value = 50;
          } else if (item.detail.glucose > 300) {
            value = 300;
          } else {
            value = item.detail.glucose;
          }
          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

      setGlucose(myGlucose);
      setStatistics({
        above: summary?.glucose?.statistics.above || 0,
        normal: summary?.glucose?.statistics.normal || 0,
        below: summary?.glucose?.statistics.below || 0,
      });
      setValues(valueInChro);
      setAverage(summary?.glucose?.average || 0);
      setHighest(summary?.glucose?.highest || 0);
      setLowest(summary?.glucose?.lowest || 0);
    } else {
      setValues([{ x: 0, y: 0 }]);
    }
  };

  return {
    glucose,
    defaultGlucose,
    values,
    lowest,
    highest,
    average,
    statistics,
  };
};

export { useHooks };
