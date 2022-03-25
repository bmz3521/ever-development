import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "app/elements/Text";
import Theme from "app/style/Theme";
import scale from "app/utils/scale";
import { Colors, Routes } from "app/configs";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
interface SentVerifySuccessfulProps {}

const SentVerifySuccessful = memo((props: SentVerifySuccessfulProps) => {
  const { navigate } = useNavigation();

  const onGoToDashBoard = useCallback(() => {
    navigate(Routes.MainTab);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Image
        source={require("app/images/Avatar/avatar-2.png")}
        style={styles.successImage}
      />
      <Text size={20} lineHeight={24} bold>
        Welcome to Doctor Plus!
      </Text>
      <Text size={15} lineHeight={24} center marginTop={16}>
        Get help instantly from top doctor anytime,
        {"\n"}anywhere.
      </Text>
      <ButtonLinear
        title={"Go to Home Dashboard"}
        style={{ paddingHorizontal: 32, marginTop: scale(32) }}
        onPress={onGoToDashBoard}
      />
    </View>
  );
});

export default SentVerifySuccessful;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
    ...Theme.center,
  },
  successImage: {
    width: scale(160, true),
    height: scale(160, true),
    marginBottom: scale(55, true),
  },
});
