import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';
import i18next from 'i18next';

export default function Toast({ navigation, theme }) {
  const telemedicine = useSelector(state => state.telemedicine);
  const dispatch = useDispatch();

  const [currentStatus, setCurrentStatus] = useState('');

  const STATUS_WORDING = {
    DOCTOR_PENDING: i18next.t('MYBOOKINGUI_DOCTOR_PENDING_RB'),
    DOCTOR_CONFIRM: i18next.t('MYBOOKINGUI_DOCTOR_CONFIRMED_AT'),
    DOCTOR_JOIN: i18next.t('MYBOOKINGUI_DOCTOR_JOIN'),
    DOCTOR_PENDING_NOTE: i18next.t('MYBOOKINGUI_DOCTOR_PENDING_NOTE'),
    DOCTOR_COMPLETED: i18next.t('MYBOOKINGUI_DOCTOR_COMPLETED'),
    DOCTOR_DECLINE: i18next.t('MYBOOKINGUI_DOCTOR_DECLINED'),
    PHARMACY_PENDING: i18next.t('MYBOOKINGUI_PHAR_PENDING'),
    PHARMACY_CONFIRM: i18next.t('MYBOOKINGUI_PHAR_CONFIRMED'),
    PHARMACY_PENDING_NOTE: i18next.t('MYBOOKINGUI_PHAR_PENDING_NOTE'),
    PHARMACY_COMPLETED: i18next.t('MYBOOKINGUI_PHAR_COMPLETED'),
    PHARAMCY_DECLINE: i18next.t('MYBOOKINGUI_PHAR_DECLINED'),
    COMMUNITY_PHARMACIST_PENDING: i18next.t('MYBOOKINGUI_COMPHAR_PENDING'),
    COMMUNITY_PHARMACIST_CONFIRM: i18next.t('MYBOOKINGUI_COMPHAR_CONFIRMED'),
    COMMUNITY_PHARMACIST_PENDING_NOTE: i18next.t(
      'MYBOOKINGUI_COMPHAR_PENDING_NOTE',
    ),
    COMMUNITY_PHARMACIST_COMPLETED: i18next.t('MYBOOKINGUI_COMPHAR_COMPLETED'),
    COMMUNITY_PHARMACIST_DECLINE: i18next.t('MYBOOKINGUI_COMPHAR_DECLINED'),
  };

  useEffect(() => {
    dispatch(TelemedicineActions.getTeleData());
    setCurrentStatus(STATUS_WORDING[telemedicine.firebase.status] ?? '');
  }, []);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).message}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles(theme).textBig}
        >
          {i18next.t('TOAST_ICON_TITLE')}
        </Text>
        <Text style={styles(theme).textSmall}>{currentStatus}</Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate('VideoCall', {})}
        style={({ pressed }) => [styles(theme).btn]}
      >
        {({ pressed }) => (
          <Text style={[styles(theme).btnBig, { color: '#fff' }]}>
            {i18next.t('TOAST_ICON_BUTTON')}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = theme =>
  StyleSheet.create({
    container: {
      width: '95%',
      flexDirection: 'row',
      height: 70,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: theme.colors.greyBorder,
      position: 'absolute',
      bottom: 10,
      // right: width / 40,
      justifyContent: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    message: {
      flex: 1,
      alignItems: 'flex-start',
    },
    btn: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 12,
      justifyContent: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 6,
    },
    btnBig: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: theme.fontFamilyDefault,
    },
    textBig: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: theme.fontFamilyBold,
    },
    textSmall: {
      fontSize: 14,
      fontFamily: theme.fontFamilyDefault,
      color: '#8F8F8F',
    },
  });
