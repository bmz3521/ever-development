import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import Fitness from '@ovalmoney/react-native-fitness';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

const permissions = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read,
  },
  {
    kind: Fitness.PermissionKinds.HeartRate,
    access: Fitness.PermissionAccesses.Read,
  },
];

const useHooks = ({ navigation }) => {
  const monitoring = useSelector(state => state.monitoring);
  const user = useSelector(state => state.user);

  const [notAuthorized, setNotAuthorized] = useState(false);

  const [latestGlucose, setLatestGlucose] = useState(null);
  const [latestPressure, setLatestPressure] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);
  const [latestBodyTemp, setLatestBodyTemp] = useState(null);
  const [latestO2Sat, setLatestO2Sat] = useState(null);
  const [latestHeart, setLatestHeart] = useState(null);

  const [progress, setProgress] = useState(0.0);
  const [dailySteps, setDailySteps] = useState(0);
  const [weeklySteps, setWeeklySteps] = useState([]);
  const [weeklyHeartRates, setWeeklyHeartRates] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    getFitnessData();
  }, []);

  useEffect(() => {
    user.data?.verifyId && fetchMonitoringReports();
  }, [
    monitoring.glucose,
    monitoring.pressure,
    monitoring.weight,
    monitoring.temperature,
    monitoring.heart,
    monitoring.oxygen,
  ]);

  /* Fitness */

  const getFitnessData = useCallback(async () => {
    let isAuthorized = await Fitness.isAuthorized(permissions);
    if (!isAuthorized) return setNotAuthorized(true);

    const getThreshold = allItems => {
      let copy = allItems.slice();
      const threshold = copy.sort((a, b) => a.quantity - b.quantity).pop()
        .quantity;

      let t =
        threshold <= 1000
          ? 1000
          : threshold <= 3000
          ? 3000
          : threshold <= 5000
          ? 5000
          : 7000;
      setThreshold(t);
    };

    const getDailySteps = async () => {
      let currentDate = new Date();
      let period = {
        startDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0,
        ),
        endDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59,
        ),
        interval: 'days',
      };

      return await Fitness.getSteps(period);
    };

    const getWeeklySteps = async () => {
      let currentDate = new Date();

      let last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      let period = {
        startDate: new Date(
          last7Days.getFullYear(),
          last7Days.getMonth(),
          last7Days.getDate(),
          0,
          0,
          0,
        ),
        endDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59,
        ),
        interval: 'days',
      };

      return await Fitness.getSteps(period);
    };

    const getWeeklyHeartRate = async () => {
      let currentDate = new Date();

      let last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      let period = {
        startDate: new Date(
          last7Days.getFullYear(),
          last7Days.getMonth(),
          last7Days.getDate(),
          0,
          0,
          0,
        ),
        endDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59,
        ),
        interval: 'days',
      };

      return await Fitness.getHeartRate(period);
    };

    const trackedDailySteps = await getDailySteps();
    const trackedWeeklySteps = await getWeeklySteps();
    const trackedHeartRate = await getWeeklyHeartRate();

    if (trackedHeartRate.length > 0) {
      trackedHeartRate.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate),
      );

      if (trackedHeartRate.length === 8) {
        setWeeklyHeartRates(trackedHeartRate.slice(1, 8));
      } else {
        setWeeklyHeartRates(trackedHeartRate);
      }
    }

    if (trackedWeeklySteps.length > 0) {
      if (trackedWeeklySteps.length === 8) {
        setWeeklySteps(trackedWeeklySteps.slice(1, 8));
        getThreshold(trackedWeeklySteps.slice());
      } else {
        setWeeklySteps(trackedWeeklySteps);
        getThreshold(trackedWeeklySteps.slice());
      }
    }

    if (trackedDailySteps.length > 0) {
      const steps = trackedDailySteps[0].quantity;
      setDailySteps(steps);

      if (steps < 500) {
        setProgress(0);
      } else if (steps >= 7000) {
        setProgress(1);
      } else if (steps >= 6500) {
        setProgress(0.92);
      } else if (steps >= 6000) {
        setProgress(0.85);
      } else if (steps >= 5500) {
        setProgress(0.77);
      } else if (steps >= 5000) {
        setProgress(0.7);
      } else if (steps >= 4500) {
        setProgress(0.63);
      } else if (steps >= 4000) {
        setProgress(0.56);
      } else if (steps >= 3500) {
        setProgress(0.49);
      } else if (steps >= 3000) {
        setProgress(0.42);
      } else if (steps >= 2500) {
        setProgress(0.35);
      } else if (steps >= 2000) {
        setProgress(0.28);
      } else if (steps >= 1300) {
        setProgress(0.21);
      } else if (steps >= 501) {
        setProgress(0.14);
      }
    } else {
      return;
    }
  }, [setDailySteps]);

  /* Telemonitoring */

  const fetchMonitoringReports = async () => {
    // Set latest glucose value
    const glucose = monitoring.glucose;

    if (glucose !== null && glucose !== undefined && glucose.length > 0) {
      let latest = glucose[0].detail.glucose;

      let result;
      let color;
      let bg;

      let barLowestLimit = 70;
      let barHighestLimit = 130;
      let barVisualRange = 60;
      let barBallValue = latest ? latest : 0;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }
      const glucoseLow = 70;
      const glucoseHigh = 130;
      if (latest < glucoseLow) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (latest >= glucoseLow && latest <= glucoseHigh) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestGlucose({
        glucose: latest,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    // Set latest pressure value
    const pressure = monitoring.pressure;

    if (pressure !== null && pressure !== undefined && pressure.length > 0) {
      let high = pressure[0].detail.high;
      let low = pressure[0].detail.low;

      let defaultTopHigh = 140;
      let defaultTopLow = 90;
      let defaultBottomHigh = 90;
      let defaultBottomLow = 60;

      let barLowestLimit = 75;
      let barHighestLimit = 115;
      let barVisualRange = 40;
      let barBallValue = (high + low) / 2;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }
      let result;
      let color;
      let bg;

      if (
        high >= defaultTopLow &&
        high <= defaultTopHigh &&
        low >= defaultBottomLow &&
        low <= defaultBottomHigh
      ) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else if (high > defaultTopHigh || low > defaultBottomHigh) {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (high < defaultTopLow || low < defaultBottomLow) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestPressure({
        high: high,
        low: low,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    // Set latest weight value

    const weight = monitoring.weight;

    if (weight !== null && weight !== undefined && weight.length > 0) {
      let latest = weight[0].detail.bmi;

      let barLowestLimit = 18.5;
      let barHighestLimit = 22.99;
      let barVisualRange = barHighestLimit - barLowestLimit;
      let barBallValue = latest ? latest : 0;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }

      let result;
      let color;
      let bg;

      if (latest < 18.5) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (latest >= 18.5 && latest <= 22.99) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestWeight({
        bmi: latest,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    // Set latest body temp value

    const bodyTemp = monitoring.temperature;

    if (bodyTemp !== null && bodyTemp !== undefined && bodyTemp.length > 0) {
      let latest = bodyTemp[0].detail.celsius;

      let result;
      let color;
      let bg;

      let barLowestLimit = 35.0;
      let barHighestLimit = 37.8;
      let barVisualRange = barHighestLimit - barLowestLimit;
      let barBallValue = latest ? latest : 0;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }

      const bodyTempLow = 35.0;
      const bodyTempHigh = 37.8;

      if (latest < bodyTempLow) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (latest >= bodyTempLow && latest <= bodyTempHigh) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestBodyTemp({
        celsius: latest,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    // Set latest Heart rate value
    const heart = monitoring.heart;

    if (heart !== null && heart !== undefined && heart.length > 0) {
      let latest = heart[0].detail.times;

      let result;
      let color;
      let bg;

      const heartLow = 60;
      const heartHigh = 100;

      let barLowestLimit = heartLow;
      let barHighestLimit = heartHigh;
      let barVisualRange = barHighestLimit - barLowestLimit;
      let barBallValue = latest ? latest : 0;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }

      if (latest < heartLow) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (latest >= heartLow && latest <= heartHigh) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestHeart({
        times: latest,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    // Set latest O2 value
    const o2 = monitoring.oxygen;

    if (o2 !== null && o2 !== undefined && o2.length > 0) {
      let latest = o2[0].detail.percent;

      let result;
      let color;
      let bg;

      const o2Low = 90;
      const o2High = 95;

      let barLowestLimit = o2Low;
      let barHighestLimit = o2High;
      let barVisualRange = barHighestLimit - barLowestLimit;
      let barBallValue = latest ? latest : 0;
      let barBallValueFromLowestLimit = barBallValue - barLowestLimit;
      let barBallValuePositionInPercentage =
        barBallValueFromLowestLimit / barVisualRange;
      if (barBallValuePositionInPercentage < 0) {
        barBallValuePositionInPercentage = 0.01;
      } else if (barBallValuePositionInPercentage >= 1) {
        barBallValuePositionInPercentage = 1;
      }

      if (latest < o2Low) {
        result = 'ต่ำกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      } else if (latest >= o2High) {
        result = 'เกณฑ์ดี';
        color = '#8EF4CC';
        bg = '#E1E0E5';
      } else {
        result = 'สูงกว่าเกณฑ์';
        color = '#F2F2F2';
        bg = '#FDE1DE';
      }

      setLatestO2Sat({
        percent: latest,
        result: result,
        color: color,
        bg: bg,
        barBallValuePositionInPercentage: barBallValuePositionInPercentage,
      });
    }

    setDataLoading(false);
  };

  const navigationHandler = screenName => {
    navigation.push(screenName);
  };

  return {
    dataLoading,
    setDataLoading,
    notAuthorized,
    latestGlucose,
    latestPressure,
    latestWeight,
    latestBodyTemp,
    latestO2Sat,
    latestHeart,
    dailySteps,
    weeklySteps,
    weeklyHeartRates,
    progress,
    threshold,
    events: {
      fetchMonitoringReports,
      navigationHandler,
    },
  };
};

export { useHooks };
