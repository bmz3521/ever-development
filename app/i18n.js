import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-locize-backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locizeOptions = {
  projectId: 'e7853ee1-5b0c-47ee-8b35-aa9e898f428c',
  apiKey: '5a5e379c-7e5c-4a45-bb26-dd977bfc78f0',
  // referenceLng: 'en',
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  //detect user lng from AsyncStorage
  detect: async callback => {
    try {
      const userLang = await AsyncStorage.getItem('user_lang');
      if (userLang) {
        return callback(userLang);
      } else {
        return callback('th');
      }
    } catch (err) {
      console.log('Error reading user language from AsyncStorage', err);
    }
  },
  //save user selected language to AsyncStorage
  cacheUserLanguage: async language => {
    try {
      await AsyncStorage.setItem('user_lang', language);
    } catch (err) {
      console.log('Error save user language in AsyncStorage', err);
    }
  },
};

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init(
    {
      namespace: 'translation',
      ns: ['translation'],
      fallbackLng: 'th',
      debug: true,
      saveMissing: false,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: locizeOptions,
    },
    (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    },
  );

export default i18n;
