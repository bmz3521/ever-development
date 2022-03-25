import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { useHooks } from './hooks';
import LoadMonitoring from '../LoadMonitoring';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Main from './Main';
import WeeklySync from './WeeklySync';

const { height, width } = Dimensions.get('screen');

function HealthActivity({ navigation }) {
  const {
    events,
    notAuthorized,
    latestGlucose,
    latestPressure,
    latestWeight,
    latestBodyTemp,
    latestO2Sat,
    latestHeart,
    progress,
    threshold,
    dailySteps,
    weeklySteps,
    weeklyHeartRates,
    dataLoading,
  } = useHooks({ navigation });

  const translateX = useSharedValue(0);

  const SCREENS = [
    <Main
      events={events}
      navigation={navigation}
      notAuthorized={notAuthorized}
      latestGlucose={latestGlucose}
      latestPressure={latestPressure}
      latestWeight={latestWeight}
      latestBodyTemp={latestBodyTemp}
      latestO2Sat={latestO2Sat}
      latestHeart={latestHeart}
      progress={progress}
      dailySteps={dailySteps}
    />,
    <WeeklySync
      weeklySteps={weeklySteps}
      notAuthorized={notAuthorized}
      weeklyHeartRates={weeklyHeartRates}
      translateX={translateX}
      threshold={threshold}
      navigation={navigation}
    />,
  ];

  useEffect(() => {
    events.fetchMonitoringReports();
  }, []);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return dataLoading ? (
    <LoadMonitoring />
  ) : (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {SCREENS.map((item, index) => {
        return (
          <View key={index} style={{ width, height }}>
            {item}
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

export default HealthActivity;
