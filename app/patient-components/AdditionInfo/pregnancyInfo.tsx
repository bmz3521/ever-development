import React, { Dispatch, memo, SetStateAction } from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import { Text } from "@components";
import { Colors } from "app/configs";
import scale from "app/utils/scale";
import SettingItem from "../AskFreeQuestion/SettingItem";
import { dataAddition } from "app/type/healthyQuestion";
import { ICON } from "app/images/Icon";
import { condition } from "app/type/condition";
import ButtonIconText from "app/elements/Buttons/ButtonIconText";
import Theme from "app/style/Theme";
import { useTheme } from 'react-native-elements'
interface Props {
  data: Array<dataAddition>;
  onPress: (item: dataAddition) => void;
  onPressAdd: () => void;
  onPressMore: Dispatch<SetStateAction<condition>>;
  setModalMore: Dispatch<SetStateAction<number>>;
  openModalMore: () => void;
  selectHealthyData?: boolean;
}

const PregnancyInfo = memo((props: Props) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={styles.frameImg}>
        <Image
          source={ICON.additionalInformation}
          resizeMode="center"
          style={styles.img}
        />
        <Text type="h6" style={{ color: theme.colors.primary }}>ข้อมูลการตั้งครรภ์</Text>
      </View>
      <View style={{ padding: 20 }}>
        {props.data.map((item: dataAddition, index) => {
          return <SettingItem
            key={index}
            style={{ marginTop: index == 0 ? 10 : 30 }}
            enable={item.check}
            onSwitch={() => { props.onPress(item) }}
            title={item.title}
            isSwitch={true}
            condisitons={item.conditions}
            onPressAdd={() => { props.onPressAdd() }}
            onPressMore={props.onPressMore}
            setModalMore={props.setModalMore}
            openModalMore={props.openModalMore}
          />
        })}
      </View>
      {/* {
        props.selectHealthyData ?
          <View style={styles.frameHealth}>
            <Text size={13} lineHeight={16} bold>Sync with Health Services</Text>
            <Text size={13} lineHeight={22} marginTop={scale(16)}>By importing your health data from Smart{"\n"}Devices, Doctor can better help you.</Text>
            <ButtonIconText
              icon={"healthyBlue"}
              iconStyle={styles.iconstyle}
              title={"Add Attachments"}
              titleColor={Colors.GrayBlue}
              textProps={{ bold: true, size: 15, lineHeight: 18, marginLeft: 8 }}
              style={styles.styleButton}
            />
            <View style={styles.buttonSecurity}>
              <Image
                style={styles.iconSecurity}
                source={ICON.security}
              />
              <Text size={11} lineHeight={14} >
                {"HIPAA Secure"}
              </Text>
            </View>
          </View>
          : null
      } */}
    </View >
  );
});

export default PregnancyInfo;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 6,
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  frameImg: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke
  },
  img: {
    width: 20,
    height: 20,
    marginRight: scale(16),
    marginLeft: scale(8)
  },
  iconstyle: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8)
  },
  styleButton: {
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(24),
    borderWidth: 1,
    borderColor: Colors.Platinum
  },
  iconSecurity: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(8)
  },
  frameHealth: {
    marginTop: scale(12),
    padding: scale(24),
    borderTopWidth: scale(1),
    borderTopColor: Colors.WhiteSmoke
  },
  buttonSecurity: {
    ...Theme.flexRowCenter,
    marginTop: scale(8)
  },
});