import React, { memo } from "react";
import { StyleSheet, ViewStyle, TouchableOpacity, Image } from "react-native";
import Text, { TextProps } from "app/elements/Text";
import { Colors } from "app/configs";
import Theme from "app/style/Theme";
import { ICON } from "app/images/Icon";

interface ButtonTextProps {
  title?: string;
  icon?: any;
  tintColor?: string;
  style?: ViewStyle;
  iconStyle?: any;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
}

const ButtonIconText = memo(
  ({
    title,
    icon,
    style,
    tintColor,
    iconStyle,
    titleColor = Colors.TealBlue,
    onPress,
    ...textProps
  }: ButtonTextProps) => {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <Image
          style={iconStyle}
          source={ICON[`${icon}`]}
          tintColor={tintColor}
        />
        <Text type="H5" color={titleColor} {...textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ButtonIconText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.White,
    ...Theme.center,
  },
});
