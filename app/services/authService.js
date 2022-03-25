import { TokenAPI, UserAPI } from '@api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { refreshToken, resetPassword } from '@utils/request';
import { setAccessToken, removeAccessToken } from '@utils/asyncStorage';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import LineLogin from '@xmartlabs/react-native-line';
import { FIREBASE_USER, FIREBASE_PASS } from '@env';

const getCredential = data => {
  let pattern = /@everapp.io/i;
  let result = data?.email.match(pattern);
  let emailInput = result ? data.email : data.email + '@everapp.io';
  const credential = {
    email: emailInput,
    password: data.password,
  };
  return credential;
};

export function register(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.register(data);
      const credential = getCredential(data);
      const reponseLogin = await UserAPI.login(credential);
      await setAccessToken(reponseLogin);
      await firebaseLogin();
      const responseUserInfo = await UserAPI.getUserInformation(reponseLogin);
      resolve({ response, reponseLogin, responseUserInfo });
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function registerPhone(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.signupWithOtp(payload);
      resolve(response);
    } catch (e) {
      if (e.response) {
        reject(e.response);
      } else if (e.request) {
        reject(e.request);
      } else {
        reject({ message: e.message });
      }
    }
  });
}

export function verifyMobileNumberViaOtp(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.verifyMobileNumberViaOtp(payload);
      resolve(response);
    } catch (e) {
      if (e.response) {
        reject(e.response);
      } else if (e.request) {
        reject(e.request);
      } else {
        reject({ message: e.message });
      }
    }
  });
}

export function login(credential) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.login(credential);
      await setAccessToken(response);
      await firebaseLogin();
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e.response);
    }
  });
}

function firebaseLogin() {
  return new Promise(async (resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(FIREBASE_USER, FIREBASE_PASS)
      .then(response => {
        resolve(response);
      })
      .catch(_ => reject('Something is wrong with firebase login.'));
  });
}

export function loginWithThirdParty(credential) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.loginWithThirdParty(credential);
      await setAccessToken(response);
      await firebaseLogin();
      resolve(response);
    } catch (e) {
      if (e.response) {
        reject(e.response);
      } else if (e.request) {
        reject(e.request);
      } else {
        reject({ message: e.message });
      }
    }
  });
}

export function userInfos({ userId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getUserInformation({ userId });
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function logout({ fcmToken }) {
  return new Promise(async (resolve, reject) => {
    try {
      await removeAccessToken();
      const response = await UserAPI.logout({ fcmToken: fcmToken });
      await firebaseAuthLogout();
      resolve(response);
    } catch (e) {
      resolve({ err: e.response }); // NOTE To prevent users can't logging out from application when FCM token ​doesn't match in database
    }
  });
}

export function verifyToken(token) {
  return new Promise(async resolve => {
    try {
      const response = await TokenAPI.verify(token);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function refreshNewToken(token) {
  return new Promise(async resolve => {
    try {
      const response = await refreshToken(token);
      await setAccessToken(response);
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export function setNewPassword(token, password) {
  return new Promise(async resolve => {
    try {
      const response = await resetPassword(token, password);
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function getPaymentOmiseCustomerId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getOmiseCustomerId();
      resolve(response);
    } catch (e) {
      console.log('Error getPaymentOmiseCustomerId', e);
      reject({ err: e.response });
    }
  });
}

/** NOTE function for third party logout */
export function logoutForThirdParty(provider) {
  return new Promise(async (resolve, reject) => {
    try {
      if (provider === 'google') {
        const isLoggedIn = await GoogleSignin.isSignedIn();
        if (isLoggedIn) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          await firebaseAuthLogout();
        }
        resolve();
      } else if (provider === 'facebook') {
        const isLoggedIn = await isFacebookLoggedIn();
        if (isLoggedIn) {
          LoginManager.logOut();
          await firebaseAuthLogout();
        }
        resolve();
      } else if (provider === 'apple') {
        await firebaseAuthLogout();
      } else if (provider === 'line') {
        const isLoggedIn = await isLineLoggedIn();
        if (isLoggedIn) {
          LineLogin.logout();
          await firebaseAuthLogout();
        }
        resolve();
      } else if (provider === 'mobile') {
        await firebaseAuthLogout();
      } else {
        resolve();
      }
    } catch (e) {
      reject({ err: e.message });
    }
  });
}

/** SECTION Utils function */

function isLineLoggedIn() {
  return new Promise(async resolve => {
    try {
      const accessToken = await LineLogin.verifyAccessToken();
      resolve(accessToken);
    } catch (e) {
      resolve(false);
    }
  });
}

function isFacebookLoggedIn() {
  return new Promise(async (resolve, reject) => {
    try {
      const isLoggedIn = await AccessToken.getCurrentAccessToken();
      resolve(isLoggedIn);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

function firebaseAuthLogout() {
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(() => resolve('User signed out!'))
      .catch(e => resolve());
  });
}

/** !SECTION */
