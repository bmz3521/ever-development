import React from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { Images } from '@config';
import styles from './styles';

export default function StepProgress({ status }) {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      {/* STEP 1 */}
      <Image source={Images.DoctorPending} style={styles(theme).imageIcon} />
      <View
        style={
          [
            `DOCTOR_CONFIRM`,
            `DOCTOR_PENDING_NOTE`,
            `DOCTOR_COMPLETED`,
            `PHARMACY_PENDING`,
            `PHARMACY_CONFIRM`,
            `PHARMACY_PENDING_NOTE`,
            `PHARMACY_COMPLETED`,
          ].includes(status)
            ? styles(theme).progressLineActive
            : styles(theme).progressLineInactive
        }
      />

      {/* STEP 2 */}
      <Image
        source={
          [
            `DOCTOR_COMPLETED`,
            `PHARMACY_PENDING`,
            `PHARMACY_CONFIRM`,
            `PHARMACY_COMPLETED`,
            `PHARMACY_IN_WAITING_ROOM`,
            `PHARMACY_PENDING_NOTE`,
            `COMPLETED`,
          ].includes(status)
            ? Images.DoctorCompleted
            : Images.DoctorCompletedInactive
        }
        style={styles(theme).imageIcon}
      />
      <View
        style={
          [
            `PHARMACY_PENDING`,
            `PHARMACY_CONFIRM`,
            `PHARMACY_PENDING_NOTE`,
            `PHARMACY_COMPLETED`,
          ].includes(status)
            ? styles(theme).progressLineActive
            : styles(theme).progressLineInactive
        }
      />

      {/* STEP 3 */}
      <Image
        source={
          [
            `PHARMACY_PENDING`,
            `PHARMACY_CONFIRM`,
            `PHARMACY_PENDING_NOTE`,
            `PHARMACY_COMPLETED`,
          ].includes(status)
            ? Images.PharmacistPending
            : Images.PharmacistPendingInactive
        }
        style={styles(theme).imageIcon}
      />
      <View
        style={
          [`PHARMACY_PENDING_NOTE`, `PHARMACY_COMPLETED`].includes(status)
            ? styles(theme).progressLineActive
            : styles(theme).progressLineInactive
        }
      />
      <Image
        source={
          [`PHARMACY_COMPLETED`].includes(status)
            ? Images.PharmacistCompleted
            : Images.PharmacistCompletedInactive
        }
        style={styles(theme).imageIcon}
      />
    </View>
  );
}
