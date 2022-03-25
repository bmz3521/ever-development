import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Images, BaseColor } from '@config';
import RNBootSplash from 'react-native-bootsplash';
import { Image, Text } from '@components';
import styles from './styles';

export default function Loading(props) {
  const { navigation } = props;
  const params = props.route.params;
  const onProcess = () => {
    setTimeout(() => {
      navigation.replace('Main');
      if (params?.onLogOut) params?.onLogOut();
      RNBootSplash.hide({ duration: 3000 });
    }, 3000);
  };

  useEffect(() => {
    onProcess();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={Images.everLogo}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.txt}>
          Copyright 2021 Ever Medical Technologies.
        </Text>
        <Text style={styles.txt}>All Rights Reserved.</Text>
      </View>
    </View>
  );
}
