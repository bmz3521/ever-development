import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { Images } from '@config';

import useStyles from './styles';

const BUTTON_ITEM = {
  facebook: {
    icon: Images.facebook_signIn,
    title: 'Continue with Facebook',
  },
  google: {
    icon: Images.google_signIn,
    title: 'Continue with Google',
  },
  line: {
    icon: Images.line_signIn,
    title: 'Continue with Line',
  },
  otp: {
    icon: require('./smartphone.png'),
    title: 'Continue with Phone',
  },
};

const ThirdPartyLogin = props => {
  const styles = useStyles();
  const { onClickHandler, type } = props;
  useEffect(() => {
    if (type === 'google') {
      googleSigninConfig();
    }
  }, []);

  const googleSigninConfig = () => {
    GoogleSignin.configure({
      webClientId:
        '748290668890-io6nbf3sfu2kdb26elhki4hl9002trb3.apps.googleusercontent.com', // NOTE client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // NOTE if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // NOTE [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // NOTE [Android] specifies an account name on the device that should be used
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });
  };

  if (type === 'apple' && appleAuth.isSupported) {
    return (
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        cornerRadius={15}
        style={styles.appleButton}
        onPress={onClickHandler}
      />
    );
  }

  return (
    <View style={styles.loginBtn}>
      <TouchableOpacity full onPress={onClickHandler}>
        <View style={styles.container}>
          <Image source={BUTTON_ITEM[type].icon} style={styles.iconStyle} />
          <Text bold style={styles.text}>
            {BUTTON_ITEM[type].title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThirdPartyLogin;
