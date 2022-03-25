import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "app/elements/Text";
import Theme from "app/style/Theme";
import { width } from "app/configs/Const";

export default memo(() => {
  return (
    <View style={styles.container}>
      <Text>Healthy</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Theme.center,
    width: width,
  },
});
