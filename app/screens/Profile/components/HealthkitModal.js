import React from 'react';
import { View, Text, Image, Modal, Pressable, StyleSheet } from 'react-native';
import i18next from 'i18next';
import { Images } from '@config';

function HealthkitModal({ theme, modal, onPress }) {
  return (
    <Modal animationType="fade" transparent={true} visible={modal}>
      <View style={styles(theme).outerContainer}>
        <View style={styles(theme).container}>
          <Text style={styles(theme).title}>
            {i18next.t('PROFILE_KIT_TITLE')}
          </Text>
          <View style={styles(theme).line} />
          <View style={styles(theme).innerContainer}>
            <View style={styles(theme).lineContainer}>
              <Text style={styles(theme).txtLeft}>
                1. {i18next.t('PROFILE_KIT_GOTO')} Settings
              </Text>
              <Image source={Images.ios_settings} style={styles(theme).img} />
            </View>

            <View style={styles(theme).lineContainer}>
              <Text style={styles(theme).txtLeft}>
                2. {i18next.t('PROFILE_KIT_GOTO')} Privacy
              </Text>
              <Image source={Images.ios_privacy} style={styles(theme).img} />
            </View>

            <View style={styles(theme).lineContainer}>
              <Text style={styles(theme).txtLeft}>
                3. {i18next.t('PROFILE_KIT_GOTO')} Health
              </Text>
              <Image source={Images.ios_health} style={styles(theme).img} />
            </View>

            <View style={styles(theme).lineContainer}>
              <Text style={styles(theme).txtLeft}>
                4. {i18next.t('PROFILE_KIT_GOTO')} Ever
              </Text>
              <Image source={Images.ios_ever} style={styles(theme).img} />
            </View>

            <View style={styles(theme).lineContainer}>
              <Text style={styles(theme).txtLeft}>
                5. {i18next.t('PROFILE_KIT_PRESS')}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles(theme).btn]}
          >
            {({ pressed }) => (
              <Text style={[styles(theme).btnTxt]}>
                {i18next.t('STATUS_OK')}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = theme =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
      backgroundColor: 'rgba(219,252,243,0.3)',
    },
    container: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingVertical: 10,
      marginHorizontal: 80,
      marginVertical: 280,
      borderRadius: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    innerContainer: {
      alignItems: 'flex-start',
    },
    line: {
      borderTopWidth: 1,
      borderColor: '#ccc',
      width: '100%',
    },
    title: {
      fontFamily: theme.fontFamilyBold,
      marginBottom: 10,
      textAlign: 'center',
    },
    txtLeft: {
      textAlign: 'left',
      marginRight: 10,
      fontFamily: theme.fontFamilyDefault,
    },
    lineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3,
    },
    img: { width: 30, height: 30 },
    btn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      marginVertical: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    btnTxt: {
      color: '#fff',
      fontFamily: theme.fontFamilyBold,
      textAlign: 'center',
    },
  });

export default HealthkitModal;
