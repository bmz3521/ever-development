import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Images } from '@config';
import { Icon } from '@components';
import Intercom, { Visibility } from '@intercom/intercom-react-native';

const { width } = Dimensions.get('screen');

const IntercomButton = ({ setVisible }) => {
  // Intercom.setLauncherVisibility(Visibility.VISIBLE);
  // Intercom.setBottomPadding(110);

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <Pressable onPress={() => setVisible()}>
          {({ pressed }) => (
            <Icon style={styles.icon} name="times-circle" size={20} />
          )}
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            Intercom.displayMessenger();
          }}
        >
          {({ pressed }) => (
            <Image
              source={Images.everLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    padding: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2BA275',
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: width / 25,
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  icon: {
    // padding: 5,
    color: '#c0c0c0',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default IntercomButton;
