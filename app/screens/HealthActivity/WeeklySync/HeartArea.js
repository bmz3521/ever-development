import React, { useEffect } from 'react';
import moment from 'moment';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { Icon, Text } from '@components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import i18next from 'i18next';
import { useTheme } from 'react-native-elements';

const { height, width } = Dimensions.get('screen');

const HeartArea = ({ weeklyHeartRates, translateX, navigation }) => {
  moment.locale(i18next.language);
  const { theme } = useTheme();

  const heart = useSharedValue(0.95);

  const inputRange = [(-1 - 1) * width, 1 * width, 2 * width];

  useEffect(() => {
    heart.value = withRepeat(withTiming(1, { duration: 800 }), 12, true);
  }, [heart]);

  const moveLeftStyle = useAnimatedStyle(() => {
    const x = interpolate(
      translateX.value,
      inputRange,
      [width * 2, 0, 0],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateX: x }, { scale: heart.value }],
    };
  });

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, 0],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-10, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY: translateY }],
    };
  });

  if (weeklyHeartRates.length <= 0) {
    return (
      <View style={styles(theme).outContainer}>
        <Animated.View style={[styles(theme).container, moveLeftStyle]}>
          <Icon style={styles(theme).icon} name="heart" size={100} solid />
          <Animated.View style={[styles(theme).display]}>
            <Text type="subTitle2">คุณยังไม่มี</Text>
            <Text type="subTitle2">ค่าอัตราการเต้นของหัวใจ</Text>
            <Text type="subTitle2">โปรดเชื่อมต่อ smart watch</Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles(theme).outContainer}>
      <Animated.View style={[styles(theme).container, moveLeftStyle]}>
        <Icon style={styles(theme).icon} name="heart" size={100} solid />
        <Animated.View style={[styles(theme).display]}>
          <Text type="subTitle2">{i18next.t('HEALTHACT_UPDATE_LASTEST')}</Text>
          <Text type="h5">
            {Math.floor(weeklyHeartRates[0]?.quantity)}{' '}
            {i18next.t('MONIHR_BPM')}
          </Text>
          <Text type="subTitle2" style={{ color: '#c0c0c0' }}>
            {moment(weeklyHeartRates[0]?.startDate).format('D MMMM YYYY')}
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles(theme).displayMore, moveUpStyle]}>
        {weeklyHeartRates.slice(1, 6).map((item, index) => {
          return (
            <View style={styles(theme).item} key={index.toString()}>
              <Text type="subTitle2">
                {Math.floor(item.quantity)} {i18next.t('MONIHR_BPM')}
              </Text>
              <Text type="subTitle3" style={styles(theme).date}>
                {moment(item.startDate).format('D MMMM YYYY')}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default HeartArea;

const styles = theme =>
  StyleSheet.create({
    outContainer: {
      marginBottom: 100,
    },
    container: {
      marginTop: 40,
      flexDirection: 'row',
    },
    icon: {
      marginTop: 3,
      marginHorizontal: 10,
      padding: 5,
      color: '#ff2d2d',
    },
    display: {
      marginLeft: 20,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    displayMore: {
      marginLeft: 150,
      marginTop: 10,
    },
    item: {
      marginBottom: 10,
    },
    date: {
      marginLeft: 10,
      color: '#c0c0c0',
    },
  });
