import React, { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "app/configs";
import Theme from "app/style/Theme";
import Text from "app/elements/Text";
import ButtonLinear from "app/elements/Buttons/ButtonLinear";
import ButtonIcon from "app/elements/Buttons/ButtonIcon";
import useModalAnimation from "app/hooks/useModalAnimation";
import { ICON } from "app/images/Icon";
import DoctorRate from "app/patient-components/DoctorRate";
import ButtonBorder from "app/elements/Buttons/ButtonBorder";
import ButtonIconHeader from "app/elements/Buttons/ButtonIconHeader";

interface OtherAnswerProps {
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
  thanked: boolean;
}

export default memo(
  ({
    doctor,
    image,
    answer,
    doctorsAgreed,
    numberAgreed,
    numberThanks,
    thanked,
  }: OtherAnswerProps) => {
    const [itemThanked, setItemAgreed] = useState(thanked);
    const { visible, open, close, transY } = useModalAnimation();
    const onShowDoctorAgreed = useCallback(() => {
      open();
    }, []);
    const onPressAgree = useCallback(() => {
      setItemAgreed((prev) => !prev);
    }, []);
    return (
      <View style={styles.container}>
        <View style={styles.topBox}>
          <DoctorRate {...doctor} />
        </View>
        {image && <Image source={image} style={{ width: "100%" }} />}
        <View style={styles.content}>
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
            <ButtonIconHeader icon={"option"} style={styles.buttonOption} />
            <ButtonLinear white 
              title={itemThanked ? 'Thanked' : 'Thanks!'}
              styleButton={{flex: 1, marginLeft: 16}}
              colors={
                itemThanked
                  ? [Colors.GrayBlue, Colors.GrayBlue]
                  : [Colors.TiffanyBlue, Colors.TiffanyBlue]
              }
              leftChildren={
                <Image
                  source={itemThanked ? ICON.checkMark : ICON.thanks}
                  style={{marginRight: 8}}
                />
              }
              onPress={onPressAgree}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{ padding: 16, ...Theme.flexRowSpace }}
          onPress={onShowDoctorAgreed}
          activeOpacity={0.54}
        >
          <View style={Theme.flexRow}>
            <View style={Theme.flexRow}>
              {doctorsAgreed &&
                doctorsAgreed.map((item: any, index: number) => {
                  if (index < 4) {
                    return (
                      <Image key={index} source={item} style={styles.image} />
                    );
                  }
                })}
            </View>
            <Text
              marginLeft={4}
              size={13}
              lineHeight={16}
              color={Colors.GrayBlue}
            >
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
    // backgroundColor: Colors.White,
  },
  topBox: {
    padding: 16,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
  },
  content: {
    padding: 16,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
  },
  buttonOption: {
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  image: {
    marginRight: 4,
    width: 24,
    height: 24,
    borderRadius: 8,
  },
});
