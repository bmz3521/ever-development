import Fitness from '@ovalmoney/react-native-fitness';
import { PERMISSIONS } from './constants';

export const checkIsAuthorized = async () => {
  const isAuthorized = await Fitness.isAuthorized(PERMISSIONS);
  return { isIosManual: false, isAuthorized };
};

export const requestFitness = async () => {
  let isAuthorized = await Fitness.isAuthorized(PERMISSIONS);
  if (!isAuthorized) {
    isAuthorized = await Fitness.requestPermissions(PERMISSIONS);
    return { isIosManual: false, isAuthorized };
  }
  return { isIosManual: false, isAuthorized };
};
