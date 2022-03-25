import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "app/configs";
import Theme from "app/style/Theme";
import { width } from "app/configs/Const";
import useModalAnimation from "app/hooks/useModalAnimation";
import Text from "app/elements/Text";
import ButtonIcon from "app/elements/Buttons/ButtonIcon";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import { ICON } from "app/images/Icon";
import DoctorRate from "app/patient-components/DoctorRate";

interface MyAnswerProps {
  doctor: {
    name: string;
    faculty: string;
    rate: number;
    numberOfReviews: number;
    avatar: ImageSourcePropType;
  };
  image?: ImageSourcePropType;
  answer: string;
  doctorsAgreed?: any;
  numberAgreed: number;
  numberThanks: number;
}

export default memo(
  ({
    doctor,
    image,
    answer,
    numberAgreed,
    numberThanks,
    doctorsAgreed,
  }: MyAnswerProps) => {
    const onEdit = useCallback(() => {}, []);
    const { visible, open, close, transY } = useModalAnimation();
    return (
      <View style={styles.container}>
        <View
          style={{
            padding: 16,
            borderBottomColor: Colors.WhiteSmoke,
            borderBottomWidth: 1,
          }}
        >
          <DoctorRate {...doctor} />
        </View>
        {image && <Image source={image} style={{ width: "100%" }} />}
        <View
          style={{
            padding: 16,
            borderBottomColor: Colors.WhiteSmoke,
            borderBottomWidth: 1,
          }}
        >
          <Text size={15} lineHeight={24}>
            {answer}
          </Text>
          <Text
            size={13}
            lineHeight={16}
            color={Colors.GrayBlue}
            marginTop={16}
          >
            {numberThanks} Thanks
          </Text>
          <View style={{ ...Theme.flexRowSpace, marginTop: 16 }}>
            <ButtonIcon
              icon={require("app/images/Icon/ic_option.png")}
              tintColor={Colors.GrayBlue}
              size={50}
              borderRadius={12}
              style={{
                borderWidth: 1,
                borderColor: Colors.Platinum,
              }}
            />
            <ButtonLinear
              title="Edit"
              styleButton={{ flex: 1, marginLeft: 16 }}
              style={{ marginTop: 0 }}
              colors={[Colors.TealBlue, Colors.TealBlue]}
              onPress={onEdit}
              leftChildren={
                <Image
                  source={require("app/images/Icon/ic_edit.png")}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 8,
                    tintColor: Colors.White,
                  }}
                />
              }
            />
          </View>
        </View>
        <TouchableOpacity
          style={{ padding: 16, ...Theme.flexRowSpace }}
          onPress={open}
          activeOpacity={0.54}
        >
          <View style={Theme.flexRow}>
            <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
              {numberAgreed} doctors agree
            </Text>
          </View>
          <Image source={ICON.arrowRight} />
        </TouchableOpacity>
        {/* <ModalDoctorAgreed {...{ visible, close, transY }} /> */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginTop: 14,
    backgroundColor: Colors.Red,
  },
});
