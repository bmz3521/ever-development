import React, { useState, useEffect, useCallback, memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "app/elements/Text";
import { Colors, Routes } from "app/configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Theme from "app/style/Theme";
import scale from "app/utils/scale";
import InputApp from "app/elements/InputApp";
import validationEmail from "app/utils/validation/email";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "app/elements/HeaderButton";
import { useLayoutEffect } from "react";
import ButtonIconHeader from "app/elements/Buttons/ButtonIconHeader";

interface ForgetPasswordProps { }

const ForgetPassword = memo((props: ForgetPasswordProps) => {
  const [email, setEmail] = useState("lehieuds@gmail.com");
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);
  const { goBack, navigate, setOptions } = useNavigation();

  const onSendEmail = useCallback(() => {
    navigate(Routes.RecoveryPassword);
  }, [navigate]);

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => <View style={{ ...Theme.headerBackGround}} />,
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text type={"H2"} bold>
          Forget Password
        </Text>
        <Text type="P6" style={{ marginTop: 16 }}>
          Please enter your email below to receive your
        {"\n"}password reset instructions.
        </Text>
      </View>
      <InputApp
        title={"Email"}
        value={email}
        onChangeText={setEmail}
        marginTop={scale(40)}
        borderColor={isValidEmail ? Colors.TealBlue : Colors.Isabelline}
        autoFocus
      />
      <ButtonLinear title={"Send Email"} onPress={onSendEmail} style={{ marginTop: scale(24) }} />
    </View>
  );
});

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    ...Theme.center,
  },
  content: {
    marginTop: scale(40),
  },
  description: {
    marginTop: 16,
  },
});
