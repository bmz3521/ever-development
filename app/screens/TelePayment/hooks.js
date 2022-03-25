import { Alert } from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

export const useHooks = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!user.data?.verifyId) {
      Alert.alert(i18next.t('MODAL_WARNING'), i18next.t('MODAL_NOT_VERIFIED'), [
        {
          text: i18next.t('CONFIRM_BUTTON'),
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    }
  }, []);

  return {
    user,
    auth,
  };
};
