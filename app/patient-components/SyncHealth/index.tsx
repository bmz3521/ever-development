import React, { memo } from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import Text from "app/elements/Text";
import ButtonBorder from "app/elements/Buttons/ButtonBorder";
import { Colors } from "app/configs";
import { ICON } from "app/images/Icon";
import Theme from "app/style/Theme";
import HealthDataItem from "app/patient-components/BookAppointment/HealthDataItem";

interface SyncHealthProps {
  style?: ViewStyle;
  healthData?: any;
  onOpenHealthModal?: () => void;
  onCloseHealth?: () => void;
}

const SyncHealth = memo(
  ({
    style,
    healthData,
    onOpenHealthModal,
    onCloseHealth,
  }: SyncHealthProps) => {
    return (
      <View style={style}>
        <Text bold size={13} lineHeight={16} marginTop={16}>
          Sync with Health Services
        </Text>
        <Text size={13} lineHeight={22} marginBottom={24} marginTop={16}>
          By importing your health data from Smart Devices, Doctor can better
          help you.
        </Text>
        <View>
          {healthData != null && healthData != undefined ? (
            <HealthDataItem {...healthData} onClose={onCloseHealth} />
          ) : (
            <View />
          )}
        </View>
        <ButtonBorder
          title="Select Health Data"
          color={Colors.GrayBlue}
          iconLeft={ICON.healthGuide}
          iconColor={Colors.DodgerBlue}
          onPress={onOpenHealthModal}
        />
        <View style={styles.bottomText}>
          <Image source={ICON.security} />
          <Text
            color={Colors.GrayBlue}
            size={13}
            lineHeight={16}
            marginLeft={8}
          >
            HIPAA Secure
          </Text>
        </View>
      </View>
    );
  }
);

export default SyncHealth;

const styles = StyleSheet.create({
  container: {},
  bottomText: {
    ...Theme.flexRowCenter,
    marginTop: 8,
  },
});
