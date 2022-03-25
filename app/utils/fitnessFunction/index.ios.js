import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';
import { PERMISSIONS } from './constants';

export const checkIsAuthorized = async () => {
  const isAuthorized = await Fitness.isAuthorized(PERMISSIONS);
  if (isAuthorized) {
    const stepsYesterday = await Fitness.getSteps({
      startDate: moment()
        .subtract(1, 'day')
        .format(),
      endDate: moment().format(),
    });

    if (stepsYesterday.length === 0) {
      return { isIosManual: true, isAuthorized: true };
    } else {
      return { isIosManual: false, isAuthorized: true };
    }
  }
  return { isIosManual: false, isAuthorized: false };
};

export const requestFitness = async () => {
  let isAuthorized = await Fitness.isAuthorized(PERMISSIONS);
  if (!isAuthorized) {
    isAuthorized = await Fitness.requestPermissions(PERMISSIONS);
  }

  const stepsYesterday = await Fitness.getSteps({
    startDate: moment()
      .subtract(1, 'day')
      .format(),
    endDate: moment().format(),
  });

  if (stepsYesterday.length === 0) {
    return { isIosManual: true, isAuthorized: true };
  } else {
    return { isIosManual: false, isAuthorized: true };
  }
};
