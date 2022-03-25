import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "app/elements/Text";
import Theme from "app/style/Theme";
import { Colors } from "app/configs";
import { phonesAreaCodes } from "app/configs/Data";
import { TcodeArea } from "app/type/codeArea";

interface ButtonChangeCodeProps {
  codeArea: TcodeArea;
  onPress: () => void;
}

const ButtonChangeCode = memo((props: ButtonChangeCodeProps) => {
  const { codeArea } = props;
  const onShowModal = useCallback(() => {
    props.onPress && props.onPress();
  }, [props.onPress]);
  return (
    <TouchableOpacity style={styles.phoneAreaCode} onPress={onShowModal}>
      <Image source={codeArea.img} style={styles.flag} />
      <Text
        size={15}
        lineHeight={24}
        marginLeft={8}
        color={Colors.DarkJungleGreen}
      >
        {codeArea.code}
      </Text>
      <View style={styles.changePhoneCode}>
        <Image source={require("app/images/Icon/down.png")} />
      </View>
    </TouchableOpacity>
  );
});

export default ButtonChangeCode;

const styles = StyleSheet.create({
  container: {},
  phoneAreaCode: {
    width: 144,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Isabelline,
    backgroundColor: Colors.White,
    ...Theme.flexRow,
    paddingHorizontal: 16,
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  changePhoneCode: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
  flag: {
    width: 32,
    height: 20,
  },
});
