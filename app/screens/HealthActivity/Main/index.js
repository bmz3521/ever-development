import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  SafeAreaView,
  Image,
  MonitoringButton,
  Header,
  Text,
  Icon,
} from '@components';
import { BaseStyle, Images } from '@config';
import styles from './styles';
import { useTheme } from 'react-native-elements';
import i18next from 'i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function Main({
  navigation,
  events,
  notAuthorized,
  latestGlucose,
  latestPressure,
  latestWeight,
  latestBodyTemp,
  latestO2Sat,
  latestHeart,
  progress,
  dailySteps,
}) {
  const { theme } = useTheme();

  const hand = useSharedValue(0);
  const oHand = useSharedValue(0);

  useEffect(() => {
    hand.value = withRepeat(withTiming(40, { duration: 1100 }), 9, true);
    oHand.value = withTiming(1, { duration: 1700 });
  }, []);

  useEffect(() => {
    events.fetchMonitoringReports();
  }, []);

  const handSlide = useAnimatedStyle(() => {
    return {
      opacity: oHand.value,
      transform: [{ translateX: hand.value }],
    };
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('HEALTHACT_DIARY')}
        onPressLeft={() => navigation.navigate('Home')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#ffffff' }}
      >
        <View style={styles(theme).container}>
          <View style={styles(theme).mainContainer}>
            <View style={styles(theme).walkContainer}>
              <View style={styles(theme).walkBox}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginBottom: 15,
                  }}
                >
                  <Image
                    source={Images.WalkSteps}
                    style={{
                      width: 14,
                      height: 25,
                      resizeMode: 'contain',
                      marginRight: 10,
                    }}
                  />
                  <Text type="body3">{i18next.t('HEALTHACT_STEP_TOTAL')}</Text>
                </View>

                <View
                  style={[styles(theme).valueContainer, { marginBottom: 8 }]}
                >
                  <View style={styles(theme).progress}>
                    <Progress.Circle
                      progress={progress}
                      size={150}
                      thickness={20}
                      showsText={true}
                      useNativeDriver={true}
                      color="#00bae5"
                      unfilledColor="#F2F2F2"
                      borderWidth={0}
                    />
                  </View>
                </View>
                <View style={styles(theme).valueContainer}>
                  {notAuthorized ? (
                    <>
                      {Platform.OS === 'ios' ? (
                        <Text type="subTitle2">
                          กรุณาเปิดการใช้ Health App ที่
                        </Text>
                      ) : (
                        <Text type="subTitle2">
                          กรุณาเปิดการใช้ Google Fit ที่
                        </Text>
                      )}
                      <Pressable onPress={() => navigation.navigate('Profile')}>
                        <Text style={{ color: 'dodgerblue' }} type="subTitle2">
                          Settings
                        </Text>
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Text type="h5">
                        {i18next.t('HEALTHACT_STEP_TOTAL')}:{' '}
                        {dailySteps.toLocaleString('en')}
                      </Text>
                      <Text type="body5">
                        {i18next.t('HEALTHACT_STEP_GOAL')}
                      </Text>
                    </>
                  )}
                </View>
                {notAuthorized && (
                  <Animated.View
                    style={[
                      {
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        top: 250,
                        right: 50,
                      },
                      handSlide,
                    ]}
                  >
                    <Icon
                      style={{ padding: 5, color: '#ccc' }}
                      name="arrow-left"
                      size={20}
                    />
                    <Icon
                      style={{ padding: 5, color: '#ccc' }}
                      name="hand-point-up"
                      size={30}
                      solid
                    />
                    <Icon
                      style={{ padding: 5, color: '#ccc' }}
                      name="arrow-right"
                      size={20}
                    />
                  </Animated.View>
                )}
              </View>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text type="h4">{i18next.t('HEALTHACT_UPDATE_LASTEST')}</Text>
            </View>
            <View style={styles(theme).resultContainer}>
              <MonitoringButton
                id={1}
                title={i18next.t('HEALTHACT_BLOOD_SUGAR')}
                type={i18next.t('MONIGLUC_MGDL')}
                img={Images.BloodGlucose}
                normalUpperLimit={130}
                normalLowerLimit={70}
                latestValue={latestGlucose?.glucose}
                latestResult={latestGlucose?.result}
                latestColor={latestGlucose?.color}
                latestBg={latestGlucose?.bg}
                barBallValuePositionInPercentage={
                  latestGlucose?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorBloodGlucose');
                }}
              />
              <MonitoringButton
                id={2}
                title={i18next.t('HEALTHACT_BLOOD_PRESSURE')}
                type={i18next.t('MONIPRES_MMHG')}
                img={Images.BloodPressure}
                latestValue={latestPressure?.high}
                latestValue2={latestPressure?.low}
                latestResult={latestPressure?.result}
                latestColor={latestPressure?.color}
                latestBg={latestPressure?.bg}
                barBallValuePositionInPercentage={
                  latestPressure?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorBloodPressure');
                }}
              />
              <MonitoringButton
                id={3}
                title={i18next.t('HEALTHACT_BMI')}
                type={i18next.t('MONIWEIGHT_KGSQM')}
                img={Images.Weight}
                latestValue={latestWeight?.bmi}
                latestResult={latestWeight?.result}
                latestColor={latestWeight?.color}
                latestBg={latestWeight?.bg}
                barBallValuePositionInPercentage={
                  latestWeight?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorWeight');
                }}
              />
              <MonitoringButton
                id={4}
                title={i18next.t('HEALTHACT_BODY_TEMP')}
                type={i18next.t('MONIADD_C')}
                img={Images.BodyTemp}
                latestValue={latestBodyTemp?.celsius}
                latestResult={latestBodyTemp?.result}
                latestColor={latestBodyTemp?.color}
                latestBg={latestBodyTemp?.bg}
                barBallValuePositionInPercentage={
                  latestBodyTemp?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorBodyTemperature');
                }}
              />
              <MonitoringButton
                id={5}
                title={i18next.t('HEALTHACT_HR')}
                type={i18next.t('MONIHR_BPM')}
                img={Images.HeartRate}
                latestValue={latestHeart?.times}
                latestResult={latestHeart?.result}
                latestColor={latestHeart?.color}
                latestBg={latestHeart?.bg}
                barBallValuePositionInPercentage={
                  latestHeart?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorHeartRate');
                }}
              />
              <MonitoringButton
                id={6}
                title={i18next.t('HEALTHACT_BLOOD_O2')}
                type="%"
                img={Images.O2Sat}
                latestValue={latestO2Sat?.percent}
                latestResult={latestO2Sat?.result}
                latestColor={latestO2Sat?.color}
                latestBg={latestO2Sat?.bg}
                barBallValuePositionInPercentage={
                  latestO2Sat?.barBallValuePositionInPercentage
                }
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight', options);
                  events.navigationHandler('MonitorO2Sat');
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main;
