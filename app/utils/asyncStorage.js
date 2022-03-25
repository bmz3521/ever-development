import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCESS_TOKEN,
  ACCESS_TELE_TOKEN,
  FCM_TOKEN,
  TIME,
  BOOKING_IDS,
  TIME_HOMEPAGE,
  VISIBLE_INTERCOM_BUTTON,
  INITIAL_LANGUAGE,
} from '@_config/constants';

export const getBookingIds = async () => {
  let bookingIds = [];
  try {
    const item =
      (await AsyncStorage.getItem(BOOKING_IDS)) || JSON.stringify([]);
    bookingIds = JSON.parse(item);
  } catch (error) {
    console.log(error.message);
    return Promise.reject([]);
  }

  return Promise.resolve(bookingIds);
};

export const addBookingId = async id => {
  let bookingIds = [];
  try {
    const item =
      (await AsyncStorage.getItem(BOOKING_IDS)) || JSON.stringify([]);
    bookingIds = JSON.parse(item);
    bookingIds.push(id);

    const _ = await AsyncStorage.setItem(
      BOOKING_IDS,
      JSON.stringify(bookingIds),
    );
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const setFcmToken = async resp => {
  try {
    await AsyncStorage.setItem(FCM_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getFcmToken = async () => {
  let token = '';
  try {
    const item = (await AsyncStorage.getItem(FCM_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};
export const setTime = async resp => {
  try {
    await AsyncStorage.setItem(TIME, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getTime = async () => {
  let time = '';
  try {
    const item = (await AsyncStorage.getItem(TIME)) || JSON.stringify('');
    time = JSON.parse(item);
    return time;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};

export const clearBookingId = async () => {
  try {
    const _ = await AsyncStorage.setItem(BOOKING_IDS, JSON.stringify([]));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const getAccessToken = async () => {
  let token = '';
  try {
    const item =
      (await AsyncStorage.getItem(ACCESS_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return token;
};

export const setAccessToken = async resp => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const checkTimeHomePage = async () => {
  try {
    const time = (await AsyncStorage.getItem(TIME_HOMEPAGE)) || 0;
    return JSON.parse(time);
  } catch (error) {
    return Promise.reject();
  }
};

export const addTimeHomePage = async () => {
  try {
    const time = (await AsyncStorage.getItem(TIME_HOMEPAGE)) || 0;
    const item = JSON.parse(time);
    await AsyncStorage.setItem(TIME_HOMEPAGE, JSON.stringify(item + 1));
  } catch (e) {
    return Promise.reject();
  }
};

export const setTimeHomePage = async num => {
  try {
    await AsyncStorage.setItem(TIME_HOMEPAGE, JSON.stringify(num));
  } catch (e) {
    return Promise.reject();
  }
};

export const getAccessTeleToken = async () => {
  let token = '';
  try {
    const item =
      (await AsyncStorage.getItem(ACCESS_TELE_TOKEN)) || JSON.stringify('');
    token = JSON.parse(item);
    return token;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return token;
};

export const setAccessTeleToken = async resp => {
  try {
    await AsyncStorage.setItem(ACCESS_TELE_TOKEN, JSON.stringify(resp));
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const removeAccessToken = async () => {
  try {
    await AsyncStorage.multiRemove(['ACCESS_TOKEN', 'ACCESS_TELE_TOKEN']);
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }

  return Promise.resolve();
};

export const setIntercomBtnVisiblehandler = async () => {
  try {
    const currentState = await getIntercomBtnVisible();
    console.log('currentState', currentState);
    await AsyncStorage.setItem(
      VISIBLE_INTERCOM_BUTTON,
      JSON.stringify(!currentState),
    );
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
  return Promise.resolve();
};

export const setIntercomAfterReboot = async () => {
  try {
    await AsyncStorage.setItem(VISIBLE_INTERCOM_BUTTON, JSON.stringify(true));
  } catch (error) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const getIntercomBtnVisible = async () => {
  try {
    const value =
      (await AsyncStorage.getItem(VISIBLE_INTERCOM_BUTTON)) || JSON.parse(true);
    const visible = JSON.parse(value);
    return visible;
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

/** SECTION universal async storage */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const getItem = async (key, defaultValue = null) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.log(error.message);
    return Promise.reject();
  }
};

export const removeItem = async key => {
  await AsyncStorage.removeItem(key);
};
/** !SECTION */
