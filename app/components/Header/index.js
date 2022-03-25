import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  Header as ElementsHeader,
  useTheme,
  Avatar,
} from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const MyCustomCenterComponent = ({
  text,
  subText,
  theme,
  color,
  profileImagePath,
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {profileImagePath && (
        <View style={{ marginRight: 10 }}>
          <Avatar
            source={profileImagePath}
            containerStyle={{
              backgroundColor: theme.colors.grey4,
            }}
            size="medium"
            rounded
          />
        </View>
      )}
      <View>
        <View>
          <Text
            style={{
              fontSize: theme.fontSizeLarge,
              color: color ? color : theme.colors.fontDefault,
              fontFamily: theme.fontFamilyBold,
              // flexWrap: 'wrap',
            }}
            numberOfLines={2}
          >
            {text}
          </Text>
        </View>

        {subText && (
          <Text
            style={{
              fontSize: theme.fontSizeSmall,
              color: color ? color : theme.colors.fontDefault,
              fontFamily: theme.fontFamilyItalic,
            }}
          >
            {subText}
          </Text>
        )}
      </View>
    </View>
  );
};

const Header = ({
  backgroundColor,
  text,
  iconLeft,
  iconLeftType,
  containerStyle,
  onPressLeft,
  color,
  subText,
  renderRight,
  profileImagePath,
  placement,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <ElementsHeader
      placement={placement || 'left'}
      backgroundColor={backgroundColor ? backgroundColor : '#FFFFFF'}
      containerStyle={{
        ...containerStyle,
        height: height * 0.1,
      }}
      leftComponent={
        onPressLeft
          ? {
              icon: iconLeft ? iconLeft : 'chevron-left',
              type: iconLeftType ? iconLeftType : null,
              color: color ? color : theme.colors.fontDefault,
              onPress: onPressLeft,
            }
          : null
      }
      leftContainerStyle={
        subText
          ? { justifyContent: 'flex-start', marginTop: 3 }
          : { justifyContent: 'center' }
      }
      centerComponent={
        <MyCustomCenterComponent
          theme={theme}
          color={color}
          text={text}
          subText={subText}
          profileImagePath={profileImagePath}
        />
      }
      centerContainerStyle={
        subText
          ? { justifyContent: 'flex-start' }
          : { justifyContent: 'center' }
      }
      rightComponent={renderRight}
      rightContainerStyle={
        subText
          ? { justifyContent: 'flex-start', marginTop: 3 }
          : { justifyContent: 'center' }
      }
    />
  );
};

export default Header;
