import React, { memo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from 'react-native';
import { Text } from '@components';
import { Colors } from 'app/configs';
import scale from 'app/utils/scale';
import { dataPerson } from 'app/type/healthyQuestion';
import { ICON } from 'app/images/Icon';
import keyExtractor from 'app/utils/keyExtractor';
import { useTheme } from 'react-native-elements'

interface TouchablePersonProps {
  data: Array<dataPerson>;
  isYou: boolean;
  onPress: (item: dataPerson) => void;
  style: ViewStyle;
}

const TouchablePerson = memo((props: TouchablePersonProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container]}>
      <View style={styles.frameImg}>
        <Image
          source={ICON.accountNormal}
          resizeMode="center"
          style={styles.img}
        />
        <Text type="h6" style={{ color: theme.colors.primary }}>
          ตรวจอาการซึมเศร้า
        </Text>
      </View>
      <View style={styles.frameFlat}>
        <Text type="body2">
          ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ คุณรู้สึก หดหู่ เศร้า
          หรือท้อแท้สิ้นหวัง หรือไม่
        </Text>
      </View>
      <View style={[styles.frameFlat, { paddingTop: 10, paddingBottom: 20 }]}>
        {props.data.map((item: dataPerson, index: number) => {
          if (item.check) {
            return (
              <View style={[styles.frameTouch,]} key={index}>
                <TouchableOpacity
                  style={styles.touch1}
                  onPress={() => props.onPress(item, 'firstForm')}
                >
                  <Image
                    source={
                      item.isAdd
                        ? ICON.addPatient
                        : item.check
                          ? ICON.accountWhite
                          : ICON.account
                    }
                    resizeMode="center"
                  />
                </TouchableOpacity>
                <Text
                  size={scale(13)}
                  lineHeight={scale(22)}
                  bold
                  center
                  marginTop={scale(16)}
                >
                  {item.isAdd ? 'Someone else' : item.lastName}
                </Text>
              </View>
            );
          }
          return (
            <View style={[styles.frameTouch]} key={index}>
              <TouchableOpacity
                style={styles.touch2}
                onPress={() => props.onPress(item, 'firstForm')}
              >
                <Image
                  source={item.isAdd ? ICON.addPatient : ICON.account}
                  resizeMode="center"
                />
              </TouchableOpacity>
              <Text
                size={scale(13)}
                lineHeight={scale(22)}
                bold
                center
                marginTop={scale(16)}
              >
                {item.isAdd ? 'Someone else' : item.lastName}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.frameFlat]}>
        <Text type="body2">
          ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้คุณรู้สึก เบื่อ ทำอะไรก็ไม่เพลิดเพลิน
          หรือไม่
        </Text>
      </View>
      <View style={[styles.frameFlat, { paddingTop: 10, paddingBottom: 30 }]}>
        {props.data2.map((item: dataPerson, index: number) => {
          if (item.check) {
            return (
              <View style={[styles.frameTouch]} key={index}>
                <TouchableOpacity
                  style={styles.touch1}
                  onPress={() => props.onPress2(item, 'secondForm')}
                >
                  <Image
                    source={
                      item.isAdd
                        ? ICON.addPatient
                        : item.check
                          ? ICON.accountWhite
                          : ICON.account
                    }
                    resizeMode="center"
                  />
                </TouchableOpacity>
                <Text
                  size={scale(13)}
                  lineHeight={scale(22)}
                  bold
                  center
                  marginTop={scale(16)}
                >
                  {item.isAdd ? 'Someone else' : item.lastName}
                </Text>
              </View>
            );
          }
          return (
            <View style={[styles.frameTouch]} key={index}>
              <TouchableOpacity
                style={styles.touch2}
                onPress={() => props.onPress2(item, 'secondForm')}
              >
                <Image
                  source={item.isAdd ? ICON.addPatient : ICON.account}
                  resizeMode="center"
                />
              </TouchableOpacity>
              <Text
                size={scale(13)}
                lineHeight={scale(22)}
                bold
                center
                marginTop={scale(16)}
              >
                {item.isAdd ? 'Someone else' : item.lastName}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default TouchablePerson;

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
  frameFlat: {
    flexDirection: 'row',
    padding: scale(24),
    paddingRight: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  frameTouch: {
    marginLeft: scale(8),
    marginRight: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch1: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DodgerBlue,
  },
  touch2: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: Colors.WhiteSmoke,
  },
});
