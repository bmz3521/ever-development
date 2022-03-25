import React, { memo, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Text from "app/elements/Text";
import Theme from "app/style/Theme";
import scale from "app/utils/scale";
import { Routes } from "app/configs";
import InputApp from "app/elements/InputApp";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import AvatarProfile from "app/patient-components/UpdateProfile/BasicInformation/AvatarProfile";
import { useLayoutEffect } from "react";
import ButtonIconHeader from "app/elements/Buttons/ButtonIconHeader";
import Colors from "app/configs/Colors";
import { ICON } from "app/images/Icon";

const BasicInformation = memo(() => {
  const [firstName, setFirstName] = useState("Devin");
  const [lastName, setLastName] = useState("Sheton");

  const { navigate, setOptions } = useNavigation();

  const onGoToOtherInfo = useCallback(() => {
    navigate(Routes.OtherInformation);
  }, [navigate]);
  const onUploadAvatar = useCallback(() => { }, []);
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => <View style={{ ...Theme.headerBackGround }} />,
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          size={scale(13)}
          lineHeight={scale(16)}
          bold
          marginTop={scale(32)}
        >
          Step 1 of 3
        </Text>
        <Text
          size={scale(24)}
          lineHeight={scale(28)}
          bold
          marginTop={scale(16)}
        >
          Your Profile
        </Text>
        <Text size={scale(13)} lineHeight={scale(22)} marginTop={scale(16)}>
          Update your profile to get better the answer from
          {"\n"}doctor.
        </Text>
        <AvatarProfile onPress={onUploadAvatar} />
        <InputApp
          title={"First Name"}
          marginTop={scale(38)}
          value={firstName}
          onChangeText={setFirstName}
        />
        <InputApp
          title={"Last Name"}
          marginTop={scale(24)}
          value={lastName}
          onChangeText={setLastName}
        />
        <ButtonLinear
          title={"Continue"}
          children={
            <Image
              source={ICON.next}
              style={styles.buttonChildren}
            />
          }
          onPress={onGoToOtherInfo}
          style={styles.buttonLinear}
        />
      </ScrollView>
    </View>
  );
});

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingHorizontal: 24
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  inputApp: {
    marginTop: scale(24),
  },
  firstName: {
    marginTop: scale(38),
  },
  homeAddress: {
    marginTop: scale(32),
  },
  buttonLinear: {
    marginTop: scale(24),
  },
  genders: {
    marginTop: scale(24),
    ...Theme.flexRow,
    ...Theme.center,
  },
});
