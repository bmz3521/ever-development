import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk-next';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '@actions';
import { useChatContext } from 'app/hooks/useGetStream';
import { getUniqueId } from 'react-native-device-info';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import LineLogin from '@xmartlabs/react-native-line';

const useHooks = ({ navigation }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [thirdLogin, setThirdLogin] = useState(false);
  const [fail, setFail] = useState(true);
  const [errorThirdParty, setErrorThirdParty] = useState(null);
  const { StreamChat } = useChatContext();
  useEffect(() => {
    const checkNetwork = () => {
      NetInfo.fetch().then(state => {
        console.log(state);
        console.log('Is isInternetReachable?', state.isInternetReachable);
        const notConnected = () => {
          Alert.alert(
            'ไม่สามารถเชื่อมต่อได้',
            'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
            [
              {
                text: 'ตกลง',
                // onPress: () => navigation.navigate('Home'),
              },
            ],
          );
        };

        if (state?.isInternetReachable === false) {
          notConnected();
        }
      });
    };
    checkNetwork();
  }, []);

  useEffect(() => {
    if (authReducer.isAuthenticated) {
      /** NOTE Login with streamChat */
      StreamChat.login(user.data);
      setFail(true);
      navigation.navigate('Home');
    }
  }, [authReducer.isAuthenticated]);

  const handleChangeText = useCallback(
    label => text => {
      switch (label) {
        case 'email':
          setEmail(text);
          break;

        case 'password':
          setPassword(text);
          break;

        default:
          break;
      }
    },
    [],
  );

  const handleLoginWithEmail = useCallback(
    () => async () => {
      const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let result = email.match(pattern);
      let emailInput = result ? email : email + '@everapp.io';
      const credential = {
        email: emailInput.toLocaleLowerCase('en'),
        password: password,
      };
      dispatch(AuthActions.login(credential));
      setFail(false);
    },
    [email, password],
  );

  const handleLoginWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const info = await GoogleSignin.signIn();
      const payload = {
        provider: 'google',
        profile: {
          id: info.user.id,
          email: info.user.email,
          givenName: info.user.givenName,
          familyName: info.user.familyName,
          img: info.user.photo,
        },
        accessToken: info.idToken,
      };
      dispatch(AuthActions.loginWithThirdParty(payload));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorThirdParty('user Google Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorThirdParty('PlayServices not available');
      } else {
        setErrorThirdParty(
          'The authorization attempt failed for an unknown reason.',
        );
      }
    }
  }, []);

  const _responseInfoCallback = async (error, profile, accessToken) => {
    if (error) {
      setErrorThirdParty(
        'The authorization attempt failed for an unknown reason.',
      );
      return;
    } else {
      const payload = {
        provider: 'facebook',
        profile,
        accessToken,
      };
      dispatch(AuthActions.loginWithThirdParty(payload));
    }
  };

  const infoRequest = accessToken =>
    new GraphRequest(
      '/me?fields=id,email,first_name,last_name',
      { accessToken },
      (error, profile) => _responseInfoCallback(error, profile, accessToken),
    );

  const _facebookLoginHandler = useCallback(async () => {
    LoginManager.logOut();
    try {
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'enabled',
      );
      if (result.isCancelled) {
      } else {
        const fetchCurrentToken = await AccessToken.getCurrentAccessToken();
        const currentToken = fetchCurrentToken.accessToken;
        new GraphRequestManager().addRequest(infoRequest(currentToken)).start();
      }
    } catch (error) {
      setErrorThirdParty(
        'The authorization attempt failed for an unknown reason.',
      );
    }
  }, []);

  const handleLoginWithFacebook = async () => {
    try {
      await _facebookLoginHandler();
    } catch (error) {
      setErrorThirdParty(error.message);
    }
  };

  const handleLoginWithApple = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const deviceId = getUniqueId();
      let {
        identityToken,
        user,
        email,
        fullName,
        nonce,
      } = appleAuthRequestResponse;
      if (!email) {
        const response = jwt_decode(appleAuthRequestResponse.identityToken);
        email = response.email;
      }
      if (identityToken) {
        const payload = {
          provider: 'apple',
          profile: {
            id: user,
            identityToken: identityToken,
            email: email, // 'dfsdfsdf@privaterelay.appleid.com' default is hidden
            givenName: fullName.givenName,
            familyName: fullName.familyName,
            deviceId: deviceId,
          },
          accessToken: {
            nonce,
            identityToken,
          },
        };

        dispatch(AuthActions.loginWithThirdParty(payload));
      } else {
        console.log('No identityToken');
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        setErrorThirdParty('user cancelled Apple Sign-in');
      } else if (error.code === AppleAuthError.FAILED) {
        setErrorThirdParty('The authorization attempt failed.');
      } else if (error.code === AppleAuthError.INVALID_RESPONSE) {
        setErrorThirdParty(
          'The authorization request received an invalid response.',
        );
      } else if (error.code === AppleAuthError.NOT_HANDLED) {
        setErrorThirdParty('The authorization request wasnt handled.');
      } else {
        setErrorThirdParty(
          'The authorization attempt failed for an unknown reason.',
        );
      }
    }
  }, []);

  const handleLoginWithLine = async () => {
    try {
      const loginResult = await LineLogin.login({
        scopes: ['openid', 'profile'],
      });
      const payload = {
        provider: 'line',
        profile: {
          displayName: loginResult.userProfile.displayName,
          userID: loginResult.userProfile.userID.toLowerCase() /** NOTE LowerCase to prevent error when save to E-mail to database contact Guy for more information */,
        },
      };
      dispatch(AuthActions.loginWithThirdParty(payload));
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginWithOtp = async () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInWithOTP',
    });
  };

  return {
    email,
    password,
    ready: !!email && !!password,
    fail,
    errorThirdParty,
    loading: authReducer.loading,
    thirdLogin,
    auth: authReducer,
    events: {
      handleThirdLogin: setThirdLogin,
      handleChangeText,
      handleLoginWithEmail,
      line: handleLoginWithLine,
      google: handleLoginWithGoogle,
      facebook: handleLoginWithFacebook,
      apple: handleLoginWithApple,
      otp: handleLoginWithOtp,
      setErrorThirdParty,
    },
  };
};

export { useHooks };
