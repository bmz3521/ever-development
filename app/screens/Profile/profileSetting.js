import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Image } from '@components';
import useStyles from './styles';
import { Images } from '@config';
import { useSelector } from 'react-redux';
import Ionics from 'react-native-vector-icons/Ionicons';
import i18next from 'i18next';
function ProfileSetting({ navigation }) {
  const user = useSelector(state => state.user);
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('ProfileStack', {
          screen: 'SettingInfo',
        });
      }}
      style={styles.topCard}
    >
      {user.data?.img ? (
        <Image
          style={styles.profile}
          source={{
            uri: user.data?.img,
          }}
        />
      ) : (
        <Image style={styles.profile} source={Images.avata2} />
      )}
      <View style={styles.content}>
        <Text style={styles.name}>
          {user?.data?.firstname} {user?.data?.lastname}
        </Text>
        <View style={styles.buttonText}>
          <Text style={styles.textButtonLabel}>
            {i18next.t('PROFILE_MANAGE_INFO')}{' '}
          </Text>
          <Ionics
            style={styles.ionicIcons}
            size={18}
            name="ios-chevron-forward"
            color="#ccc"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProfileSetting;
