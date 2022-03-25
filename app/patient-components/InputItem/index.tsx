import React, { memo, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import Text from 'app/elements/Text';
import TextInput from 'app/elements/TextInput';
import { Colors } from 'app/configs';
import Theme from 'app/style/Theme';
import { width } from 'app/configs/Const';
import { ICON } from 'app/images/Icon';
import { TcodeArea } from 'app/type/codeArea';
import Thailand from './flag-of-thailand.png';

interface InputItemProps {
  id?: number;
  label: string;
  labelColor?: string;
  value: string;
  placeholder?: string;
  isPickList?: boolean;
  data?: any;
  disabled?: boolean;
  isPhone?: boolean;
  phoneCode?: TcodeArea;
  isTouchable?: boolean;
  icon?: any;
  iconLeft?: any;
  isShowIconLeft?: boolean;
  isLanguage?: boolean;
  language?: any;
  style?: ViewStyle;
  onPress?: () => void;
}

export default memo(
  ({
    style,
    label,
    labelColor,
    value,
    placeholder,
    isPickList,
    isPhone,
    phoneCode,
    isTouchable,
    icon,
    iconLeft,
    isShowIconLeft,
    onPress,
    onChangeText,
    keyboardType,
    disabled,
  }: InputItemProps) => {
    // if (isLanguage) {
    //   return (
    //     <View>
    //       <Text marginTop={24} marginBottom={4}>
    //         {label}
    //       </Text>
    //       <TouchableOpacity activeOpacity={0.54} style={styles.touchLanguage}>
    //         <View style={{ height: 24 }} />
    //         {language.map((item: any, index: any) => {
    //           const [show, setShow] = useState<boolean>(true);
    //           const { language } = item;
    //           return (
    //             <View key={index}>
    //               {show ? (
    //                 <TouchableOpacity
    //                   style={styles.language}
    //                   onPress={() => {
    //                     setShow(false);
    //                   }}
    //                 >
    //                   <Text color={Colors.White} size={11} marginRight={4}>
    //                     {language}
    //                   </Text>
    //                   <Image
    //                     style={{ width: 12, height: 12 }}
    //                     source={ICON.close}
    //                   />
    //                 </TouchableOpacity>
    //               ) : (
    //                 <></>
    //               )}
    //             </View>
    //           );
    //         })}
    //       </TouchableOpacity>
    //     </View>
    //   );
    // }

    if (isPhone && phoneCode != null) {
      const [text, setText] = useState<any>(value);
      const onChangeTextChild = useCallback(
        value => {
          onChangeText(value, placeholder);
          setText(value);
        },
        [value],
      );

      return (
        <View>
          <Text marginTop={24} marginBottom={4} color={labelColor}>
            {label}
          </Text>
          <View style={Theme.flexRowSpace}>
            <TouchableOpacity
              activeOpacity={0.54}
              style={styles.touchSpace}
              onPress={onPress}
            >
              <View style={Theme.flexRow}>
                <Image
                  source={Thailand}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
                <Text marginLeft={8}>+66</Text>
              </View>
              {/* <Image source={ICON.arrowDown} /> */}
            </TouchableOpacity>
            <TextInput
              keyboardType={keyboardType}
              label={label}
              style={styles.phoneTextInput}
              value={text}
              placeholder={placeholder}
              borderColor={'#dee2e3'}
              editable={!disabled}
              onChangeText={onChangeTextChild}
            />
          </View>
        </View>
      );
    }

    if (isPickList) {
      return (
        <View>
          <Text marginTop={24} marginBottom={4} color={labelColor}>
            {label}
          </Text>
          <View>
            <TouchableOpacity
              activeOpacity={0.54}
              style={styles.touchSpace}
              onPress={onPress}
            >
              <Text>{value}</Text>
              <Image source={ICON.arrowDown} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (isTouchable) {
      return (
        <View style={style}>
          <Text marginTop={24} marginBottom={4} color={labelColor}>
            {label}
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={styles.touchRow}
            onPress={onPress}
          >
            {icon != null ? <Image source={ICON[`${icon}`]} /> : <></>}
            <Text marginLeft={12} size={15}>
              {value}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const [text, setText] = useState(value);
      const onChangeTextChild = useCallback(value => {
        onChangeText(value, placeholder);
        setText(value);
      }, []);
      return (
        <View style={style}>
          <Text
            marginTop={24}
            marginBottom={-10}
            marginLeft={10}
            style={{
              zIndex: 10,
              paddingHorizontal: 5,
              flex: 1,
              alignSelf: 'flex-start',
              backgroundColor: 'white',
            }}
            color={labelColor}
          >
            {label}
          </Text>
          <TextInput
            label={label}
            keyboardType={keyboardType}
            value={text}
            placeholder={placeholder}
            borderColor={'#dee2e3'}
            editable={!disabled}
            onChangeText={onChangeTextChild}
            style={{ minWidth: 140, minHeight: 60 }}
            iconLeft={iconLeft}
            isShowIconLeft={isShowIconLeft}
          />
        </View>
      );
    }
  },
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Snow,
    paddingHorizontal: 24,
  },
  contentView: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: 16,
  },
  contentHeader: {
    ...Theme.flexRow,
    borderColor: '#dee2e3',
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 56,
  },
  touchRow: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e3',
    padding: 12,
    height: 48,
  },
  touchSpace: {
    backgroundColor: Colors.White,
    ...Theme.flexRowSpace,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e3',
    height: 48,
    padding: 10,
    minWidth: 120,
  },
  phoneTextInput: {
    maxWidth: width - 216,
    marginLeft: 8,
  },
  touchLanguage: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e3',
    padding: 12,
    paddingRight: 40,
    flexWrap: 'wrap',
  },
  language: {
    ...Theme.flexRowCenter,
    backgroundColor: Colors.DodgerBlue,
    margin: 4,
    borderRadius: 4,
    padding: 8,
  },
});
