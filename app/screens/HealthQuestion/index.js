import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { HealthQuestionForm, UserAuthentication } from '@components';
import { useSelector } from 'react-redux';
import useHooks from './hooks';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';

const HealthQuestion = ({ navigation }) => {
  const { user, auth } = useHooks({ navigation });

  if (auth && auth.isAuthenticated && !user.data.verifyId) {
    Alert.alert(i18next.t('MODAL_WARNING'), i18next.t('MODAL_NOT_VERIFIED'), [
      {
        text: i18next.t('CONFIRM_BUTTON'),
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  }

  useEffect(() => {
    const checkNetwork = () => {
      NetInfo.fetch().then(state => {
        console.log(state);
        console.log('Is isInternetReachable?', state.isInternetReachable);

        const notConnected = () => {
          Alert.alert(
            i18next.t('STATUS_NOCONNECTION'),
            i18next.t('STATUS_CHECKINTERNET'),
            [
              {
                text: i18next.t('STATUS_OK'),
                onPress: () => navigation.navigate('HealthActivity'),
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

  return <HealthQuestionForm navigation={navigation} user={user} />;
};

export default HealthQuestion;
