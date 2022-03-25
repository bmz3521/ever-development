import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "app/elements/Text";
import { Colors } from "app/configs";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import { IMAGE } from "app/images/Image";

interface ModalDisconnectProps {}

const ModalDisconnect = memo((props: ModalDisconnectProps) => {
  const onPress = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 16,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        <Text center size={17} lineHeight={20} bold>
          Ooop! Connection Lost!
        </Text>
        <Text center size={13} lineHeight={22} marginTop={16} marginBottom={32}>
          There seem to be a problem with your connection.
        </Text>
        <Image
          source={IMAGE.noEntry}
          style={{ alignSelf: "center" }}
        />
        <ButtonLinear
          title={"OK"}
          onPress={onPress}
          style={{ width: "100%", marginTop: 40 }}
        />
      </View>
    </View>
  );
});

export default ModalDisconnect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Black68,
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
});
