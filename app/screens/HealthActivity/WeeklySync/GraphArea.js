import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Pressable, Image } from 'react-native';
import { Text } from '@components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import i18next from 'i18next';
import { Images } from '@config';
import { useTheme } from 'react-native-elements';
import { useHooks } from './hooks';

const { height, width } = Dimensions.get('screen');

const SIZE = width * 0.8;

const GraphArea = ({ weeklySteps, translateX, threshold, navigation }) => {
  moment.locale(i18next.language);
  const { theme } = useTheme();

  const { events } = useHooks({ weeklySteps });

  const [selectedBar, setSelectedBar] = useState(null);

  const quantity0 = useSharedValue(0);
  const quantity1 = useSharedValue(0);
  const quantity2 = useSharedValue(0);
  const quantity3 = useSharedValue(0);
  const quantity4 = useSharedValue(0);
  const quantity5 = useSharedValue(0);
  const quantity6 = useSharedValue(0);

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

  const barStyle0 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity0.value = withTiming(weeklySteps[0]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity0.value = withTiming(0);
    }

    height = interpolate(
      quantity0.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle1 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity1.value = withTiming(weeklySteps[1]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity1.value = withTiming(0);
    }

    height = interpolate(
      quantity1.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle2 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity2.value = withTiming(weeklySteps[2]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity2.value = withTiming(0);
    }

    height = interpolate(
      quantity2.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle3 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity3.value = withTiming(weeklySteps[3]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity3.value = withTiming(0);
    }

    height = interpolate(
      quantity3.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle4 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity4.value = withTiming(weeklySteps[4]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity4.value = withTiming(0);
    }

    height = interpolate(
      quantity4.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle5 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity5.value = withTiming(weeklySteps[5]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity5.value = withTiming(0);
    }

    height = interpolate(
      quantity5.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

  const barStyle6 = useAnimatedStyle(() => {
    let height = 0;

    if (translateX.value > width - 80) {
      quantity6.value = withTiming(weeklySteps[6]?.quantity || 0);
    } else if (translateX.value < width) {
      quantity6.value = withTiming(0);
    }

    height = interpolate(
      quantity6.value,
      [0, threshold],
      [0, SIZE - 100],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, []);

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
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY: translateY }],
    };
  });

  return (
    <>
      <Animated.View style={[styles(theme).head, opacityStyle]}>
        <Text type="h5">
          {moment(weeklySteps[0].startDate).format('D MMMM')} -{' '}
          {moment(weeklySteps[weeklySteps.length - 1].startDate).format(
            'D MMMM',
          )}
        </Text>
      </Animated.View>

      {selectedBar ? (
        <Animated.View
          style={[styles(theme).display, opacityStyle, moveUpStyle]}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
            }}
          >
            <View>
              <Text type="subTitle2">
                {moment(selectedBar?.startDate).format('D MMMM')}
              </Text>
              <Text type="h4" style={{ color: 'red' }}>
                {selectedBar?.quantity.toLocaleString('en')}{' '}
                <Text type="subTitle1" style={{ color: 'black' }}>
                  {i18next.t('STEP')}
                </Text>
              </Text>
            </View>
            <Image
              source={Images.WalkSteps}
              style={{
                width: 44,
                height: 55,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={[styles(theme).display, opacityStyle, moveUpStyle]}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
            }}
          >
            <View>
              <Text type="subTitle2">{i18next.t('STEP_AVERAGE')}</Text>
              <Text type="h4">
                {events.average().toLocaleString('en')} {i18next.t('STEP')}
              </Text>
            </View>
            <Image
              source={Images.WalkSteps}
              style={{
                width: 44,
                height: 55,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </View>
        </Animated.View>
      )}

      <View style={styles(theme).graphContainer}>
        <Animated.View style={[styles(theme).graph, opacityStyle]}>
          {weeklySteps.map((item, index) => {
            return (
              <View key={index.toString()}>
                <Pressable onPress={() => setSelectedBar(item)}>
                  <Animated.View
                    style={[
                      styles(theme).bar,
                      index === 0
                        ? barStyle0
                        : index === 1
                        ? barStyle1
                        : index === 2
                        ? barStyle2
                        : index === 3
                        ? barStyle3
                        : index === 4
                        ? barStyle4
                        : index === 5
                        ? barStyle5
                        : index === 6
                        ? barStyle6
                        : null,
                      opacityStyle,
                      selectedBar &&
                        selectedBar.startDate === item.startDate && {
                          backgroundColor: 'red',
                        },
                    ]}
                  />
                </Pressable>

                <Animated.View style={[styles(theme).label, opacityStyle]}>
                  <Text type="body5">
                    {moment(item.startDate).format('dd')}
                  </Text>
                  <Text type="body5">
                    ({moment(item.startDate).format('D')})
                  </Text>
                </Animated.View>
              </View>
            );
          })}
        </Animated.View>
        <Animated.View style={[styles(theme).measure, opacityStyle]}>
          <View>
            <Text type="body5">{threshold}</Text>
          </View>
          <View>
            <Text type="body5">{threshold / 2}</Text>
          </View>
          <View>
            <Text type="body5">0</Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default GraphArea;

const styles = theme =>
  StyleSheet.create({
    head: {
      marginVertical: 20,
    },
    display: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
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
    label: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
