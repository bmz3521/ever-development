import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '@components';
import useStyles from './styles';
import i18next from 'i18next';

const UNAUTH_TITLE = {
  th: 'กรุณาเข้าสู่ระบบ',
  en: 'Sign in',
};

const UnAuthentication = ({ route, navigation }) => {
  const styles = useStyles();
  const { title, desp } = route?.params ?? {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ paddingVertical: 20 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>
              {title ? i18next.t(title) : UNAUTH_TITLE[i18next.language]}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.containerDesp} />
            <Text style={styles.textDesp}>{i18next.t(desp)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('AuthStack', { screen: 'SignIn' })}
        >
          <Text style={styles.textBtn}>{i18next.t('UNAUTH_SIGNIN')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UnAuthentication;
