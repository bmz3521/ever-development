import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import i18next from 'i18next';

const { width } = Dimensions.get('screen');

const HeaderSection = ({ activeNodeOne, navigation, theme, isSignIn }) => {
  const scaleActive = useSharedValue(1.1);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: 1.4 - scaleActive.value,
      transform: [{ scale: scaleActive.value }],
    };
  });

  useEffect(() => {
    scaleActive.value = withRepeat(
      withTiming(1.2, { duration: 1000 }),
      -1,
      true,
    );
  }, []);

  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 13,
        }}
      >
        <View style={{ marginRight: 26, marginTop: 9 }}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={35}
            color={'rgba(0,0,0,.54)'}
          />
        </View>
        <View style={{ width: '70%', minWidth: 220, paddingBottom: 2 }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ alignItems: 'center', paddingBottom: 18 }}>
              <Animated.View
                style={[
                  {
                    backgroundColor: activeNodeOne
                      ? theme.colors.primary
                      : theme.colors.secondary,
                    opacity: 0.2,
                    width: 42,
                    height: 42,
                    borderRadius: 30,
                    position: 'absolute',
                    top: -3,
                    left: -3,
                  },
                  rStyle,
                ]}
              />
              <View
                style={{
                  backgroundColor: activeNodeOne
                    ? theme.colors.primary
                    : `${theme.colors.secondary}88`,
                  padding: 2,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require('../icons/section_1.png')}
                  style={{ height: 32, width: 32 }}
                />
              </View>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 8,
                  backgroundColor: activeNodeOne
                    ? theme.colors.primary
                    : `${theme.colors.secondary}88`,
                  position: 'absolute',
                  bottom: -4.5,
                }}
              />
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 18 }}>
              <Animated.View
                style={[
                  {
                    backgroundColor: activeNodeOne
                      ? '#90caf9'
                      : theme.colors.primary,
                    opacity: 0.2,
                    width: 42,
                    height: 42,
                    borderRadius: 30,
                    position: 'absolute',
                    top: -3,
                    left: -3,
                  },
                  rStyle,
                ]}
              />
              <View
                style={{
                  backgroundColor: activeNodeOne
                    ? `#90caf9`
                    : theme.colors.primary,
                  padding: 2,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={
                    isSignIn
                      ? require('../icons/section_2_signin.png')
                      : require('../icons/section_2.png')
                  }
                  style={{ height: 32, width: 32 }}
                />
              </View>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 8,
                  backgroundColor: activeNodeOne
                    ? '#aaa'
                    : theme.colors.primary,
                  position: 'absolute',
                  bottom: -4.5,
                }}
              />
            </View>
          </View>
          <View style={{ marginHorizontal: 25, zIndex: -1 }}>
            <View
              style={[
                StyleSheet.absoluteFill,
                { height: 1, overflow: 'hidden' },
              ]}
            >
              <DashComp width={width * 0.8} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          minWidth: 270,
          marginLeft: 31,
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontFamily: theme.fontFamilyDefault,
          }}
        >
          {i18next.t('OTP_CONFIRM_PHONE_NO')}
        </Text>
        <Text style={{ color: '#aaa', fontFamily: theme.fontFamilyDefault }}>
          {!isSignIn ? i18next.t('OTP_PERSONAL_INFO') : i18next.t('SIGNIN_CTA')}
        </Text>
      </View>
    </View>
  );
};

const DashComp = ({ width }) => {
  const dash = [];
  for (let i = 0; i < width / 5; i++) {
    dash.push(
      <View
        key={i.toString()}
        style={{
          height: 1,
          backgroundColor: '#aaa',
          width: 8,
          marginRight: 5,
          borderRadius: 1,
        }}
      />,
    );
  }
  return <View style={{ flexDirection: 'row' }}>{dash}</View>;
};

export default HeaderSection;

const styles = StyleSheet.create({});
