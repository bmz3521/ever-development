import React, { Dispatch, SetStateAction, useCallback } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@components";
import { Colors } from "app/configs";
import Switch from "app/elements/Switch";
import scale from "app/utils/scale";
import { condition } from "app/type/condition";
import { ICON } from "app/images/Icon";

interface Props {
  style?: object;
  title?: string;
  isSwitch?: boolean;
  enable?: boolean;
  onSwitch?: () => void;
  condisitons: Array<condition>;
  onPressAdd?: () => void;
  onPressMore: Dispatch<SetStateAction<condition>>;
  setModalMore: Dispatch<SetStateAction<number>>;
  openModalMore: () => void;
}

const SettingItem = ({
  style,
  title,
  isSwitch,
  enable,
  onSwitch,
  condisitons,
  onPressAdd,
  onPressMore,
  setModalMore,
  openModalMore,
}: Props) => {
  const onPressonMore = useCallback((data: condition) => {
    onPressMore(data);
    setModalMore(3);
    openModalMore();
  }, [])
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        <View style={{ paddingRight: scale(84) }}>
          <Text type="body2" lineHeight={scale(24)} >
            {title}
          </Text>
        </View>
        {isSwitch ? (
          <View style={styles.switchView}>
            <Switch
              circleInActiveColor={Colors.White}
              backgroundInactive={Colors.White}
              circleActiveColor={Colors.White}
              backgroundActive={Colors.Malachite}
              enable={enable}
              onPress={onSwitch}
            />
          </View>
        ) : (
          <View style={styles.iconView}>
          </View>
        )}

      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    // height: 42,
    justifyContent: "center",
    width: '100%',
  },
  switchView: {
    position: "absolute",
    right: 0,
    top: 0
  },
  iconView: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  contentConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.WhiteSmoke,
    marginTop: scale(12),
    height: scale(40),
    borderRadius: scale(4),
    paddingLeft: scale(16)
  },
  contentAddConditions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    marginTop: scale(12),
    height: scale(40),
    borderRadius: scale(8),
    borderColor: Colors.Platinum,
    borderWidth: scale(1)
  }
});
