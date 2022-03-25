import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import { Text } from '@components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from 'react-native-elements';

const { width } = Dimensions.get('screen');

const SIZE = width * 0.8;

const EmptyGraphArea = ({ navigation, notAuthorized, translateX }) => {
  const { theme } = useTheme();

  const inputRange = [(-1 - 1) * width, 1 * width, 2 * width];

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });

  const title = () => {
    if (notAuthorized) {
      return (
        <Animated.View style={[styles(theme).head, opacityStyle]}>
          {Platform.OS === 'ios' ? (
            <Text type="subTitle2">กรุณาเปิดการใช้ Health App ที่</Text>
          ) : (
            <Text type="subTitle2">กรุณาเปิดการใช้ Google Fit ที่</Text>
          )}
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text style={{ color: 'dodgerblue' }} type="subTitle2">
              Settings
            </Text>
          </Pressable>
        </Animated.View>
      );
    } else {
      return (
        <Animated.View style={[styles(theme).head, opacityStyle]}>
          <Text type="subTitle2">Start Walking now!</Text>
        </Animated.View>
      );
    }
  };

  return (
    <>
      {title()}
      <View style={styles(theme).graphContainer}>
        <Animated.View style={[styles(theme).graph, opacityStyle]}>
          {new Array(6).fill(0).map((_, index) => {
            return (
              <Animated.View
                key={index.toString()}
                style={[
                  styles(theme).bar,
                  {
                    backgroundColor: '#F2F2F2',
                    height: SIZE - 100,
                    marginBottom: 50,
                  },
                ]}
              />
            );
          })}
        </Animated.View>
        <Animated.View style={[styles(theme).measure, opacityStyle]}>
          <View>
            <Text type="body5">7,000</Text>
          </View>
          <View>
            <Text type="body5">3,000</Text>
          </View>
          <View>
            <Text type="body5">0</Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default EmptyGraphArea;

const styles = theme =>
  StyleSheet.create({
    head: {
      marginVertical: 20,
    },
    graphContainer: {
      flexDirection: 'row',
    },
    graph: {
      width: SIZE,
      height: SIZE - 50,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    measure: {
      justifyContent: 'space-between',
      marginBottom: 50,
    },
    bar: {
      width: 30,
      backgroundColor: theme.colors.primary,
    },
  });
